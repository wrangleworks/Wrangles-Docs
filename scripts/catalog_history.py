"""Read the old history format during migration; always write structured entries."""
import re


def history_status(value):
    return value.get('status') if isinstance(value, dict) else value


def normalize_history(history):
    if not isinstance(history, dict):
        raise ValueError('Catalog history must be an object')
    result = {}
    for name, value in history.items():
        record = {'status': value, 'catalog_key': name} if isinstance(value, str) else value
        if (not isinstance(record, dict) or set(record) != {'status', 'catalog_key'}
                or record['status'] not in ('legacy', 'not active')
                or not isinstance(record['catalog_key'], str)
                or not re.fullmatch(r'[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*', record['catalog_key'])):
            raise ValueError(f'Invalid catalog history entry: {name}')
        result[name] = dict(record)
    return result
