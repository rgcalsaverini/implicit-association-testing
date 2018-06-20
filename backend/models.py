import datetime
from ipaddress import ip_address
# from random import shuffle
from uuid import uuid4

import mongoengine


class ModelsContainer(object):
    def __init__(self, *models):
        self.add(*models)

    def add(self, *models):
        for model in models:
            setattr(self, model.__name__, model)


def create_models(me=mongoengine):
    class IPField(me.StringField):
        def validate(self, value):
            if value is None:
                return
            try:
                ip_address(value)
            except ValueError:
                self.error('Invalid IP Address')

    class User(me.Document):
        id = me.StringField(primary_key=True)
        created_at = me.DateTimeField()
        ip = IPField()

        @staticmethod
        def new(req):
            now = datetime.datetime.now()
            environs = [
                'HTTP_X_REAL_IP',
                'HTTP_X_FORWARDED_FOR',
                'REMOTE_ADDR',
            ]
            ip = [req.environ.get(e) for e in environs] + [req.remote_addr]
            user = User(id=uuid4().hex, created_at=now, ip=ip[0])
            return user.save()

    class TaskResult(me.EmbeddedDocument):
        pairing = me.ListField(field=me.StringField(), required=True)
        time = me.FloatField(required=True)
        mistakes = me.FloatField(required=True)

    class Test(me.Document):
        id = me.StringField(primary_key=True)
        template = me.StringField(required=True)
        version = me.IntField(required=True)
        user = me.LazyReferenceField(User, required=False, default=None)
        created_at = me.DateTimeField()
        finished = me.BooleanField(required=True, default=False)
        task_results = me.EmbeddedDocumentListField(TaskResult)

        @staticmethod
        def new(template, version_id, user_id):
            now = datetime.datetime.now()
            test = Test(id=uuid4().hex, template=template.id, user=user_id,
                        created_at=now, version=version_id,
                        finished=False)
            return test.save()

        def set_result(self):
            pass

    return ModelsContainer(User, Test)
