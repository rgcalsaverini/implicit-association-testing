from backend.models import create_models
from backend.ui_api import ui_api
from backend.utils import get_configs, connect_mongo, create_app
from flask import send_file
import os

configs = get_configs()
connect_mongo(configs)
models = create_models()
app = create_app('TEMP_KEY')

app.register_blueprint(ui_api(models, configs))

if __name__ == '__main__':
    @app.route('/templates/<path:path>')
    def dev_static_route(path):
        full_path = os.path.join('..', configs.templates.path, path)
        print(full_path)
        return send_file(full_path)
    app.run(debug=True, port=5000)
