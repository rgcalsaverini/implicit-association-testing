import os
from uuid import uuid4

from flask import send_file

from backend.models import create_models
from backend.api import ui_api, result_api
from backend.utils import get_configs, connect_mongo, create_app

configs = get_configs()
connect_mongo(configs.mongo)
models = create_models()
app = create_app(configs.get('secret_key', uuid4().hex))

app.register_blueprint(ui_api(models, configs))
app.register_blueprint(result_api(models, configs))

if __name__ == '__main__':
    @app.route('/templates/<path:path>')
    def dev_static_route(path):
        full_path = os.path.join('..', configs.templates.path, path)
        print(full_path)
        return send_file(full_path)


    app.run(debug=True, port=5000)
