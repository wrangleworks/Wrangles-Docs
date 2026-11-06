import unittest
from types import SimpleNamespace
from sync_catalog_history import plan, apply_plan
from unittest.mock import Mock
from export_wranglespy_inventory import callable_names


def schema(entries):
    return {'$defs': {'wrangles': {'items': {'properties': entries}}}}


def row(identity='63', key='split.dictionary', **extra):
    return {**dict(catalog_id=identity, catalog_key=key, catalog_kind='wrangle',
                   wranglesPY_key=key, status='active', history={}, wrangle_type='recipe'), **extra}


def metadata(identity='63', status='active'):
    return {'catalog_id': identity, 'status': status}


class SyncTests(unittest.TestCase):
    def test_rename_legacy_deletion_and_idempotence(self):
        entries = {'split.dictionary': metadata(status='legacy'), 'structure.split_dictionary': metadata()}
        changes, skipped = plan(schema(entries), [row()], list(entries))
        self.assertEqual(skipped, [])
        updated = {**row(), **{k: v for k, v in changes[0].items() if k != 'action'}}
        self.assertEqual(updated['catalog_key'], 'structure.split_dictionary')
        self.assertEqual(updated['history'], {'split.dictionary': 'legacy'})
        self.assertEqual(updated['status'], 'active')
        self.assertEqual(plan(schema(entries), [updated], list(entries)), ([], []))
        del entries['split.dictionary']
        changes, _ = plan(schema(entries), [updated], list(entries))
        self.assertEqual(changes[0]['history'], {'split.dictionary': 'not active'})
        self.assertEqual(changes[0]['status'], 'active')

    def test_direct_deletion_and_entire_identity_removal(self):
        changes, _ = plan(schema({'other': {}}), [row()], ['other'])
        self.assertEqual(changes[0]['status'], 'not active')
        self.assertEqual(changes[0]['history'], {'split.dictionary': 'not active'})
        entries = {'structure.split_dictionary': metadata()}
        changes, _ = plan(schema(entries), [row()], list(entries))
        self.assertEqual(changes[0]['history'], {'split.dictionary': 'not active'})
        self.assertEqual(changes[0]['status'], 'active')

    def test_fallback_and_unregistered_names(self):
        entries = {'split.dictionary': {}, 'new.function': {}}
        self.assertEqual(plan(schema(entries), [row(status='inactive')], list(entries)), ([], ['new.function']))

    def test_missing_inventory_or_schema_never_means_deleted(self):
        self.assertEqual(plan(schema({'other': {}}), [row()]), ([], ['other']))
        warnings = []
        self.assertEqual(plan(schema({'other': {}}), [row()], ['other', 'split.dictionary'], warnings),
                         ([], ['other']))
        self.assertEqual(warnings[0]['name'], 'split.dictionary')
        for entries, names in [({}, []), ({'other': {}}, ['different'])]:
            with self.assertRaises(ValueError):
                plan(schema(entries), [row()], names)

    def test_missing_schemas_retain_rows_while_valid_identities_sync(self):
        rows = [row('83', 'maths'), row('34', 'format.price_breaks'), row()]
        entries = {'split.dictionary': metadata(status='legacy'),
                   'structure.split_dictionary': metadata(), 'new.valid': metadata('200')}
        warnings = []
        changes, skipped = plan(schema(entries), rows,
                                [*entries, 'maths', 'format.price_breaks', 'new.no_schema'], warnings)
        self.assertEqual({c['catalog_id'] for c in changes}, {'63', '200'})
        self.assertEqual({w['name'] for w in warnings if 'name' in w},
                         {'maths', 'format.price_breaks', 'new.no_schema'})
        self.assertEqual(skipped, [])
        self.assertEqual(changes[0]['history'], {'split.dictionary': 'legacy'})

    def test_missing_legacy_schema_retains_whole_shared_identity(self):
        original = row(key='structure.split_dictionary', history={'split.dictionary': 'legacy'})
        entries = {'structure.split_dictionary': metadata(), 'new.valid': metadata('200')}
        changes, _ = plan(schema(entries), [original], [*entries, 'split.dictionary'])
        self.assertEqual([c['catalog_id'] for c in changes], ['200'])
        self.assertEqual(original['history'], {'split.dictionary': 'legacy'})

    def test_no_docstring_history_and_only_one_active_name(self):
        for entries in ({'a': {**metadata(), 'history': {}}},
                        {'a': metadata(status='not active')}):
            with self.assertRaises(ValueError):
                plan(schema(entries), [row()], list(entries))

    def test_new_legacy_identity_and_custom_catalog_key(self):
        entries = {'new.name': metadata('200', 'legacy')}
        changes, _ = plan(schema(entries), [], list(entries))
        self.assertEqual(changes[0]['action'], 'create')
        self.assertEqual(changes[0]['history'], {'new.name': 'legacy'})
        entries = {'split.dictionary': metadata(status='legacy'), 'structure.split_dictionary': metadata()}
        changes, _ = plan(schema(entries), [row(catalog_key='custom.dictionary')], list(entries))
        self.assertEqual(changes[0]['catalog_key'], 'custom.dictionary')

    def test_no_id_never_creates(self):
        self.assertEqual(plan(schema({'new': {'status': 'active'}}), [], ['new']), ([], ['new']))

    def test_id_change_deletes_obsolete_row_and_is_idempotent(self):
        entries = {'split.dictionary': metadata('200')}
        changes, _ = plan(schema(entries), [row()], list(entries))
        self.assertEqual([(c['action'], c['catalog_id']) for c in changes],
                         [('delete', '63'), ('create', '200')])
        updated = row('200', 'split.dictionary')
        self.assertEqual(plan(schema(entries), [updated], list(entries)), ([], []))

    def test_lookup_merge_deletes_102_with_original_and_corrected_bindings(self):
        entries = {'lookup': metadata('81', 'legacy'), 'lookup.semantic': metadata('81'),
                   'lookup.key': metadata('101')}
        for old_binding in ('lookup', 'lookup.semantic'):
            rows = [row('81', 'lookup'), row('101', 'lookup.key'),
                    row('102', 'lookup.semantic', wranglesPY_key=old_binding)]
            changes, _ = plan(schema(entries), rows, list(entries))
            self.assertEqual([(c['action'], c['catalog_id']) for c in changes],
                             [('delete', '102'), ('update', '81')])
            self.assertEqual(changes[0]['replacement_catalog_id'], '81')
            self.assertEqual(changes[1]['wranglesPY_key'], 'lookup.semantic')
            self.assertEqual(changes[1]['history'], {'lookup': 'legacy'})
            updated = {**rows[0], **{k: v for k, v in changes[1].items() if k != 'action'}}
            self.assertEqual(plan(schema(entries), [updated, rows[1]], list(entries)), ([], []))

    def test_active_collision_retains_both_rows_and_syncs_unrelated(self):
        rows = [row('81', 'lookup'), row('102', 'lookup.semantic')]
        entries = {'lookup': metadata('81'), 'lookup.semantic': metadata('81'),
                   'new.valid': metadata('200')}
        warnings = []
        changes, _ = plan(schema(entries), rows, list(entries), warnings)
        self.assertEqual([(c['action'], c['catalog_id']) for c in changes], [('create', '200')])
        self.assertEqual({w['catalog_id'] for w in warnings}, {'81', '102'})

    def test_missing_schema_at_destination_retains_source_too(self):
        rows = [row('81', 'lookup'), row('102', 'lookup.semantic')]
        entries = {'lookup.semantic': metadata('81'), 'new.valid': metadata('200')}
        changes, _ = plan(schema(entries), rows, [*entries, 'lookup'])
        self.assertEqual([(c['action'], c['catalog_id']) for c in changes], [('create', '200')])

    def test_connector_id_collision_is_reported_without_blocking_others(self):
        rows = [row('103', 'connector.access', catalog_kind='connector')]
        entries = {'new.invalid': metadata('103'), 'new.valid': metadata('200')}
        warnings = []
        changes, _ = plan(schema(entries), rows, list(entries), warnings)
        self.assertEqual([c['catalog_id'] for c in changes], ['200'])
        self.assertEqual(warnings[0]['catalog_id'], '103')

    def test_reassignment_preserves_removed_alias_history(self):
        old = row(history={'older.name': 'not active'})
        entries = {'split.dictionary': metadata('200')}
        changes, _ = plan(schema(entries), [old], list(entries))
        self.assertEqual(changes[1]['history'], {'older.name': 'not active'})

    def test_missing_lookup_schema_does_not_delete_its_stale_binding(self):
        rows = [row('81', 'lookup'), row('101', 'lookup.key', wranglesPY_key='lookup')]
        entries = {'lookup': metadata('81'), 'new.valid': metadata('200')}
        changes, _ = plan(schema(entries), rows, [*entries, 'lookup.key'])
        self.assertEqual([c['catalog_id'] for c in changes], ['200'])

    def test_apply_deletes_obsolete_row_before_reusing_unique_key(self):
        rows = [row('81', 'lookup'), row('102', 'lookup.semantic')]
        entries = {'lookup': metadata('81', 'legacy'), 'lookup.semantic': metadata('81')}
        changes, _ = plan(schema(entries), rows, list(entries))
        connection = Mock()
        apply_plan(connection, list(reversed(changes)), rows, lambda value: value)
        calls = connection.execute.call_args_list
        self.assertTrue(calls[0].args[0].startswith('DELETE'))
        self.assertEqual(calls[0].args[1], (102,))
        self.assertTrue(calls[1].args[0].startswith('UPDATE'))
        self.assertEqual(calls[1].args[1][-1], 81)

    def test_new_id_preserves_custom_key_and_non_schema_fields(self):
        original = row(catalog_key='custom.dictionary', notes='editorial note',
                       okf_path='existing/path', created_at='2026-01-01')
        entries = {'split.dictionary': metadata('200')}
        changes, _ = plan(schema(entries), [original], list(entries))
        self.assertEqual(changes[1]['catalog_key'], 'custom.dictionary')
        connection = Mock()
        apply_plan(connection, changes, [original], lambda value: value)
        self.assertEqual(connection.execute.call_args_list[1].args[1][-4:],
                         ('recipe', 'existing/path', 'editorial note', '2026-01-01'))

    def test_lookup_ids_correct_old_shared_bindings(self):
        rows = [row('81', 'lookup'), row('101', 'lookup.key', wranglesPY_key='lookup'),
                row('102', 'lookup.semantic', wranglesPY_key='lookup')]
        entries = {key: metadata(identity) for identity, key in [('81', 'lookup'), ('101', 'lookup.key'), ('102', 'lookup.semantic')]}
        changes, _ = plan(schema(entries), rows, list(entries))
        self.assertEqual({c['wranglesPY_key'] for c in changes}, {'lookup.key', 'lookup.semantic'})
        self.assertTrue(all(c['history'] == {} for c in changes))
        with self.assertRaises(ValueError):
            plan(schema({'lookup': {}}), rows)

    def test_map_and_connectors_are_not_retired(self):
        rows = [row('99', 'map', wrangle_type='map'), row('103', 'connector.access', catalog_kind='connector')]
        self.assertEqual(plan(schema({'other': {}}), rows, ['other']), ([], ['other']))

    def test_inventory_keeps_aliases_and_callables_without_schema(self):
        def function():
            pass
        def nested():
            pass
        function.key = nested
        self.assertEqual(callable_names(SimpleNamespace(old=function, current=function)),
                         ['current', 'current.key', 'old', 'old.key'])


if __name__ == '__main__':
    unittest.main()
