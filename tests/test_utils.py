import unittest
from backend.utils import format_text


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
