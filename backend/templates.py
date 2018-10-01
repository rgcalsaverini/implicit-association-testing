import json
import os
import random


class TemplateError(Exception):
    pass


def all_templates(path, get_one):
    templates = list()

    for res in os.walk(path):
        subdir = res[0].split('/')
        manifest_path = os.path.join(res[0], 'manifest.json')
        if len(subdir) != 2 or not os.path.isfile(manifest_path):
            continue
        temp_id = subdir[-1]
        full_path = template_path(path, temp_id)
        template = get_one(temp_id, full_path)
        templates.append({
            'id': temp_id,
            'name': template.name
        })
    return templates


def get_resource(path, template, res, no_fail=False, open=open,
                 isfile=os.path.isfile, ):
    path = template_path(path, template, res)
    if no_fail and not isfile(path):
        return None
    with open(path, 'r') as res_file:
        return res_file.read()


def template_path(path, template, resource=None):
    filename = resource or 'manifest.json'
    return os.path.join(path, template, filename)


def template_from_file(temp_id, full_path):
    with open(full_path, 'r') as template_file:
        info = json.loads(template_file.read())
    return TestTemplate(temp_id, **info)


def shuffle_and_id(item_list, shuffle_func=random.shuffle):
    indexes = list(range(len(item_list)))
    shuffle_func(indexes)
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
        }

    def introduction(self, config):
        path = config.templates.path
        disclaimers = config.disclaimers
        presentation = get_resource(path, self.id, 'intro.md')
        disc = get_resource(path, self.id, 'disclaimer.md', True)

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

    def questionnaire(self, path, point):
        resource = 'q_%s.json' % point
        conf = get_resource(path, self.id, resource, no_fail=True)
        if not conf:
            return conf
        return json.loads(conf)
