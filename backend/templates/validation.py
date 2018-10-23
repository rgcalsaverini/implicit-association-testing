from cerberus import Validator

_schema_1 = {
    'name': {
        'type': 'string',
        'maxlength': 50,
        'minlength': 3,
        'required': True,
        'nullable': False,
    },
    'description': {
        'type': 'string',
        'maxlength': 200,
        'minlength': 3,
        'required': False,
        'nullable': False,
    },
    'file_version': {
        'type': 'integer',
        'min': 1,
        'required': False,
        'nullable': False,
        'default': 1,
    },
    'popup_messages': {
        'type': 'dict',
        'required': False,
        'nullable': False,
    },
    'can_skip_questions': {
        'type': 'boolean',
        'required': False,
        'nullable': False,
        'default': True,
    },
    'groups': {
        'type': 'dict',
        'required': True,
        'nullable': False,
        'minlength': 2,
        'valueschema': {
            'type': 'dict',
            'schema': {
                'name': {
                    'type': 'string',
                    'maxlength': 50,
                    'minlength': 1,
                    'required': True,
                    'nullable': False,
                },
                'items': {
                    'type': 'list',
                    'minlength': 2,
                    'required': True,
                    'nullable': False,
                    'schema': {
                        'type': 'dict',
                        'schema': {
                            'type': {
                                'type': 'string',
                                'required': True,
                                'nullable': False,
                            },
                            'value': {
                                'type': 'string',
                                'required': True,
                                'nullable': False,
                            },
                        }
                    }
                },
            }
        }
    },
    'positive_groups': {
        'type': 'list',
        'required': True,
        'nullable': False,
        'minlength': 1,
    },
    'negative_groups': {
        'type': 'list',
        'required': True,
        'nullable': False,
        'minlength': 1,
    },
    'result_text': {
        'type': 'string',
        'required': True,
        'nullable': False,
    },
    'versions': {
        'type': 'list',
        'required': True,
        'nullable': False,
        'minlength': 1,
        'schema': {
            'type': 'dict',
            'nullable': False,
            'schema': {
                'tasks': {
                    'type': 'list',
                    'minlength': 2,
                    'schema': {
                        'type': 'list',
                        'minlength': 2,
                        'maxlength': 2,
                        'schema': {
                            'type': 'list',
                            'schema': {'type': 'string'}
                        }
                    }
                }
            }

        }
    }
}

_schemas = {
    '1': _schema_1,
}

validators = dict()

for version, schema in _schemas.items():
    validators[version] = Validator(schema)
    validators[version].allow_unknown = False
