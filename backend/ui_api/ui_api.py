from cerberus import Validator
from flask import Blueprint, session, request
from functools import wraps
from backend.templates import template_from_file, template_path
from .router import Router, make_error

test_schema = {
    'template': {
        'type': 'string',
        'required': True,
        'nullable': False,
    }
}

result_schema = {
    'results': {
        'minlength': 7,
        'maxlength': 7,
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
                'time': {'type': 'integer'},
                'mistakes': {'type': 'integer'},
            }
        }
    }
}


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

    @router.get('consents/<string:template_id>')
    @get_template
    def get_consent(template):
        return template.introduction(configs.disclaimers)

    @router.post('tests/<string:template_id>')
    @get_template
    def new_test(template):
        version = template.random_version()
        test = models.Test.new(template, version['id'], session['user'])

        return {
            **version,
            'id': test.id
        }

    @router.post('tests/<string:test_id>/results', validator=result_validator)
    @get_test
    def add_test_result(test, data):
        return test.id

    return blueprint
