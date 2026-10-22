"""Deterministic refresh-policy tests; no API, WranglesPY import or model calls."""
import copy
import ast
import json
import os
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import patch
import refresh_registry
from schema_functions import SchemaFunctions, generated_docstrings
from refresh_registry import mismatches, properties, required, source_file


class RefreshPolicyTests(unittest.TestCase):
    def test_generated_docstrings_resolve_literal_imported_constants(self):
        tree = ast.parse('''
from .. import ai as _ai
_FIELDS = _ai._FIELDS
def _schema(kind):
    return {"type": "object", "properties": {"output": {"minItems": len(_FIELDS[kind])}}}
for name, kind in (("choose", "choose"), ("score", "score")):
    globals()[name].__doc__ = _yaml.safe_dump(_schema(kind), sort_keys=False)
''')
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'wrangles').mkdir()
            (root / 'wrangles/ai.py').write_text(
                '_FIELDS = {"choose": ("choice", "confidence"), "score": ("score",)}\n'
                'raise RuntimeError("This module must never execute")\n')
            result = generated_docstrings(tree, root)
        self.assertEqual(result['choose']['schema']['properties']['output']['minItems'], 2)
        self.assertEqual(result['score']['schema']['properties']['output']['minItems'], 1)

    def test_data_only_schema_builder(self):
        tree = ast.parse('''
def description(nullable=False):
    values = [{"type": "string"}]
    if nullable:
        values.append({"type": "null"})
    return {"anyOf": values}
def schema(kind):
    result = {"properties": {"input": {**description(True)}}}
    required = []
    for name in ["questions", "input"]:
        required.append(name)
    result["required"] = required
    if kind == "choose":
        result["description"] = ", ".join(required)
    return result
''')
        result = SchemaFunctions(tree).call('schema', ['choose'], {})
        self.assertEqual(result['required'], ['questions', 'input'])
        self.assertEqual(result['properties']['input']['anyOf'][1], {'type': 'null'})
        self.assertEqual(result['description'], 'questions, input')

    def test_schema_builder_rejects_code_execution(self):
        tree = ast.parse('def schema():\n return __import__("os").system("false")')
        with self.assertRaises((ValueError, KeyError)):
            SchemaFunctions(tree).call('schema', [], {})
        tree = ast.parse('def schema():\n return schema()')
        evaluator = SchemaFunctions(tree)
        evaluator.remaining = 20
        with self.assertRaises(ValueError):
            evaluator.call('schema', [], {})

    def test_unsupported_builder_is_reported_without_losing_other_entries(self):
        tree = ast.parse('''
def schema(kind):
    if kind == "bad":
        return open("should-never-be-opened")
    return {"type": "object"}
for name, kind in (("broken", "bad"), ("valid", "good")):
    globals()[name].__doc__ = yaml.safe_dump(schema(kind))
''')
        result = generated_docstrings(tree, Path('.'))
        self.assertIn('error', result['broken'])
        self.assertEqual(result['valid']['schema'], {'type': 'object'})

    def test_required_uses_schema_not_python_default(self):
        snapshot = {'wrangle_definitions': {'test': {'parameters': [
            {'name': 'input', 'required': False}, {'name': 'df', 'required': True}]}},
            'wrangles': {'test': {'schema': {'type': 'object', 'properties': {'input': {'type': 'str'}}, 'required': ['input']}}}}
        before = copy.deepcopy(snapshot)
        result = mismatches(snapshot)
        self.assertEqual(result, [{'key': 'test', 'parameter': 'input', 'code': 'required_difference',
                                  'schema_required': True, 'python_required': False, 'policy': 'schema_wins'}])
        self.assertEqual(snapshot, before)

    def test_conditional_required_is_not_universal(self):
        schema = {'anyOf': [{'required': ['input']}, {'required': ['output']}]}
        self.assertFalse(required(schema, 'input'))
        self.assertTrue(required({'allOf': [{'required': ['input']}]}, 'input'))
        self.assertFalse(required(False, 'input'))

    def test_properties_stops_and_extracts_branches(self):
        self.assertEqual(properties({}), {})
        self.assertEqual(properties({'then': {'properties': {'x': {'type': 'int'}}}}), {'x': {'type': 'int'}})

    def test_new_entry_paths_match_existing_authoring_convention(self):
        self.assertEqual(source_file('format.clean_text'), Path('registry/input_wrangles/format/clean-text.md'))
        self.assertEqual(source_file('round'), Path('registry/input_wrangles/_root/round.md'))
        for key in ('../x', '/tmp/x', 'format.bad/name'):
            with self.assertRaises(ValueError):
                source_file(key)

    def test_missing_schema_is_reported_not_invented(self):
        result = mismatches({'wrangle_definitions': {'new': {'parameters': []}}, 'wrangles': {}})
        self.assertEqual(result[0]['code'], 'missing_literal_schema')

    @unittest.skipUnless(os.environ.get('REGISTRY_REFRESH_INTEGRATION') == '1', 'Opt-in full staged integration test')
    def test_bad_entry_does_not_block_valid_new_page_and_editorial_text_survives(self):
        root = Path(__file__).resolve().parents[1]
        with tempfile.TemporaryDirectory(prefix='registry-refresh-test-') as directory:
            fixture = Path(directory)
            shutil.copy2(root / 'frontmatter.json', fixture / 'frontmatter.json')
            for folder in ('.github/workflows', 'registry', 'scripts', 'wrangles-docs'):
                shutil.copytree(root / folder, fixture / folder,
                                ignore=shutil.ignore_patterns('node_modules', '.venv', 'build', '.docusaurus', '__pycache__'))
            (fixture / 'wrangles-docs/node_modules').symlink_to(root / 'wrangles-docs/node_modules', target_is_directory=True)
            candidate = json.loads((fixture / 'registry/runtime/wranglespy-source-schema.json').read_text())
            candidate['wrangles']['format.trim']['schema']['properties']['input']['type'] = 'invalid-type'
            definition = copy.deepcopy(candidate['wrangle_definitions']['format.trim'])
            definition['python_symbol'] = 'wrangles.recipe_wrangles.format.refresh_test'
            candidate['wrangle_definitions']['format.refresh_test'] = definition
            candidate['wrangles']['format.refresh_test'] = {
                **definition, 'schema': {'type': 'object', 'properties': {'input': {'type': 'str'}, 'output': {'type': 'str'},
                    'schema_only': {'type': 'str', 'description': 'Schema-only parameter.'}},
                    'required': ['input', 'schema_only'], 'description': 'Schema refresh integration fixture.'}}
            before = (fixture / 'registry/input_wrangles/format/trim.md').read_bytes()
            real_run = refresh_registry.run

            def intercepted(command, cwd):
                if 'scripts/import-wranglespy-schema.cjs' in command:
                    Path(command[-1]).write_text(json.dumps(candidate))
                    return ''
                return real_run(command, cwd)

            with patch.dict(os.environ, {'REGISTRY_REFRESH_INTEGRATION': '0'}), patch.object(refresh_registry, 'run', side_effect=intercepted), patch.object(
                    refresh_registry, 'documentation_lookup', return_value={'found': False}):
                report = refresh_registry.refresh(fixture, fixture, fixture / 'report', skip_build=True)
            self.assertEqual((fixture / 'registry/input_wrangles/format/trim.md').read_bytes(), before)
            self.assertTrue((fixture / 'registry/input_wrangles/format/refresh-test.md').exists())
            self.assertTrue((fixture / 'wrangles-docs/registry-docs/format/refresh-test.md').exists())
            contract = json.loads((fixture / 'wrangles-docs/static/registry/contracts/format/refresh-test.json').read_text())
            self.assertIsNone(contract['catalog_id'])
            self.assertEqual(contract['catalog_status'], 'pending-registration')
            audit = json.loads((fixture / 'registry/reports/catalog-schema-audit.json').read_text())
            self.assertIn('format.refresh_test', audit['missing_catalog_identities'])
            self.assertEqual(audit['summary']['schema_entries_missing_catalog_identity'], 1)
            parameter = next(item for item in contract['parameters'] if item['name'] == 'schema_only')
            self.assertTrue(parameter['required'])
            self.assertFalse(parameter['runtime_required'])
            self.assertTrue(any(item['key'] == 'format.trim' and item['action'] == 'retained_previous' for item in report['rejected']))
            self.assertTrue(any(item['key'] == 'format.refresh_test' and item['action'] == 'created' for item in report['accepted']))


if __name__ == '__main__':
    unittest.main()
