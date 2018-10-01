from backend.access import set_access_token
from backend.utils import get_configs

configs = get_configs()

if __name__ == '__main__':
    duration = configs.access_credentials.duration_s
    token = set_access_token(configs)
    spaces = 20 - len(str(duration))

    print('\n  ╭────────────────────────────────────────────────╮')
    print('  │                                                │')
    print('  │ Please take note of your access token bellow.  │')
    print('  │ It will expire in %d seconds %s│' % (duration, ' ' * spaces))
    print('  │                                                │')
    print('  │ %s │' % token.rjust(23).ljust(46))
    print('  │                                                │')
    print('  ╰────────────────────────────────────────────────╯\n')
