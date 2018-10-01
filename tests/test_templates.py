import unittest

from backend.config import DotDict
from backend.templates import get_resource, shuffle_and_id, \
    TestTemplate as Template
from tests.utils import FakeOpen


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
    def test_empty(self):
        template = Template('id', 'name', 'descr', [{'tasks': []}], [], [], [],
                            'tx', 'btn')
        template.random_version()
        # template.introduction(DotDict({
        #     'disclaimers': {'consent_button': 'my_but'},
        #     'templates': {'path': '/my_path'},
        # }))
