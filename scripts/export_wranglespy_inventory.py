#!/usr/bin/env python3
"""Run only in the upstream schema job, without database or VPN secrets."""
import inspect
import json
from pathlib import Path
import sys


def callable_names(namespace, replacements=None):
    names = set()
    replacements = replacements or {}

    def walk(obj, prefix='', ancestors=()):
        if id(obj) in ancestors:
            return
        if inspect.isfunction(obj):
            names.add(prefix)
        for name in dir(obj):
            if name.startswith('_') or (not prefix and name in ('main', 'pandas')):
                continue
            child = getattr(obj, name)
            if inspect.isfunction(child) or (inspect.ismodule(child) and child.__name__.startswith('wrangles.recipe_wrangles')):
                key = replacements.get(name, name)
                walk(child, f'{prefix}.{key}' if prefix else key, (*ancestors, id(obj)))

    walk(namespace)
    if not names:
        raise ValueError('Empty callable inventory')
    return sorted(names)


if __name__ == '__main__':
    sys.path.insert(0, str(Path(sys.argv[1]).resolve()))
    import wrangles
    import wrangles.recipe_wrangles
    reverse = {v: k for k, v in wrangles.config.reserved_word_replacements.items()}
    print(json.dumps({'names': callable_names(wrangles.recipe_wrangles, reverse)}, indent=2))
