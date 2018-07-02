import os
import unittest
from unittest.mock import MagicMock

from backend.config import ConfigHandler


class TestReader(unittest.TestCase):
    def _create_config(self, **kwargs):
        if 'open' not in kwargs:
            kwargs['open'] = FakeOpen()
        if 'isfile' not in kwargs:
            kwargs['isfile'] = lambda s: True
        if 'path' in kwargs:
            path = kwargs['path']
            del kwargs['path']
        else:
            path = 'path'
        return ConfigHandler(path, **kwargs)

    def test_abs_path(self):
        fake_path = '/tmp/config.json'
        fake_open = FakeOpen('{"a":1}')
        config = self._create_config(path=fake_path, open=fake_open)
        config.load()
        self.assertEqual(fake_open.path, fake_path)

    def test_home_path(self):
        fake_path = 'config.json'
        fake_open = FakeOpen('{"a":1}')
        config = self._create_config(path=fake_path, open=fake_open)
        config.load()
        self.assertEqual(fake_open.path, os.path.expanduser('~/' + fake_path))

    def test_current_dir_path(self):
        fake_path = 'raccoon_config_test.json'
        fake_isfile = MagicMock()
        fake_isfile.side_effect = [False, True]
        fake_open = FakeOpen('{"a":1}')
        config = self._create_config(path=fake_path,
                                     open=fake_open,
                                     isfile=fake_isfile)
        config.load()
        self.assertEqual(fake_open.path, './' + fake_path)

    def test_add_path(self):
        fake_isfile = MagicMock()
        fake_isfile.side_effect = [False, False, True]
        fake_path = 'config.json'
        fake_open = FakeOpen('{"a":1}')
        config = self._create_config(
            path=fake_path,
            open=fake_open,
            isfile=fake_isfile)
        config.add_path('/tmp')
        config.load()
        self.assertEqual(fake_open.path, '/tmp/' + fake_path)

    def test_load_defaults(self):
        defaults = {'aaa': 1}
        config = self._create_config(isfile=lambda *_: False)
        self.assertDictEqual(defaults, config.load(defaults))


class FakeOpen(object):
    def __init__(self, value=None):
        self.value = value

    def __enter__(self, *args):
        return self

    def __exit__(self, *args):
        return self

    def __call__(self, path, *args):
        self.path = path
        return self

    def read(self, *args):
        return self.value

    def write(self, value):
        self.value = value
