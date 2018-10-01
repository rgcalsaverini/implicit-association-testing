from functools import wraps

from cerberus import Validator
from flask import Blueprint, session, request

from backend.grading import grade
from backend.templates import template_from_file, template_path
from backend.utils import format_text
from .router import Router, make_error

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

create_test_schema = {
    'mobile': {'type': 'boolean', 'required': False},
}


def ui_api(models, configs, make_template=template_from_file):
    blueprint = Blueprint('ui-api', __name__, url_prefix='/ui-api')

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
            kwargs.pop('template_id', None)
            return f(*args, template=template, **kwargs)

        return decorated

    router = Router(blueprint, decorator=set_user)
    result_validator = Validator(result_schema)
    create_test_validator = Validator(create_test_schema)

    @router.get('introductions/<string:template_id>')
    @get_template
    def get_intro(template):
        return template.introduction(configs)

    @router.post('tests/<string:template_id>', validator=create_test_validator)
    @get_template
    def new_test(template, data):
        version = template.random_version()
        mobile = data.get('mobile', None) if data else None
        test = models.Test.new(template, version, session['user'], mobile)

        questionnaire = {}

        for point in ['start', 'end']:
            quest = template.questionnaire(configs.templates.path, point)
            if quest:
                questionnaire[point] = quest

        return {
            **version,
            **({'questionnaire': questionnaire} if questionnaire else {}),
            'img_prefix': '/templates/%s/' % template.id,
            'id': test.id
        }

    @router.post('tests/<string:test_id>/results', validator=result_validator)
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

    return blueprint
