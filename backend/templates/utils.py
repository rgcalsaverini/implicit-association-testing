import os
import random


class TemplateError(Exception):
    pass


def all_templates(path, get_one):
    """ List all templates """
    templates = list()

    for res in os.walk(path):
        subdir = [r for r in res[0].split('/') if r]
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


def shuffle_and_id(item_list, shuffle_func=random.shuffle):
    indexes = list(range(len(item_list)))
    shuffle_func(indexes)
    return [{**item_list[i], 'idx': n} for n, i in enumerate(indexes)]


