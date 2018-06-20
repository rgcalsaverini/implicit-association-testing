import json
import os
import random
from math import ceil


class TemplateError(Exception):
    pass


def get_template_resource(configs, template, resource, no_fail=False):
    path = template_path(configs, template, resource)
    if no_fail and not os.path.isfile(path):
        return None
    with open(path, 'r') as res_file:
        return res_file.read()


def template_path(configs, template, resource=None):
    filename = resource or 'manifest.json'
    return os.path.join(configs.templates.path, template, filename)


def template_from_file(temp_id, full_path):
    with open(full_path, 'r') as template_file:
        info = json.loads(template_file.read())
    return TestTemplate(temp_id, **info)


def shuffle_and_id(item_list):
    indexes = list(range(len(item_list)))
    random.shuffle(indexes)
    return [{**item_list[i], 'idx': n} for n, i in enumerate(indexes)]


class TestTemplate(object):
    def __init__(self, id, name, description, versions, groups,
                 positive_groups, negative_groups, result_text,
                 consent_button=None):
        self.id = id
        self.name = name
        self.description = description
        self.groups = groups
        self.result_text = result_text
        self.consent_button = consent_button
        self.versions = versions
        self.positive_groups = positive_groups
        self.negative_groups = negative_groups

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

    def _gen_items(self, num, left, right):
        items = []
        print('\n')
        for side, side_items in {'left': left, 'right': right}.items():
            print(side, num/2)
            for g in side_items:
                g_items = list(self.groups[g]['items'])
                g_num = int(ceil(num / (2 * len(side_items))))
                print('    group ', g, ' should have ', g_num)
                mult = int(ceil(2 + g_num / len(g_items)))
                all_items = mult * g_items
                random.shuffle(all_items)
                items += [{**i, 'side': side} for i in all_items[:g_num]]
        return shuffle_and_id(items)

    def random_version(self):
        version_id = random.randrange(len(self.versions))
        version = self.versions[version_id]
        tasks = []

        for t in version['tasks']:
            num = 20
            items = self._gen_items(num, t[0], t[1])
            tasks.append({
                'left': [self.groups[g]['name'] for g in t[0]],
                'right': [self.groups[g]['name'] for g in t[1]],
                'items': items
            })

        return {
            'version_id': version_id,
            'tasks': tasks,
            'structure': version['tasks'],
            'name': self.name,
        }

    def introduction(self, config):
        disclaimers = config.disclaimers
        presentation = get_template_resource(config, self.id, 'intro.md')
        disc = get_template_resource(config, self.id, 'disclaimer.md', True)

        if os.path.isfile(disclaimers.path):
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
