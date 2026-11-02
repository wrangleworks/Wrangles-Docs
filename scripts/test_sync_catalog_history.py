import unittest
from sync_catalog_history import plan


def schema(entries):
    return {'$defs': {'wrangles': {'items': {'properties': entries}}}}


def row(identity='63', key='split.dictionary', **extra):
    return dict(catalog_id=identity, catalog_key=key, catalog_kind='wrangle',
                wranglesPY_key=key, status='active', history={}, **extra)


class SyncTests(unittest.TestCase):
    def test_alias_migration_and_idempotence(self):
        metadata = {'catalog_id': '63', 'status': 'active', 'history': {'split.dictionary': 'legacy'}}
        source = schema({'split.dictionary': metadata, 'structure.split_dictionary': metadata})
        changes, skipped = plan(source, [row()])
        self.assertEqual(skipped, [])
        change = changes[0]
        self.assertEqual(change['catalog_key'], 'structure.split_dictionary')
        self.assertEqual(change['history'], {'split.dictionary': 'legacy'})
        updated = row()
        updated.update({k: v for k, v in change.items() if k != 'action'})
        self.assertEqual(plan(source, [updated]), ([], []))

    def test_fallback_preserves_status_and_no_id_never_creates(self):
        old = row()
        old['status'] = 'inactive'
        self.assertEqual(plan(schema({'split.dictionary': {}, 'new.function': {}}), [old]), ([], ['new.function']))

    def test_shared_id_without_history_is_rejected(self):
        with self.assertRaises(ValueError):
            plan(schema({'a': {'catalog_id': '63'}, 'b': {'catalog_id': '63'}}), [row()])

    def test_new_explicit_identity_and_custom_catalog_key(self):
        changes, _ = plan(schema({'new.function': {'catalog_id': '200', 'status': 'active'}}), [])
        self.assertEqual(changes[0]['action'], 'create')
        old = row()
        old['catalog_key'] = 'custom.dictionary'
        changes, _ = plan(schema({'split.dictionary': {'catalog_id': '63', 'status': 'active'}}), [old])
        self.assertEqual(changes, [])

    def test_conflicts_and_invalid_history(self):
        for metadata in ({'catalog_id': '63', 'history': {'missing': 'legacy'}},
                         {'catalog_id': '63', 'history': []},
                         {'catalog_id': '63', 'status': 'legacy'}):
            with self.assertRaises(ValueError):
                plan(schema({'split.dictionary': metadata}), [row()])
        with self.assertRaises(ValueError):
            plan(schema({'split.dictionary': {'catalog_id': '200', 'status': 'active'}}), [row()])

    def test_missing_definitions_do_not_deactivate_rows(self):
        self.assertEqual(plan(schema({'other': {}}), [row()]), ([], ['other']))

    def test_explicit_lookup_ids_fix_old_shared_bindings(self):
        rows = [row('81', 'lookup'), row('101', 'lookup.key'), row('102', 'lookup.semantic')]
        for existing in rows:
            existing['wranglesPY_key'] = 'lookup'
        source = schema({key: {'catalog_id': identity, 'status': 'active'}
                         for identity, key in [('81', 'lookup'), ('101', 'lookup.key'), ('102', 'lookup.semantic')]})
        changes, _ = plan(source, rows)
        self.assertEqual({c['wranglesPY_key'] for c in changes}, {'lookup.key', 'lookup.semantic'})
        with self.assertRaises(ValueError):
            plan(schema({'lookup': {}}), rows)


if __name__ == '__main__':
    unittest.main()
