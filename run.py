import os

from flask import send_file
from flask_kit import create_app
from flask_kit import get_configs
from mongoengine import connect

from backend.models import create_models
from backend.ui_api import ui_api

configs = get_configs(filename='configs.yaml')
connect(configs.mongo.db, host=configs.mongo.host)
models = create_models()

blueprints = [
    ui_api(models, configs)
]

app = create_app(configs, blueprints=blueprints, https=False)

if __name__ == '__main__':
    @app.route('/templates/<path:path>')
    def dev_static_route(path):
        full_path = os.path.join('..', configs.templates.path, path)
        print(full_path)
        return send_file(full_path)


    app.run(debug=True, port=5000)
