import datetime
import json
from functools import wraps

from flask import Blueprint, session, request
from flask_kit import Router, BasicAccessControl
from flask_kit.simple_router import make_error

from backend.grading import grade
from backend.templates.template import template_errors
from backend.templates.template import template_from_file, TemplateError
from backend.templates.utils import template_path, all_templates, get_resource
from backend.utils import format_text


def ui_api(models,
           configs,
           make_template=template_from_file,
           all_templates=all_templates):
    """
    Creates the API blueprint

    :param models: Container of the data models
    :param configs: DotDict with the configurations
    :param make_template: creates a template from a manifest file
    :param all_templates: lists all the templates
    """

    def get_permissions():
        user_id = session.get('user')
        admin = models.Admin.objects.filter(user_id=user_id).first()
        if not admin:
            return []
        admin.active_at = datetime.datetime.utcnow()
        admin.save()
        return ['admin']

    def set_user(f, *args, **kwargs):
        if not session or 'user' not in session.keys():
            new_user = models.User.new(request)
            session['user'] = new_user.id
        return f(*args, **kwargs)

    def get_test(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            test_id = kwargs['test_id']
            test = models.Test.objects.filter(id=kwargs['test_id']).first()
            if not test:
                return make_error("Test with id '%s' not found" % test_id, 404)
            kwargs.pop('test_id', None)
            return f(*args, test=test, **kwargs)

        return decorated

    def get_template(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            template_id = kwargs['template_id']
            try:
                path = template_path(configs.templates.path, template_id)
                template = make_template(template_id, path)

            except OSError:
                msg = "Template '%s' not found" % template_id
                return make_error(msg, 404)
            except TemplateError as err:
                msg = err.validation_errors
                return make_error(msg, 400)
            kwargs.pop('template_id', None)
            return f(*args, template=template, **kwargs)

        return decorated

    blueprint = Blueprint('ui-api', __name__, url_prefix='/ui-api')
    access = BasicAccessControl(get_permissions,
                                denied=lambda: make_error('must login', 401))
    router = Router(blueprint, decorator=set_user)

    @router.get('user')
    def get_user():
        return json.dumps(session.get('user'))

    @router.get('introductions/<string:template_id>')
    @get_template
    def get_intro(template):
        return template.introduction(configs)

    @router.get('final-info/<string:template_id>')
    def final_info(template_id):
        info = get_resource(configs.templates.path,
                            template_id,
                            'final_info.md',
                            True)
        return {'text': info or ''}

    @router.get('templates')
    @access.allow('admin')
    def list_templates():
        templates = all_templates(configs.templates.path, make_template)
        today = datetime.datetime.fromordinal(
            datetime.date.today().toordinal())
        for temp in templates:
            temp['started'] = count_tests(template=temp['id'])
            temp['finished'] = count_tests(template=temp['id'], finished=True)
            temp['today'] = count_tests(template=temp['id'],
                                        created_at__gte=today)

        return templates

    @router.get('templates/<string:template_id>')
    @access.allow('admin')
    def detail_template(template_id):
        return get_template_configs(
            configs.templates.path,
            template_id,
            get_resource)

    @router.post('templates/<string:template_id>', validate=template_schema)
    @access.allow('admin')
    def save_template(template_id, data):
        res_filename = {
            'manifest': 'manifest.json',
            'disclaimer': 'disclaimer.md',
            'intro': 'intro.md',
            'q_start': 'q_start.json',
            'q_end': 'q_end.json',

        }
        files = get_template_configs(
            configs.templates.path,
            template_id,
            get_resource)
        changed_flags = {k: False for k in files.keys()}

        for namespace, value in data['update'].items():
            update_config_file(files, changed_flags, namespace, value)

        if 'manifest' in files.keys() and changed_flags['manifest']:
            errors = template_errors(files['manifest'])
            if errors:
                return make_error(json.dumps(errors, indent=2), 400)

        for changed_id in [k for k, v in changed_flags.items() if v]:
            path = template_path(configs.templates.path,
                                 template_id,
                                 res_filename[changed_id])
            with open(path, 'w') as conf_file:
                contents = files[changed_id]
                if isinstance(contents, (dict, list)):
                    contents = json.dumps(contents)
                conf_file.write(contents)
            return changed_flags

    @router.post('tests/<string:template_id>', validate=test_schema)
    @get_template
    def new_test(template, data):
        version = template.random_version()
        mobile = data.get('mobile', None) if data else None
        test = models.Test.new(template, version, session['user'], mobile)

        questionnaire = dict()

        for point in ['start', 'end']:
            quest = template.questionnaire(configs.templates.path, point)
            if quest:
                questionnaire[point] = quest

        test_data = {
            **version,
            'img_prefix': '/templates/%s/' % template.id,
            'id': test.id
        }

        if questionnaire:
            test_data['questionnaire'] = questionnaire
        return test_data

    @router.post('tests/<string:test_id>/results', validate=result_schema)
    @get_test
    def add_test_result(test, data):
        try:
            path = template_path(configs.templates.path, test.template)
            template = make_template(test.template, path)

        except OSError:
            msg = "Template '%s' not found" % test.template
            return make_error(msg, 404)

        measurements = data['results']

        result = grade(test, measurements)
        test.set_result(result, measurements, data.get('answers', None))

        return {
            'text': format_text(
                template.result_text,
                loser=template.groups[result['loser']]['name'],
                winner=template.groups[result['winner']]['name'],
                level=result['classification'],
            ),
            'success': True,
        }

    def count_tests(**filter_args):
        return models.Test.objects.filter(**filter_args).count()

    return blueprint


def update_config_file(file_map, change_flags, namespace_str, value):
    namespace = namespace_str.split(',')
    file_id = namespace.pop(0)
    file = file_map.get(file_id)
    change_flags[file_id] = True

    if not file:
        return False

    if not namespace:
        file_map[file_id] = value['newValue']
        return True

    while len(namespace) > 1:
        key = namespace.pop(0)
        if isinstance(file, list):
            key = int(key)
        file = file[key]
    key = namespace.pop()
    if isinstance(file, list):
        key = int(key)

    if 'newValue' in value.keys():
        file[key] = value['newValue']
    else:
        del file[key]
    return True


def get_template_configs(path, template_id, get_res):
    args = {
        'path': path,
        'template': template_id,
        'no_fail': True,
    }
    q_start = get_res(**args, res='q_start.json')
    q_end = get_res(**args, res='q_end.json')
    return {
        'manifest': json.loads(get_res(**args, res='manifest.json')),
        'disclaimer': get_res(**args, res='disclaimer.md'),
        'intro': get_res(**args, res='intro.md'),
        'q_start': json.loads(q_start) if q_start else None,
        'q_end': json.loads(q_end) if q_end else None,

    }


answers_schema = {
    'type': 'dict',
}

result_schema = {
    'results': {
        'minlength': 2,
        'type': 'list',
        'required': True,
        'nullable': False,
        'schema': {
            'type': 'dict',
            'schema': {
                'pairing': {
                    'type': 'list',
                    'schema': {'type': 'string'},
                    'minlength': 1,
                    'maxlength': 2,
                },
                'duration': {'type': 'float'},
                'mistakes': {'type': 'integer'},
            }
        }
    },
    'answers': {
        'type': 'dict',
        'required': False,
        'nullable': False,
        'schema': {
            'start': answers_schema,
            'end': answers_schema,
        },
    }
}

test_schema = {
    'mobile': {'type': 'boolean', 'required': False},
}

template_schema = {
    'update': {
        'type': 'dict',
        'required': True,
        'nullable': False,
    }
}
