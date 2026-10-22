"""Cell type regressions: decode explicit string literals only once."""
import json
import os
import subprocess
from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from run_recipe import coerce_cell


class RunnerCellsTests(unittest.TestCase):
    def test_matrix_stdout_is_json_and_debug_values_are_not_exposed(self):
        marker = 'runner-test-secret-not-a-real-credential'
        payload = {'recipe': '''wrangles:
  - matrix:
      variables:
        var: [A, B]
      wrangles:
        - custom.test_fn:
            input: Part Code
            output: Part Code ${var}
            value: ${var}
''', 'input': {'columns': ['Part Code'], 'rows': [['6202']]}}
        result = subprocess.run([sys.executable, str(Path(__file__).resolve().parents[1] / 'run_recipe.py')],
            input=json.dumps(payload), text=True, capture_output=True, timeout=60,
            env={**os.environ, 'WRANGLES_USER': 'local-test', 'WRANGLES_PASSWORD': marker,
                 'RUNNER_TEST_SECRET': marker})
        self.assertEqual(result.returncode, 0, 'Matrix runner failed; raw logs withheld.')
        self.assertFalse(marker in result.stdout + result.stderr, 'Secret marker leaked; raw logs withheld.')
        self.assertFalse('Processing variable' in result.stdout + result.stderr, 'Debug output leaked; raw logs withheld.')
        output = json.loads(result.stdout)
        row = dict(zip(output['columns'], output['rows'][0]))
        self.assertEqual(row['Part Code A'], '6202A')
        self.assertEqual(row['Part Code B'], '6202B')

    def test_quoted_json_remains_a_string_for_from_json(self):
        for value in ('{"material":"steel","voltage":18}', '["corded","variable speed"]'):
            self.assertEqual(coerce_cell(json.dumps(value)), value)
            self.assertIsInstance(coerce_cell(json.dumps(value)), str)

    def test_native_structures_and_numbers_still_work(self):
        self.assertEqual(coerce_cell("{'Col1': 'A'}"), {'Col1': 'A'})
        self.assertEqual(coerce_cell('[1, 2]'), [1, 2])
        self.assertEqual(coerce_cell('["A", "B", "C"]'), ['A', 'B', 'C'])
        # Unquoted words are not a list literal; do not guess or change user text.
        self.assertEqual(coerce_cell('[A, B, C]'), '[A, B, C]')
        self.assertEqual(coerce_cell('64'), 64)


if __name__ == '__main__':
    unittest.main()
