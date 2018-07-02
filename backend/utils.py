from flask import Flask
from flask_cors import CORS
from mongoengine import connect as mongo_connect

from backend.config import ConfigHandler


def connect_mongo(configs, connect=mongo_connect):
    connect(configs.db, host=configs.host)


def create_app(secret_key, flask=Flask, cors=CORS):
    """
    Create Flask app
    """
    app = flask(__name__)
    app.secret_key = secret_key
    headers = ["Content-Type", "Authorization",
               "Access-Control-Allow-Credentials",
               "Access-Control-Allow-Methods"]
    cors(app, allow_headers=headers, supports_credentials=True)
    return app


def get_configs(config_handler=ConfigHandler):
    """
    Get configs
    """
    handler = config_handler('configs.json')
    config = handler.load()
    return config


def format_text(text, **variables):
    new_text = text
    for key, value in variables.items():
        new_text = new_text.replace('$%s' % key.upper(), str(value))
    return new_text
