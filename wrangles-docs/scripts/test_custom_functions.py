"""Run with the runner environment: .venv/bin/python scripts/test_custom_functions.py."""
import contextlib
import io
import runpy
from pathlib import Path
import unittest

import pandas as pd
import wrangles

FUNCTIONS = str(Path(__file__).resolve().parents[1] / 'customFunctions.py')


class CustomFunctionsTests(unittest.TestCase):
    def run_recipe(self, recipe, data, **kwargs):
        # Some upstream wrappers log configuration; never expose environment values.
        with contextlib.redirect_stdout(io.StringIO()):
            return wrangles.recipe.run(recipe, dataframe=pd.DataFrame(data), functions=FUNCTIONS, **kwargs)

    def test_group_by(self):
        result = self.run_recipe({'wrangles': [{'select.group_by': {
            'by': 'Category', 'custom.sum_times_two': 'Quantity'}}]}, {
                'Category': ['Hand Tools'] * 3 + ['Power Tools'], 'Quantity': [3, 1, 2, 4]})
        self.assertEqual(result['Quantity.sum_times_two'].tolist(), [12, 8])

    def test_matrix(self):
        result = self.run_recipe({'wrangles': [{'matrix': {
            'variables': {'var': ['A', 'B', 'C']}, 'wrangles': [{'custom.test_fn': {
                'input': 'Part Code', 'output': 'Part Code ${var}', 'value': '${var}'}}]}}]},
            {'Part Code': [6202, 'br549']})
        for suffix in 'ABC':
            self.assertEqual(result[f'Part Code {suffix}'].tolist(), ['6202' + suffix, 'br549' + suffix])

    def test_reverse(self):
        result = self.run_recipe({'wrangles': [{'custom.reverse_strings': {
            'input': 'Strings', 'output': 'Reverse'}}]}, {'Strings': ['Reverse Reverse']})
        self.assertEqual(result['Reverse'].tolist(), ['esreveR esreveR'])

    def test_variable_function(self):
        result = self.run_recipe({
            'wrangles': [{'copy': {'input': '${column}', 'output': 'result'}}]}, {'col2': ['value']},
            variables={'other_col': 'col2', 'column': 'custom.variable_function'})
        self.assertEqual(result['result'].tolist(), ['value'])

    def test_stock_tutorials(self):
        for name, extra in [('stock_status_dataframe', {}), ('stock_status', {}),
                            ('append_fields', {'string': 'is out of stock'}),
                            ('append_suffix', {'suffix': ' is out of stock'})]:
            with self.subTest(function=name):
                result = self.run_recipe({'wrangles': [{'custom.' + name: {
                    'input': 'Products', 'output': 'Stock', **extra}}]}, {'Products': ['Hammer']})
                self.assertEqual(result['Stock'].tolist(), ['Hammer is out of stock'])

    def test_ordinary_recipe_uses_same_file(self):
        result = self.run_recipe({'wrangles': [{'convert.case': {'input': 'text', 'case': 'upper'}}]},
            {'text': ['hello']})
        self.assertEqual(result['text'].tolist(), ['HELLO'])

    def test_connector_value_collector(self):
        namespace = runpy.run_path(FUNCTIONS)
        namespace['function']('Tools')
        namespace['function']('PPE')
        self.assertEqual(namespace['test_vals'], ['Tools', 'PPE'])
        result = self.run_recipe({'run': {'on_start': [{'custom.function': {'value': 'Tools'}}]},
                                 'wrangles': [{'copy': {'input': 'text', 'output': 'copy'}}]},
                                {'text': ['unchanged']})
        self.assertEqual(result['copy'].tolist(), ['unchanged'])


if __name__ == '__main__':
    unittest.main()
