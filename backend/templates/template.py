import json
import os
import random
from collections import OrderedDict

from backend.templates.utils import shuffle_and_id, get_resource
from backend.templates.validation import validators


class TestTemplate(object):
    def __init__(self, temp_id, raw_data):
        status, result = template_errors(raw_data)
        if not status:
            raise TemplateError(result)

        self.id = temp_id
        self.version = str(result.get('file_version', 1))
        if self.version == '1':
            self.name = result['name']
            self.description = result.get('description', '')
            self.groups = result['groups']
            self.result_text = result['result_text']
            self.consent_button = result.get('consent_button')
            self.versions = result['versions']
            self.positive_groups = result['positive_groups']
            self.negative_groups = result['negative_groups']
            self.popup_messages = result.get('popup_messages', {})
            self.can_skip_questions = result.get('can_skip_questions', True)
        else:
            raise ValueError('Invalid version')

    def _gen_items(self, left, right):
        items = []
        for side, side_items in {'left': left, 'right': right}.items():
            for g in side_items:
                g_items = list(self.groups[g]['items'])
                items += [{**i, 'side': side} for i in g_items]
        return shuffle_and_id(items)

    def random_version(self):
        version_id = random.randrange(len(self.versions))
        version = self.versions[version_id]
        tasks = []
        groups = []

        for task_side in version['tasks']:
            groups.extend([*task_side[0], *task_side[1]])
            items = self._gen_items(task_side[0], task_side[1])
            tasks.append({
                'left': [self.groups[g]['name'] for g in task_side[0]],
                'right': [self.groups[g]['name'] for g in task_side[1]],
                'items': items
            })

        group_items = {
            self.groups[g]['name']: self.groups[g]['items']
            for g in set(groups)
        }

        return {
            'version_id': version_id,
            'tasks': tasks,
            'structure': version['tasks'],
            'name': self.name,
            'group_items': group_items,
            'popup_messages': self.popup_messages,
            'can_skip_questions': self.can_skip_questions,
        }

    def introduction(self, config, open=open, isfile=os.path.isfile):
        path = config.templates.path
        disclaimers = config.disclaimers
        presentation = get_resource(path, self.id, 'intro.md', open=open,
                                    isfile=isfile)
        disc = get_resource(path, self.id, 'disclaimer.md', True, open=open,
                            isfile=isfile)

        if isfile(disclaimers.path):
            with open(disclaimers.path, 'r') as disc_file:
                generic = disc_file.read()
        else:
            generic = ''

        intro_text = '{}\n{}\n{}'.format(
            presentation,
            generic,
            disc or '',
        ).strip()
        consent_button = self.consent_button or disclaimers.consent_button

        return {
            'text': intro_text,
            'button': consent_button,
            'name': self.name,
        }

    def questionnaire(self, path, point, open=open, isfile=os.path.isfile):
        resource = 'q_%s.json' % point
        conf = get_resource(path, self.id, resource, no_fail=True,
                            isfile=isfile, open=open)
        if not conf:
            return conf
        conf_dict = json.loads(conf)
        questionnaire = OrderedDict([
            (q['id'], {**q, 'index': i}) for i, q in enumerate(conf_dict)
        ])
        questionnaire['__IDS'] = list(questionnaire.keys())
        return questionnaire


class TemplateError(ValueError):
    def __init__(self, validation_errors, *args, **kwargs):
        super(TemplateError, self).__init__(validation_errors, *args, **kwargs)
        self.validation_errors = validation_errors


def template_errors(data):
    version_validator = validators[str(data.get('file_version', '1'))]
    is_valid = version_validator.validate(data)
    if not is_valid:
        return False, version_validator.errors
    return True, version_validator.document


def template_from_file(temp_id, full_path):
    with open(full_path, 'r') as template_file:
        info = json.loads(template_file.read())
    return TestTemplate(temp_id, info)
