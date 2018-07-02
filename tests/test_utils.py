import unittest
from unittest.mock import MagicMock

from backend.utils import format_text, connect_mongo, create_app, get_configs


class TestFormatText(unittest.TestCase):
    def test_nothing(self):
        text = 'nothing here to parse'
        self.assertEqual(format_text(text), text)

        text = 'even with $VARIABLE here'
        self.assertEqual(format_text(text, foo='bar'), text)

    def test_replacements(self):
        texts = [
            ['$VAR', {'var': 'test'}, 'test'],
            ['$VAR ', {'var': 'test'}, 'test '],
            ['$VAR, $VAR and $VAR', {'var': 'test'}, 'test, test and test'],
            ['$1 $2 $3', {'1': '1', '2': '2', '3': '3'}, '1 2 3'],
        ]

        for text_test in texts:
            text = text_test[0]
            vars = text_test[1]
            res = text_test[2]
            self.assertEqual(format_text(text, **vars), res)

    def test_type(self):
        self.assertEqual(format_text('$V', v=1), '1')
        self.assertEqual(format_text('$V', v=False), 'False')
        self.assertEqual(format_text('$V', v=3.14), '3.14')

        # dont care about the output, as long as it doesnt raise
        format_text('$V', v=str)
        format_text('$V', v=lambda _: 1)
        format_text('$V', v=format_text)


class TestMisc(unittest.TestCase):
    def test_connect_mongo(self):
        class FakeConfig(object):
            db = 'db'
            host = 'host'

        fake_connect = MagicMock()
        connect_mongo(FakeConfig, fake_connect)

    def test_create_app(self):
        flask = MagicMock()
        cors = MagicMock()
        app = create_app('secret', flask, cors)
        self.assertEqual(app.secret_key, 'secret')
        self.assertTrue(cors.called)

    def test_get_configs(self):
        handler = MagicMock()
        get_configs(handler)
        self.assertTrue(handler.called)