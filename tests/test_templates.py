import unittest

from backend.config import DotDict
from backend.templates.template import TestTemplate as Template, TemplateError
from backend.templates.utils import get_resource, shuffle_and_id
from tests.utils import FakeOpen
import json


class FailOpen(object):
    def __enter__(self, *args):
        return self

    def __exit__(self, *args):
        return self

    def __call__(self, *args):
        raise FileNotFoundError


class TestGetTemplateResource(unittest.TestCase):
    def test_exists(self):
        configs = DotDict({'templates': {'path': '/my_path'}})
        fake_open = FakeOpen('contents')
        get_resource(configs.templates.path, 'my_template', 'my_res',
                     open=fake_open, isfile=lambda *a: True)

        self.assertEqual(fake_open.path, '/my_path/my_template/my_res')

    def test_can_fail(self):
        configs = DotDict({'templates': {'path': '/my_path'}})
        fake_open = FailOpen()
        res = get_resource(configs.templates.path, 'my_template', 'my_res',
                           no_fail=True, open=fake_open,
                           isfile=lambda *a: False)
        self.assertIsNone(res)

    def test_not_found(self):
        configs = DotDict({'templates': {'path': '/my_path'}})
        fake_open = FailOpen()
        with self.assertRaises(FileNotFoundError):
            get_resource(configs.templates.path, 'my_template', 'my_res',
                         open=fake_open, isfile=lambda *a: False)


class TestShuffleAndId(unittest.TestCase):
    def test_basic(self):
        items = [{'name': 'hi', 'id': 1}, {}, {1: None}]
        new_items = shuffle_and_id(items, lambda a: a)
        for idx, item in enumerate(new_items):
            self.assertEqual(idx, item['idx'])
            del item['idx']
            self.assertDictEqual(item, items[idx])


class TestTemplate(unittest.TestCase):
    def test_min_1(self):
        template_data = {
            'name': 'name',
            'description': 'description',
            'groups': {
                'a': {'name': 'A', 'items': [
                    {'type': 'text', 'value': 'a.1'},
                    {'type': 'text', 'value': 'a.2'},
                ]},
                'b': {'name': 'B', 'items': [
                    {'type': 'text', 'value': 'b.1'},
                    {'type': 'text', 'value': 'b.2'},
                ]},
            },
            'positive_groups': ['a'],
            'negative_groups': ['b'],
            'result_text': 'Res',
            'versions': [{'tasks': [
                [['a'], ['b']],
                [['a'], ['b']],
            ]}],
        }
        template = Template('id', template_data)
        template.random_version()
        questionnaire = [
            {'id': 'q1'},
            {'id': 'q2'},
            {'id': 'q3'},
            {'id': 'q4'},
        ]
        fake_open = FakeOpen(json.dumps(questionnaire))
        configs = DotDict({
            'templates': {'path': '/my_path'},
            'disclaimers': {'path': 'a', 'consent_button': 'a'},
        })

        q1 = template.questionnaire('', '', fake_open, isfile=lambda *a: True)
        self.assertIsNotNone(q1)
        q2 = template.questionnaire('', '', fake_open, isfile=lambda *a: False)
        self.assertIsNone(q2)

        intro = template.introduction(configs, open=fake_open, isfile=lambda *a: False)
        self.assertEqual(json.loads(intro['text']), questionnaire)

        self.assertEquals(template.name, 'name')
        self.assertEquals(template.description, 'description')
        self.assertEquals(template.positive_groups, ['a'])
        self.assertEquals(template.negative_groups, ['b'])
        self.assertEquals(template.groups['a']['name'], 'A')
        self.assertEquals(template.groups['b']['name'], 'B')
        self.assertListEqual(template.versions[0]['tasks'][0], [['a'], ['b']])

    def test_empty(self):
        with self.assertRaises(TemplateError):
            Template('id', {})

