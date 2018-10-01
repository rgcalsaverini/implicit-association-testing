import json
from functools import wraps

from flask import Blueprint, request

from backend.access import validate_access_token
from .router import Router, make_error


def get_auth_header():
    return request.headers.get('IAT-Auth', None)


def constrain(min_val, val, max_val):
    return max(min(val, max_val), min_val)


def apply_opt(model, op):
    return model.filter(**op['filter']).skip(op['offset']).limit(op['limit'])


def separate_filters(filter_str):
    result = dict()

    if not filter_str:
        return {}
    bits = filter_str.split(',')

    for bit in bits:
        filter_bits = bit.split('=')
        key = filter_bits[0].strip()
        value = filter_bits[1].strip() if len(filter_bits) > 1 else 'true'
        result[key] = json.loads(value)
    return result


def result_api(models, configs):
    blueprint = Blueprint('result-api', __name__, url_prefix='/result-api')

    def auth(f, *args, **kwargs):
        token = get_auth_header()
        if not token:
            return make_error("Must authenticate", 401)
        if not validate_access_token(configs, token):
            return make_error("Access denied", 403)
        return f(*args, **kwargs)

    def route_infra(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            opt = dict()
            opt['offset'] = int(request.args.get('offset', 0))
            opt['limit'] = int(constrain(1, request.args.get('limit', 100), 100))
            opt['filter'] = {}
            try:
                opt['filter'] = separate_filters(request.args.get('filter', None))
            except ValueError:
                pass
            extra = {}
            if 'user_id' in kwargs.keys():
                user = models.User.objects.filter(id=kwargs['user_id']).first()
                if not user:
                    msg = "User '%s' not found" % kwargs['user_id']
                    return make_error(msg, 404)
                extra['user'] = user

            return f(*args, opt=opt, **extra, **kwargs)

        return decorated

    router = Router(blueprint, decorator=auth)

    @router.get('users')
    @route_infra
    def list_users(opt):
        users = apply_opt(models.User.objects, opt)
        return [u.json() for u in users]

    @router.get('users/<user_id>')
    @route_infra
    def get_user(user_id, user, opt):
        return user.json()

    @router.get('users/<user_id>/tests')
    @route_infra
    def get_users_tests(user_id, user, opt):
        tests = apply_opt(models.Test.objects.filter(user=user_id), opt)
        return [t.id for t in tests]

    @router.get('tests')
    @route_infra
    def list_tests(opt):
        tests = apply_opt(models.Test.objects, opt)
        return [u.json(False) for u in tests]

    return blueprint
