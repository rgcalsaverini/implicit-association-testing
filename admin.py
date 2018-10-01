"""Admin access

Usage:
  admin.py
  admin.py add <user_id> <name>
  admin.py revoke <user_id>

Options:
  -h --help     Show this screen.
"""
import datetime

from docopt import docopt

from backend.models import create_models
from backend.utils import get_configs, connect_mongo

configs = get_configs()
connect_mongo(configs.mongo)
models = create_models()

if __name__ == '__main__':
    arguments = docopt(__doc__)

    if not arguments['<user_id>']:
        admins = models.Admin.objects.filter().all()
        print('\nEnabled admins')
        for admin in admins:
            print('{:40} {:20}'.format(admin.user_id, admin.name))
        print()
    else:
        admin = models.Admin.objects.filter(
            user_id=arguments['<user_id>']).first()
        if arguments['revoke']:
            admin.delete()
        else:
            if admin:
                admin.active_at = datetime.datetime.utcnow()
                admin.name = arguments['<name>']
                admin.save()
            else:
                admin = models.Admin(user_id=arguments['<user_id>'],
                                     name=arguments['<name>'])
                admin.save()
