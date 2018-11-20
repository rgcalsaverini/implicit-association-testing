def format_text(text, **variables):
    new_text = text
    for key, value in variables.items():
        new_text = new_text.replace('$%s' % key.upper(), str(value))
    return new_text
