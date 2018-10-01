import json
import os
from time import time
from uuid import uuid4

from passlib.hash import pbkdf2_sha256


def set_access_token(configs):
    token = uuid4().hex[:6].upper()
    salt = configs.get('secret_key', '*').encode('utf-8')
    token_hash = pbkdf2_sha256.hash(token, salt=salt)

    with open(configs.access_credentials.path, 'w') as token_file:
        token_file.write(json.dumps({
            'token': token_hash,
            'expire': time() + configs.access_credentials.duration_s,
        }))

    return token


def validate_access_token(configs, input_token):
    if not os.path.isfile(configs.access_credentials.path):
        return False
    with open(configs.access_credentials.path, 'r') as token_file:
        token = json.loads(token_file.read())
    if time() > token.get('expire', time()-999):
        return False
    return pbkdf2_sha256.verify(input_token, token['token'])
