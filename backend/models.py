import datetime
import re
import time
from uuid import uuid4

import mongoengine

unsafe_key_re = re.compile(r'[^a-zA-Z0-9 ]')


def output_datetime(datetime_val):
    return {
        'iso': datetime_val.isoformat(),
        'unix': time.mktime(datetime_val.timetuple()),
        'tuple': datetime_val.timetuple(),
    }


def sanitize_dict_keys(dictionary):
    """ Remove weird characters from dict keys """
    return {unsafe_key_re.sub('', k): v for k, v in dictionary.items()}


def cleanup_questionnaire(questionnaire):
    """ Make sure that the questionnaire is safe for insertion on doc.  """
    for part, questions in questionnaire.items():
        for question_id, answer in questions.items():
            if isinstance(answer, dict):
                questionnaire[part][question_id] = sanitize_dict_keys(answer)


class ModelsContainer(object):
    def __init__(self, *models):
        self.add(*models)

    def add(self, *models):
        for model in models:
            setattr(self, model.__name__, model)


def create_models(me=mongoengine):
    class User(me.Document):
        id = me.StringField(primary_key=True)
        created_at = me.DateTimeField()
        ip = me.StringField(default='')

        @staticmethod
        def new():
            now = datetime.datetime.now()
            user = User(id=uuid4().hex, created_at=now, ip='')
            return user.save()

        def json(self):
            return {
                'id': self.id,
                'created_at': output_datetime(self.created_at),
            }

    class TaskMeasurement(me.EmbeddedDocument):
        duration = me.FloatField(required=True)
        mistakes = me.IntField(required=True)

    class TaskStructure(me.EmbeddedDocument):
        left = me.ListField(me.StringField(), required=True)
        right = me.ListField(me.StringField(), required=True)

    class Admin(me.Document):
        active_at = me.DateTimeField(default=datetime.datetime.utcnow)
        user_id = me.StringField(required=True)
        name = me.StringField(required=True)

        meta = {
            'indexes': [
                {'fields': ['active_at'], 'expireAfterSeconds': 86400}
            ]
        }

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
            if questionnaire:
                cleanup_questionnaire(questionnaire)
            self.questionnaire = questionnaire or {}
            self.save()

        def json(self, full):
            basic_data = {
                'id': self.id,
                'template': self.template,
                'user': self.user.id,
                'created_at': output_datetime(self.created_at),
                'finished': self.finished,
                'classification': self.classification,
                'winner': self.winner,
            }
            full_data = {
                'version': self.version,
                'structure': self.structure,
                'positive_groups': self.positive_groups,
                'negative_groups': self.negative_groups,
                'measurements': self.measurements,
                'winner_score': self.finished,
                'on_mobile': self.on_mobile,
                'questionnaire': self.questionnaire,
            }
            return {**basic_data, **(full_data if full else {})}

    return ModelsContainer(User, Test, Admin)
