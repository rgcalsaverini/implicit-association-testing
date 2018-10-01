import json
import unittest

from mongoengine import connect

from backend.config import DotDict
from backend.models import create_models
from backend.ui_api import ui_api
from backend.utils import create_app

configs = DotDict({
    "templates": {
        "path": "/tmp"
    },
})
models = create_models()


class UITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_suite_app()

    def tearDown(self):
        models.Test.objects.delete()


class GeneralRoutesTest(UITestCase):
    def test_root(self):
        result = self.app.get('/ui-api')
        self.assertEqual(result.status_code, 200)


class TemplatesTest(UITestCase):
    def test_404(self):
        result = self.app.get('/ui-api/introductions/not_valid_template')
        self.assertEqual(result.status_code, 404)

    def test_get(self):
        app = create_suite_app(lambda *_: FakeTemplate())
        result = app.get('/ui-api/introductions/a')
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.data, b'intro')


class IatTest(UITestCase):
    def test_404_create(self):
        result = post(self.app, '/ui-api/tests/not_valid_template', {})
        self.assertEqual(result.status_code, 404)

    def test_create(self):
        app = create_suite_app(lambda *_: FakeTemplate())
        result = post(app, '/ui-api/tests/a', {})
        self.assertEqual(result.status_code, 200)
        self.assertEqual(len(list(models.Test.objects.all())), 1)

    def test_results_400_empty(self):
        app = create_suite_app(lambda *_: FakeTemplate())
        test_result = post(app, '/ui-api/tests/a', {})
        test_id = test_result.json['id']
        result = post(app, '/ui-api/tests/%s/results' % test_id, {})
        self.assertEqual(result.status_code, 400)

    def test_results(self):
        app = create_suite_app(lambda *_: FakeTemplate())
        test_result = post(app, '/ui-api/tests/a', {})
        test_id = test_result.json['id']
        result = post(app, '/ui-api/tests/%s/results' % test_id, {
            'results': [
                {'duration': 1.0, 'mistakes': 1},
                {'duration': 2.0, 'mistakes': 1},
            ]
        })
        self.assertEqual(result.status_code, 200)


class FakeTemplate(object):
    id = 'id'
    positive_groups = ['gr1']
    negative_groups = ['gr2']
    result_text = 'hi'
    groups = {
        'gr1': {'name': 'gr1'},
        'gr2': {'name': 'gr2'},
        'gr3': {'name': 'gr3'},
        'gr4': {'name': 'gr4'}
    }

    def introduction(self, *_):
        return 'intro'

    def random_version(self, *_):
        return {
            'version_id': 1,
            'structure': [
                [["gr1", "gr4"], ["gr2", "gr4"]],
                [["gr1", "gr3"], ["gr2", "gr3"]]
            ],
        }

    def questionnaire(self, *_):
        return {'pt1': '1', 'pt2': '2'}


def create_suite_app(*extras):
    app = create_app('testing')
    connect('testing', host='mongomock://localhost')
    app.register_blueprint(ui_api(models, configs, *extras))
    app.testing = True
    return app.test_client()


def post(app, url, json_data, headers=None):
    return app.post(
        url,
        data=json.dumps(json_data),
        content_type='application/json',
        headers=headers
    )
