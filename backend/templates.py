import json
import os
import random


class TemplateError(Exception):
    pass


def template_path(configs, template, resource=None):
    filename = resource or 'manifesto.json'
    return os.path.join(configs.templates.path, template, filename)


def template_from_file(temp_id, full_path):
    with open(full_path, 'r') as template_file:
        info = json.loads(template_file.read())
    return TestTemplate(temp_id, **info)


def shuffle(item_list):
    indexes = list(range(len(item_list)))
    random.shuffle(indexes)
    return [item_list[i] for i in indexes]


# class TestGroup(object):
#     def __init__(self, name, items):
#         self.name = name
#         self.items = items
#
#     def to_json(self):
#         return {
#             'name': self.name,
#             'items': self.items,
#         }
#
#
# class TestVersion(object):
#     def __init__(self, groups, idx, primary, secondary):
#         if len(primary) != 2 or len(secondary) != 2:
#             msg = 'Template should have 2 primary and 2 secondary groups.'
#             raise TemplateError(msg)
#         self.idx = idx
#         self.primary = {
#             primary[0]: TestGroup(**groups[primary[0]]),
#             primary[1]: TestGroup(**groups[primary[1]]),
#         }
#         self.secondary = {
#             secondary[0]: TestGroup(**groups[secondary[0]]),
#             secondary[1]: TestGroup(**groups[secondary[1]]),
#         }
#
#     def to_json(self):
#         return {
#             'primary': {k: v.to_json() for k, v in self.primary.items()},
#             'secondary': {k: v.to_json() for k, v in self.secondary.items()},
#             'id': self.idx,
#         }


class TestTemplate(object):
    def __init__(self, id, name, description, versions, groups, presentation,
                 disclaimer=None, consent_button=None):
        self.id = id
        self.name = name
        self.description = description
        self.groups = groups
        self.presentation = presentation
        self.disclaimer = disclaimer or ''
        self.consent_button = consent_button
        self.versions = versions

    def basic_data(self):
        return {
            'name': self.name,
            'description': self.description,
        }

    def to_json(self):
        return {
            **self.basic_data(),
            'versions': [v.to_json() for v in self.versions],
        }

    def _gen_items(self, multiplier, left, right):
        items = []
        for g in left:
            all_items = list(self.groups[g]['items'])
            items += [{**i, 'side': 'left'} for i in all_items] * multiplier
        for g in right:
            all_items = list(self.groups[g]['items'])
            items += [{**i, 'side': 'right'} for i in all_items] * multiplier
        return shuffle(items)

    def random_version(self):
        version_id = random.randrange(len(self.versions))
        version = self.versions[version_id]
        tasks = []

        for t in version['tasks']:
            mult = 3 - len(t[0])
            items = self._gen_items(mult, t[0], t[1])
            tasks.append({
                'left': t[0],
                'right': t[1],
                'items': items
            })

        return {
            'id': version_id,
            'tasks': tasks,
        }

    def introduction(self, disclaimers):
        consent_text = '{}\n{}\n{}'.format(
            self.presentation,
            disclaimers.iat_generic,
            self.disclaimer,
        ).strip()
        consent_button = self.consent_button or disclaimers.consent_button

        return {
            'text': consent_text,
            'button': consent_button,
        }
