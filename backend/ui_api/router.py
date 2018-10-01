import json
from itertools import zip_longest

from flask import request

_json_mime = 'application/json'
_text_mime = 'text/plain'
_default_headers = {}


def make_error(error, status=400):
    """Assemble an error response tuple"""
    return {
               'success': False,
               'error': error
           }, status


def merge_tuples(defaults, values):
    """
    Returns a merge of two tuples,
    where values have preference over
    defaults.
    """
    if not isinstance(values, tuple):
        values = (values,)
    return tuple(
        value if value is not None else default
        for default, value
        in zip_longest(defaults, values)
    )


def make_response(resp=None):
    """
    Correctly format the route response
    """
    body, status, headers = merge_tuples(('', 200, {}), resp)
    content_type = _text_mime

    if body == '':
        status = 204

    if not isinstance(body, str):
        body = json.dumps(body)
        content_type = _json_mime

    return body, status, {
        **_default_headers,
        'Content-Type': content_type,
        **headers,
    }


class Router(object):
    """
    Simple router wrapper to the API endpoints. Does a few things:
        - Adds a normalized 'data' argument to the route with the
             request input
        - Facilitates input validation with cerberus
        - Document the API at the root endpoint

    Example:
        router = Router(blueprint)
        things = {}
        scheme = {
            'name': {
                'type': 'string',
                'required': True,
                'nullable': False,
            },
            'value': {
                'type': ['string', 'integer'],
                'required': True,
                'nullable': True,
            },
        }
        validator = Validator(scheme)

        @router.get('something')
        def list_things(_):
            return things

        @router.post('something', validator=validator)
        def add_something(data):
            things[data['name']] = data['value']
            return {data['name']: data['value']}

    """

    valid_methods = ['get', 'post', 'put', 'patch', 'delete', 'head',
                     'options']

    def __init__(self, blueprint, decorator=None, help_route=True):
        self.decorator = decorator
        self.blueprint = blueprint
        self.bp_name = self.blueprint.name
        self.data_key = 'data'
        self.routes = {}
        if help_route:
            self._add_help_route()

    def _help_view(self):
        return make_response(self.routes)

    def _add_help_route(self):
        endpoint = '%s_help' % self.bp_name

        self.blueprint.add_url_rule(
            rule='',
            endpoint=endpoint,
            view_func=self._help_view,
            methods=['GET', 'OPTIONS']
        )

    def _document_route(self, view, rule, method, endpoint, validator):
        full_rule = '/{}{}'.format(self.blueprint.url_prefix.strip('/'), rule)

        if full_rule not in self.routes.keys():
            self.routes[full_rule] = {}

        description = view.__doc__ and view.__doc__.strip()

        self.routes[full_rule][method] = {
            'description': description,
            'name': endpoint,
        }

        if validator:
            schema = getattr(validator, 'schema', None)
            if schema:
                self.routes[full_rule][method]['parameters'] = dict(schema)

    def route(self, rule_path, method, to_json=True, validator=None):
        """
        Decorator that registers a route on the BP or app.

        :param rule_path: endpoint URL minus the API root
        :param method: the HTTP methods accepted
        :param to_json: will parse the result as JSON if set to true.
                        Defaults to true
        :param validator: cerberus validator object. Defaults to None.
                          if provided, will enforce validation using it.
        """

        def inner(f):
            view_name = f.__name__
            endpoint = '%s_%s' % (self.bp_name, view_name)
            rule = '/%s' % rule_path.strip('/')

            def decorated(*args, **kwargs):
                new_kwargs = {}
                if validator:
                    input_json = request.get_json(silent=True, force=True)
                    if not validator.validate(input_json or {}):
                        return make_response(make_error(validator.errors))
                    new_kwargs[self.data_key] = validator.document

                full_kwargs = {**kwargs, **new_kwargs}
                if self.decorator:
                    response = self.decorator(f, *args, **full_kwargs)
                else:
                    response = f(*args, **full_kwargs)
                return make_response(response) if to_json else response

            self.blueprint.add_url_rule(
                rule=rule,
                endpoint=endpoint,
                view_func=decorated,
                methods=[method]
            )

            self._document_route(f, rule, method, endpoint, validator)

            return decorated

        return inner

    def __getattr__(self, item):
        if item.lower() not in self.valid_methods:
            msg = 'Invalid method %s requested from router'
            raise AttributeError(msg % item)

        def inner(*args, **kwargs):
            return self.route(*args, **kwargs, method=item.upper())

        return inner
