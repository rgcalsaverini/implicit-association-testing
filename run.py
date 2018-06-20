from backend.models import create_models
from backend.ui_api import ui_api
from backend.utils import get_configs, connect_mongo, create_app

configs = get_configs()
connect_mongo(configs)
models = create_models()
app = create_app('TEMP_KEY')

app.register_blueprint(ui_api(models, configs))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
