from functools import wraps

from cerberus import Validator
from flask import Blueprint, session, request

from backend.templates import template_from_file, template_path
from backend.utils import format_text
from .router import Router, make_error

result_schema = {
    'results': {
        'minlength': 1,
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
    }
}


def separate_groups(groups, template):
    meaning_groups = template.positive_groups + template.negative_groups

    if groups[0] in meaning_groups:
        object_group = groups[1]
        positive = groups[0] in template.positive_groups
    elif groups[1] in meaning_groups:
        object_group = groups[0]
        positive = groups[1] in template.positive_groups
    else:
        raise ValueError()

    return object_group, positive


def ui_api(models, configs):
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
                path = template_path(configs, template_id)
                template = template_from_file(template_id, path)

            except OSError:
                msg = "Template '%s' not found" % template_id
                return make_error(msg, 404)
            kwargs.pop('template_id', None)
            return f(*args, template=template, **kwargs)

        return decorated

    router = Router(blueprint, decorator=set_user)
    result_validator = Validator(result_schema)

    @router.get('introductions/<string:template_id>')
    @get_template
    def get_intro(template):
        return template.introduction(configs)

    @router.post('tests/<string:template_id>')
    @get_template
    def new_test(template):
        version = template.random_version()
        test = models.Test.new(template, version, session['user'])

        return {
            **version,
            'img_prefix': '/templates/%s/' % template.id,
            'id': test.id
        }

    @router.post('tests/<string:test_id>/results', validator=result_validator)
    @get_test
    def add_test_result(test, data):
        try:
            path = template_path(configs, test.template)
            template = template_from_file(test.template, path)

        except OSError:
            msg = "Template '%s' not found" % test.template
            return make_error(msg, 404)

        task_res = data['results']

        totals = []
        group_ids = []

        for i, task_struct in enumerate(test.structure):
            if len(task_struct.left) < 2 or len(task_struct.right) < 2:
                continue
            l_group, l_is_pos = separate_groups(task_struct.left, template)
            r_group, r_is_pos = separate_groups(task_struct.right, template)
            l_mult = -1 if l_is_pos else 1
            r_mult = -1 if r_is_pos else 1
            total_points = task_res[i]['duration'] + task_res[i]['mistakes']

            if len(group_ids) == 0:
                group_ids.extend([l_group, r_group])
                totals.extend([total_points * l_mult, total_points * r_mult])
            else:
                l_idx = group_ids.index(l_group)
                r_idx = group_ids.index(r_group)
                totals[r_idx] += total_points * r_mult
                totals[l_idx] += total_points * l_mult

        if totals[0] > totals[1]:
            winner_id = group_ids[0]
            looser_id = group_ids[1]
        else:
            winner_id = group_ids[1]
            looser_id = group_ids[0]
        score = abs(totals[0])

        print(group_ids, totals)

        if score < 2:
            classification = 'little to no'
        elif score < 5:
            classification = 'slight'
        elif score < 9:
            classification = 'moderate'
        else:
            classification = 'strong'

        result = {
            'text': format_text(
                template.result_text,
                looser=template.groups[looser_id]['name'],
                winner=template.groups[winner_id]['name'],
                level=classification,
            ),
            'success': True,
            # 'score': score,
        }
        test.set_result(task_res, winner_id, score)

        return result

    return blueprint
