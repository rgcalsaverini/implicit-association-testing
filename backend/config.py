import json
import logging
import os


class ConfigHandler(object):
    def __init__(self, config_path, open=open, isfile=os.path.isfile,
                 logger=logging):
        self.config_path = config_path
        self.open = open
        self.isfile = isfile
        self.home = os.environ.get('HOME')
        self.logger = logger

    def _add_path(self, p):
        return p and os.path.join(p, self.config_path)

    def load(self, defaults=None):
        config = defaults or {}

        if os.path.isabs(self.config_path):
            search_paths = [self.config_path]
        else:
            search_paths = map(self._add_path, (self.home, '.'))

        try:
            file_path = next(
                filter(lambda p: p and self.isfile(p), search_paths))
            with self.open(file_path, 'r') as f:
                loaded = json.loads(f.read())
                config = merge(config, loaded)
        except Exception:
            self.logger.error(
                'Error parsing config file "{}"'.format(self.config_path))
            pass

        return DotDictify(config)

    def update(self, values):
        config = self.load({})
        config = merge(config, values)
        with self.open(self.config_path, 'w+') as f:
            f.write(json.dumps(config))


def merge(base, increment):
    for key, value in increment.items():
        is_dict = type(value) == dict
        base[key] = merge(base.get(key, {}), value) if is_dict else value
    return base


class DotDictify(dict):
    def __init__(self, value=None):
        if value is None:
            pass
        elif isinstance(value, dict):
            for key in value:
                self.__setitem__(key, value[key])
        else:
            raise TypeError('Expected dict')

    def __setitem__(self, key, value):
        if isinstance(value, dict) and not isinstance(value, DotDictify):
            value = DotDictify(value)
        super(DotDictify, self).__setitem__(key, value)

    def __getattr__(self, key):
        return self[key]

    __setattr__ = __setitem__
