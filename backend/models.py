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

    class TaskMeasurement(me.EmbeddedDocument):
        duration = me.FloatField(required=True)
        mistakes = me.IntField(required=True)

    class TaskStructure(me.EmbeddedDocument):
        left = me.ListField(me.StringField(), required=True)
        right = me.ListField(me.StringField(), required=True)

    class Test(me.Document):
        id = me.StringField(primary_key=True)
        template = me.StringField(required=True)
        version = me.IntField(required=True)
        user = me.LazyReferenceField(User, required=False, default=None)
        created_at = me.DateTimeField()
        finished = me.BooleanField(required=True, default=False)
        structure = me.EmbeddedDocumentListField(TaskStructure)
        positive_groups = me.ListField(me.StringField())
        negative_groups = me.ListField(me.StringField())
        measurements = me.EmbeddedDocumentListField(TaskMeasurement)
        classification = me.StringField()
        winner = me.StringField()
        winner_score = me.FloatField()
        on_mobile = me.BooleanField()
        questionnaire = me.DictField(required=False)

        @staticmethod
        def new(template, version, user_id, mobile):
            now = datetime.datetime.now()
            test = Test(id=uuid4().hex,
                        template=template.id,
                        user=user_id,
                        created_at=now,
                        version=version['version_id'],
                        finished=False,
                        positive_groups=template.positive_groups,
                        negative_groups=template.negative_groups,
                        on_mobile=mobile)
            for task in version['structure']:
                test.structure.create(left=task[0], right=task[1])
            return test.save()

        def set_result(self, results, measurements, questionnaire=None):
            self.finished = True
            self.winner = results['winner']
            self.winner_score = results['score']
            self.classification = results['classification']
            self.measurements.delete()
            for mes in measurements:
                self.measurements.create(**mes)
            self.questionnaire = questionnaire or {}
            self.save()

    return ModelsContainer(User, Test)
