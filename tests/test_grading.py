import unittest

from backend.grading import grade

chart = [
    [15, 'C'],
    [5, 'A'],
    [10, 'B'],
    ['D']
]


class TestGrading(unittest.TestCase):
    def test_realistic(self):
        class FakeTest(object):
            positive_groups = ['good']
            structure = [
                FakeTask(['g2'], ['g1']),
                FakeTask(['good'], ['bad']),
                FakeTask(['g2', 'good'], ['g1', 'bad']),
                FakeTask(['g2', 'good'], ['g1', 'bad']),
                FakeTask(['g1'], ['g2']),
                FakeTask(['g1', 'good'], ['g2', 'bad']),
                FakeTask(['g1', 'good'], ['g2', 'bad']),
            ]

        mes = [
            make_mes(10, 1),
            make_mes(15, 0),
            make_mes(18.5, 2),
            make_mes(20, 1),
            make_mes(8, 2),
            make_mes(11.5, 0),
            make_mes(15, 1),
        ]

        res = grade(FakeTest(), mes, chart)
        self.assertEqual(res['winner'], 'g1')
        self.assertEqual(res['loser'], 'g2')
        self.assertEqual(res['score'], 14)
        self.assertEqual(res['classification'], 'C')

    def test_mix_1(self):
        class FakeTest(object):
            positive_groups = ['good']
            structure = [
                FakeTask(['g1', 'good'], ['g2', 'bad']),
                FakeTask(['g2', 'good'], ['g1', 'bad']),
                FakeTask(['g1', 'bad'], ['g2', 'good']),
                FakeTask(['g2', 'bad'], ['g1', 'good']),
            ]

        mes = [
            make_mes(20, 0),
            make_mes(9, 1),
            make_mes(15, 5),
            make_mes(10, 10),
        ]
        res = grade(FakeTest(), mes, chart)
        self.assertEqual(res['winner'], 'g2')
        self.assertEqual(res['loser'], 'g1')
        self.assertEqual(res['score'], 10)
        self.assertEqual(res['classification'], 'B')

    def test_mix_2(self):
        class FakeTest(object):
            positive_groups = ['good']
            structure = [
                FakeTask(['good', 'g1'], ['g2', 'bad']),
                FakeTask(['good', 'g2'], ['bad', 'g1']),
                FakeTask(['g2', 'bad'], ['g1', 'good']),
                FakeTask(['g1', 'bad'], ['good', 'g2']),
            ]

        mes = [
            make_mes(1, 0),
            make_mes(20, 1),
            make_mes(1, 0),
            make_mes(1, 0),
        ]
        res = grade(FakeTest(), mes, chart)
        self.assertEqual(res['winner'], 'g1')
        self.assertEqual(res['loser'], 'g2')
        self.assertEqual(res['score'], 20)
        self.assertEqual(res['classification'], 'D')

    def test_too_many_contestants(self):
        with self.assertRaises(ValueError):
            class FakeTest(object):
                positive_groups = ['good']
                structure = [
                    FakeTask(['good', 'g1'], ['g2', 'bad']),
                    FakeTask(['good', 'g3'], ['bad', 'g1']),
                    FakeTask(['g2', 'bad'], ['g1', 'good']),
                    FakeTask(['g1', 'bad'], ['good', 'g2']),
                ]

            mes = [
                make_mes(1, 0),
                make_mes(1, 0),
                make_mes(1, 0),
                make_mes(1, 0),
            ]
            grade(FakeTest(), mes, chart)

    def test_too_few_contestants(self):
        with self.assertRaises(ValueError):
            class FakeTest(object):
                positive_groups = ['good']
                structure = [
                    FakeTask(['good', 'g1'], ['g2', 'bad']),
                ]

            mes = [
                make_mes(1, 0),  # g1 > g2 = 1
            ]
            grade(FakeTest(), mes, chart)

    def test_empty(self):
        class FakeTest(object):
            positive_groups = ['good']
            structure = [
            ]

        mes = [
        ]
        self.assertIsNone(grade(FakeTest(), mes, chart))


class FakeTask(object):
    def __init__(self, left, right):
        self.left = left
        self.right = right


def make_mes(duration, mistakes):
    return {'duration': duration, 'mistakes': mistakes}
