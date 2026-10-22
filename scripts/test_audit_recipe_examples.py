"""Regression checks for illustrative UUID output validation."""
import unittest
from audit_recipe_examples import valid_uuid_output, valid_sample_output, valid_log_output


class UUIDExampleTests(unittest.TestCase):
    def setUp(self):
        self.item = {'input': {'rows': [['Hammer'], ['Drill']]},
                     'expected': {'columns': ['GUID Column'], 'rows': [['example'], ['example']]}}
        self.output = {'columns': ['GUID Column'], 'rows': [
            ['9a13b4dd-1993-4bd2-8974-3f9a0f006d86'],
            ['1528d918-ecd7-457c-b44d-3d30705696d3']]}

    def test_unique_v4_values_pass_without_matching_illustrative_text(self):
        self.assertTrue(valid_uuid_output(self.item, self.output))

    def test_invalid_values_duplicates_and_wrong_shape_fail(self):
        for rows in ([['invalid'], ['invalid']], self.output['rows'][:1],
                     [self.output['rows'][0]] * 2, [['0' * 32], ['1' * 32]],
                     [['extra', 'columns'], ['extra', 'columns']]):
            with self.subTest(rows=rows):
                self.assertFalse(valid_uuid_output(self.item, dict(self.output, rows=rows)))
        self.assertFalse(valid_uuid_output(self.item, dict(self.output, columns=['Wrong'])))


class SampleAndLogTests(unittest.TestCase):
    def test_sampling_checks_count_membership_duplicates_and_columns(self):
        source = {'columns': ['Product'], 'rows': [['A'], ['B'], ['C'], ['D']]}
        expected = dict(source, rows=[['A'], ['B']])
        item = {'input': source, 'expected': expected}
        self.assertTrue(valid_sample_output(item, dict(source, rows=[['C'], ['D']]), {'rows': 2}))
        for output in (dict(source, rows=[['A']]), dict(source, rows=[['X'], ['B']]),
                       dict(source, rows=[['A'], ['A']]), dict(expected, columns=['Wrong'])):
            self.assertFalse(valid_sample_output(item, output, {'rows': 2}))
        item['expected'] = dict(source, rows=[['A']])
        self.assertTrue(valid_sample_output(item, dict(source, rows=[['D']]), {'rows': .25}))
        self.assertFalse(valid_sample_output(item, dict(source, rows=[['D']]), {'rows': 2}))

    def test_log_requires_real_data_message_and_unchanged_output(self):
        import pandas as pd
        table = {'columns': ['Product'], 'rows': [['Hammer']]}
        item = {'input': table, 'expected': table}
        message = ': Dataframe ::\n\n' + pd.DataFrame({'Product': ['Hammer']}).to_string() + '\n'
        self.assertTrue(valid_log_output(item, table, message))
        self.assertFalse(valid_log_output(item, table, 'INFO: log completed'))
        self.assertFalse(valid_log_output(item, table, message.replace('Hammer', 'Drill')))
        self.assertFalse(valid_log_output(item, dict(table, rows=[['Drill']]), message))


if __name__ == '__main__':
    unittest.main()
