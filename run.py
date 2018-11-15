import os

from flask import send_file
from flask_kit import create_app

from backend.models import create_models
from backend.ui_api import ui_api
from backend.utils import get_configs, connect_mongo

configs = get_configs()
connect_mongo(configs.mongo)
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
