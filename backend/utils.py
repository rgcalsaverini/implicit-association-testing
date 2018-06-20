from flask import Flask
from flask_cors import CORS
from mongoengine import connect as mongo_connect

from backend.config import ConfigHandler


def connect_mongo(configs):
    mongo_connect(configs.mongo.db, host=configs.mongo.host)


def create_app(secret_key):
    """
    Create Flask app
    """
    app = Flask(__name__)
    app.secret_key = secret_key
    cors_headers = ["Content-Type", "Authorization",
                    "Access-Control-Allow-Credentials",
                    "Access-Control-Allow-Methods"]
    CORS(app, allow_headers=cors_headers, supports_credentials=True)
    return app


def get_configs():
    """
    Get configs
    """
    config_handler = ConfigHandler('configs.json')
    config = config_handler.load()
    return config
