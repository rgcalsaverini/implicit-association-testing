_default_chart = [
    [6, 'little to no'],
    [11, 'slight'],
    [17, 'moderate'],
    ['strong']
]


def grade(test, measurements, chart=None):
    if not is_valid(test.structure, measurements):
        return None

    winner, loser, score = _reduce(test.structure,
                                    test.positive_groups,
                                    measurements)
    if score is None:
        return None

    return {
        'winner': winner,
        'loser': loser,
        'score': score,
        'classification': _get_classification(score, chart or _default_chart)
    }


def _get_classification(score, chart):
    classification = None
    for line in sorted(chart[:-1], key=lambda v: -v[0]):
        if score <= line[0]:
            classification = line[1]
        else:
            break
    return classification or chart[-1][0]


def _reduce(structure, pos, measurements):
    res = {}

    for i, task in enumerate(structure):
        if not _has_two_groups(task):
            continue
        positive_group = _get_positive_group(task, pos)
        result = _get_result(measurements[i])
        res[positive_group] = res.get(positive_group, 0) + result
    if not res:
        return None, None, None

    contestants = list(res.keys())

    if len(contestants) != 2:
        raise ValueError('Invalid number of contestants')

    total = [sum([r for g, r in res.items() if g == c]) for c in contestants]
    winner_idx = 0 if min(total) == total[0] else 1
    loser_idx = 0 if winner_idx == 1 else 1
    winner = contestants[winner_idx]
    loser = contestants[loser_idx]
    score = total[loser_idx] - total[winner_idx]
    return winner, loser, score


def _has_two_groups(task):
    return len(task.left) == 2 and len(task.right) == 2


def _get_positive_group(task, positive_groups):
    if task.left[0] in positive_groups:
        return task.left[1]
    if task.left[1] in positive_groups:
        return task.left[0]
    if task.right[0] in positive_groups:
        return task.right[1]
    return task.right[0]


def is_valid(structure, measurements):
    return True


def _get_result(task_result):
    return task_result['duration'] + task_result['mistakes']
