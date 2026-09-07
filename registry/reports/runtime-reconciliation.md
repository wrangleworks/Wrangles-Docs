# Wrangles Registry Source Reconciliation

Generated file. Do not edit directly.

- Runtime version: `1.20.2`
- Runtime source: [`7916bf158e8b7e561270a1bea7b808f88956edc4`](https://github.com/wrangleworks/WranglesPY/commit/7916bf158e8b7e561270a1bea7b808f88956edc4)
- Registry version: `0.2.1`
- Runtime entries: 98
- Embedded Python schema docstrings: 96
- Existing quasi-registry records: 93
- Normalized Registry entries: 98
- Verified normalized entries: 98
- Quasi-registry records awaiting normalization: 0
- Runtime entries without quasi-registry Markdown: 5
- Quasi-registry records without runtime matches: 0
- Quasi-registry records without UUIDs: 5
- Supporting and aggregate Markdown files: 17

Embedded Python schema differences and quasi-registry differences are migration
evidence, not runtime contract failures. The first pass resolves runtime facts
from code, then enriches them from embedded schemas and quasi-registry Markdown.
Signature-owned names, required status, defaults, symbols, and common-control
capabilities must reconcile; individual records can be curated in place later.

## Normalized Registry entries

| Registry key | Matched runtime key | Status | Runtime issues | Embedded schema differences |
| --- | --- | --- | ---: | ---: |
| `accordion` | `accordion` | verified | 0 | 2 |
| `batch` | `batch` | verified | 0 | 4 |
| `classify` | `classify` | verified | 0 | 1 |
| `clean_whitespaces` | `clean_whitespaces` | verified | 0 | 1 |
| `compare.lists` | `compare.lists` | verified | 0 | 2 |
| `compare.text` | `compare.text` | verified | 0 | 12 |
| `compute.case_when` | `compute.case_when` | verified | 0 | 0 |
| `compute.score_search_results` | `compute.score_search_results` | verified | 0 | 1 |
| `concurrent` | `concurrent` | verified | 0 | 2 |
| `convert.case` | `convert.case` | verified | 0 | 3 |
| `convert.data_type` | `convert.data_type` | verified | 0 | 4 |
| `convert.fraction_to_decimal` | `convert.fraction_to_decimal` | verified | 0 | 2 |
| `convert.from_json` | `convert.from_json` | verified | 0 | 4 |
| `convert.from_yaml` | `convert.from_yaml` | verified | 0 | 2 |
| `convert.to_json` | `convert.to_json` | verified | 0 | 2 |
| `convert.to_yaml` | `convert.to_yaml` | verified | 0 | 3 |
| `copy` | `copy` | verified | 0 | 4 |
| `create.bins` | `create.bins` | verified | 0 | 3 |
| `create.column` | `create.column` | verified | 0 | 1 |
| `create.embeddings` | `create.embeddings` | verified | 0 | 5 |
| `create.guid` | `create.guid` | verified | 0 | 0 |
| `create.hash` | `create.hash` | verified | 0 | 1 |
| `create.index` | `create.index` | verified | 0 | 1 |
| `create.jinja` | `create.jinja` | verified | 0 | 2 |
| `create.uuid` | `create.uuid` | verified | 0 | 0 |
| `date_calculator` | `date_calculator` | verified | 0 | 4 |
| `drop` | `drop` | verified | 0 | 2 |
| `explode` | `explode` | verified | 0 | 0 |
| `extract.address` | `extract.address` | verified | 0 | 3 |
| `extract.ai` | `extract.ai` | verified | 0 | 6 |
| `extract.attributes` | `extract.attributes` | verified | 0 | 4 |
| `extract.brackets` | `extract.brackets` | verified | 0 | 1 |
| `extract.codes` | `extract.codes` | verified | 0 | 2 |
| `extract.custom` | `extract.custom` | verified | 0 | 3 |
| `extract.date_properties` | `extract.date_properties` | verified | 0 | 1 |
| `extract.date_range` | `extract.date_range` | verified | 0 | 1 |
| `extract.html` | `extract.html` | verified | 0 | 4 |
| `extract.properties` | `extract.properties` | verified | 0 | 3 |
| `extract.regex` | `extract.regex` | verified | 0 | 2 |
| `filter` | `filter` | verified | 0 | 14 |
| `format.dates` | `format.dates` | verified | 0 | 2 |
| `format.pad` | `format.pad` | verified | 0 | 5 |
| `format.prefix` | `format.prefix` | verified | 0 | 3 |
| `format.price_breaks` | `format.price_breaks` | verified | 0 | 1 |
| `format.remove_duplicates` | `format.remove_duplicates` | verified | 0 | 1 |
| `format.significant_figures` | `format.significant_figures` | verified | 0 | 2 |
| `format.suffix` | `format.suffix` | verified | 0 | 3 |
| `format.trim` | `format.trim` | verified | 0 | 1 |
| `generate.ai` | `generate.ai` | verified | 0 | 4 |
| `huggingface` | `huggingface` | verified | 0 | 3 |
| `log` | `log` | verified | 0 | 5 |
| `lookup` | `lookup` | verified | 0 | 6 |
| `math` | `math` | verified | 0 | 1 |
| `maths` | `maths` | verified | 0 | 1 |
| `matrix` | `matrix` | verified | 0 | 1 |
| `merge.coalesce` | `merge.coalesce` | verified | 0 | 2 |
| `merge.concatenate` | `merge.concatenate` | verified | 0 | 3 |
| `merge.dictionaries` | `merge.dictionaries` | verified | 0 | 1 |
| `merge.key_value_pairs` | `merge.key_value_pairs` | verified | 0 | 1 |
| `merge.lists` | `merge.lists` | verified | 0 | 0 |
| `merge.to_dict` | `merge.to_dict` | verified | 0 | 1 |
| `merge.to_list` | `merge.to_list` | verified | 0 | 1 |
| `python` | `python` | verified | 0 | 2 |
| `recipe` | `recipe` | verified | 0 | 6 |
| `reindex` | `reindex` | verified | 0 | 4 |
| `remove_words` | `remove_words` | verified | 0 | 3 |
| `rename` | `rename` | verified | 0 | 4 |
| `replace` | `replace` | verified | 0 | 1 |
| `round` | `round` | verified | 0 | 2 |
| `search.find_links` | `search.find_links` | verified | 0 | 8 |
| `search.retrieve_link_content` | `search.retrieve_link_content` | verified | 0 | 7 |
| `select.columns` | `select.columns` | verified | 0 | 0 |
| `select.dictionary_element` | `select.dictionary_element` | verified | 0 | 2 |
| `select.element` | `select.element` | verified | 0 | 2 |
| `select.group_by` | `select.group_by` | verified | 0 | 1 |
| `select.head` | `select.head` | verified | 0 | 1 |
| `select.highest_confidence` | `select.highest_confidence` | verified | 0 | 1 |
| `select.left` | `select.left` | verified | 0 | 1 |
| `select.length` | `select.length` | verified | 0 | 2 |
| `select.list_element` | `select.list_element` | verified | 0 | 2 |
| `select.right` | `select.right` | verified | 0 | 1 |
| `select.sample` | `select.sample` | verified | 0 | 1 |
| `select.substring` | `select.substring` | verified | 0 | 5 |
| `select.tail` | `select.tail` | verified | 0 | 1 |
| `select.threshold` | `select.threshold` | verified | 0 | 0 |
| `similarity` | `similarity` | verified | 0 | 0 |
| `sort` | `sort` | verified | 0 | 2 |
| `split.dictionary` | `split.dictionary` | verified | 0 | 2 |
| `split.list` | `split.list` | verified | 0 | 1 |
| `split.text` | `split.text` | verified | 0 | 4 |
| `split.tokenize` | `split.tokenize` | verified | 0 | 1 |
| `sql` | `sql` | verified | 0 | 3 |
| `standardize` | `standardize` | verified | 0 | 3 |
| `standardize.clean` | `standardize.clean` | verified | 0 | 13 |
| `standardize.custom` | `standardize.custom` | verified | 0 | 3 |
| `translate` | `translate` | verified | 0 | 1 |
| `transpose` | `transpose` | verified | 0 | 1 |
| `try` | `try` | verified | 0 | 2 |

## Embedded Python schema differences

| Registry key | Difference | Parameter | Detail |
| --- | --- | --- | --- |
| `accordion` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `accordion` | schema_constraint_difference | `propagate` | See the JSON report for both schema fragments. |
| `batch` | schema_constraint_difference | `batch_size` | See the JSON report for both schema fragments. |
| `batch` | schema_constraint_difference | `on_error` | See the JSON report for both schema fragments. |
| `batch` | schema_constraint_difference | `timeout` | See the JSON report for both schema fragments. |
| `batch` | registry_only_parameter | `use_multiprocessing` | See the JSON report for both schema fragments. |
| `classify` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `clean_whitespaces` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `compare.lists` | docstring_required_mismatch | `method` | runtime required=false; docstring required=true |
| `compare.lists` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `compare.text` | registry_only_parameter | `all_empty` | See the JSON report for both schema fragments. |
| `compare.text` | registry_only_parameter | `case_sensitive` | See the JSON report for both schema fragments. |
| `compare.text` | registry_only_parameter | `char` | See the JSON report for both schema fragments. |
| `compare.text` | registry_only_parameter | `decimal_places` | See the JSON report for both schema fragments. |
| `compare.text` | registry_only_parameter | `empty_a` | See the JSON report for both schema fragments. |
| `compare.text` | registry_only_parameter | `empty_b` | See the JSON report for both schema fragments. |
| `compare.text` | registry_only_parameter | `exact_match` | See the JSON report for both schema fragments. |
| `compare.text` | registry_only_parameter | `include_ratio` | See the JSON report for both schema fragments. |
| `compare.text` | docstring_required_mismatch | `method` | runtime required=false; docstring required=true |
| `compare.text` | registry_only_parameter | `metric` | See the JSON report for both schema fragments. |
| `compare.text` | registry_only_parameter | `non_match_char` | See the JSON report for both schema fragments. |
| `compare.text` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `compute.score_search_results` | schema_constraint_difference | `blacklist_keywords` | See the JSON report for both schema fragments. |
| `concurrent` | registry_only_parameter | `use_multiprocessing` | See the JSON report for both schema fragments. |
| `concurrent` | schema_constraint_difference | `wrangles` | See the JSON report for both schema fragments. |
| `convert.case` | docstring_required_mismatch | `case` | runtime required=false; docstring required=true |
| `convert.case` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `convert.case` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `convert.data_type` | docstring_required_mismatch | `data_type` | runtime required=false; docstring required=true |
| `convert.data_type` | schema_constraint_difference | `default` | See the JSON report for both schema fragments. |
| `convert.data_type` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `convert.data_type` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `convert.fraction_to_decimal` | schema_constraint_difference | `decimals` | See the JSON report for both schema fragments. |
| `convert.fraction_to_decimal` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `convert.from_json` | schema_constraint_difference | `default` | See the JSON report for both schema fragments. |
| `convert.from_json` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `convert.from_json` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `convert.from_json` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `convert.from_yaml` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `convert.from_yaml` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `convert.to_json` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `convert.to_json` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `convert.to_yaml` | registry_only_parameter | `allow_unicode` | See the JSON report for both schema fragments. |
| `convert.to_yaml` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `convert.to_yaml` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `copy` | docstring_required_mismatch | `input` | runtime required=false; docstring required=true |
| `copy` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `copy` | docstring_required_mismatch | `output` | runtime required=false; docstring required=true |
| `copy` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `create.bins` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `create.bins` | schema_constraint_difference | `labels` | See the JSON report for both schema fragments. |
| `create.bins` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `create.column` | schema_constraint_difference | `value` | See the JSON report for both schema fragments. |
| `create.embeddings` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `create.embeddings` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `create.embeddings` | schema_constraint_difference | `provider` | See the JSON report for both schema fragments. |
| `create.embeddings` | schema_constraint_difference | `task` | See the JSON report for both schema fragments. |
| `create.embeddings` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `create.hash` | docstring_required_mismatch | `output` | runtime required=true; docstring required=false |
| `create.index` | schema_constraint_difference | `by` | See the JSON report for both schema fragments. |
| `create.jinja` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `create.jinja` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `date_calculator` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `date_calculator` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `date_calculator` | schema_constraint_difference | `time_unit` | See the JSON report for both schema fragments. |
| `date_calculator` | schema_constraint_difference | `time_value` | See the JSON report for both schema fragments. |
| `drop` | schema_constraint_difference | `columns` | See the JSON report for both schema fragments. |
| `drop` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `extract.address` | docstring_required_mismatch | `dataType` | runtime required=true; docstring required=false |
| `extract.address` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.address` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `extract.ai` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `extract.ai` | schema_constraint_difference | `instructions` | See the JSON report for both schema fragments. |
| `extract.ai` | schema_constraint_difference | `model_id` | See the JSON report for both schema fragments. |
| `extract.ai` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `extract.ai` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.ai` | schema_constraint_difference | `record_examples` | See the JSON report for both schema fragments. |
| `extract.attributes` | schema_constraint_difference | `attribute_type` | See the JSON report for both schema fragments. |
| `extract.attributes` | schema_constraint_difference | `desired_unit` | See the JSON report for both schema fragments. |
| `extract.attributes` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.attributes` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `extract.brackets` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.codes` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.codes` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `extract.custom` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `extract.custom` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.custom` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `extract.date_properties` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `extract.date_range` | docstring_required_mismatch | `range` | runtime required=false; docstring required=true |
| `extract.html` | docstring_required_mismatch | `output` | runtime required=false; docstring required=true |
| `extract.html` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `extract.html` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.html` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `extract.properties` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.properties` | schema_constraint_difference | `property_type` | See the JSON report for both schema fragments. |
| `extract.properties` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `extract.regex` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `extract.regex` | schema_constraint_difference | `output_pattern` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `between` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `contains` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `equal` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `greater_than` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `greater_than_equal_to` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `is_in` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `is_null` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `less_than` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `less_than_equal_to` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `not_contains` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `not_equal` | See the JSON report for both schema fragments. |
| `filter` | schema_constraint_difference | `not_in` | See the JSON report for both schema fragments. |
| `filter` | docstring_only_parameter | `where` | See the JSON report for both schema fragments. |
| `filter` | docstring_only_parameter | `where_params` | See the JSON report for both schema fragments. |
| `format.dates` | schema_constraint_difference | `format` | See the JSON report for both schema fragments. |
| `format.dates` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `format.pad` | schema_constraint_difference | `char` | See the JSON report for both schema fragments. |
| `format.pad` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `format.pad` | schema_constraint_difference | `pad_length` | See the JSON report for both schema fragments. |
| `format.pad` | schema_constraint_difference | `side` | See the JSON report for both schema fragments. |
| `format.pad` | schema_constraint_difference | `skip_empty` | See the JSON report for both schema fragments. |
| `format.prefix` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `format.prefix` | schema_constraint_difference | `skip_empty` | See the JSON report for both schema fragments. |
| `format.prefix` | schema_constraint_difference | `value` | See the JSON report for both schema fragments. |
| `format.price_breaks` | missing_docstring_schema | — | The callable is present but has no embedded Python schema docstring. |
| `format.remove_duplicates` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `format.significant_figures` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `format.significant_figures` | schema_constraint_difference | `significant_figures` | See the JSON report for both schema fragments. |
| `format.suffix` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `format.suffix` | schema_constraint_difference | `skip_empty` | See the JSON report for both schema fragments. |
| `format.suffix` | schema_constraint_difference | `value` | See the JSON report for both schema fragments. |
| `format.trim` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `generate.ai` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `generate.ai` | schema_constraint_difference | `messages` | See the JSON report for both schema fragments. |
| `generate.ai` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `generate.ai` | schema_constraint_difference | `reasoning` | See the JSON report for both schema fragments. |
| `huggingface` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `huggingface` | schema_constraint_difference | `parameters` | See the JSON report for both schema fragments. |
| `huggingface` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `log` | schema_constraint_difference | `columns` | See the JSON report for both schema fragments. |
| `log` | schema_constraint_difference | `info` | See the JSON report for both schema fragments. |
| `log` | schema_constraint_difference | `log_data` | See the JSON report for both schema fragments. |
| `log` | schema_constraint_difference | `warning` | See the JSON report for both schema fragments. |
| `log` | schema_constraint_difference | `write` | See the JSON report for both schema fragments. |
| `lookup` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `lookup` | docstring_required_mismatch | `model_id` | runtime required=false; docstring required=true |
| `lookup` | schema_constraint_difference | `model_id` | See the JSON report for both schema fragments. |
| `lookup` | schema_constraint_difference | `n` | See the JSON report for both schema fragments. |
| `lookup` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `lookup` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `math` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `maths` | missing_docstring_schema | — | The callable is present but has no embedded Python schema docstring. |
| `matrix` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `merge.coalesce` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `merge.coalesce` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `merge.concatenate` | docstring_required_mismatch | `char` | runtime required=false; docstring required=true |
| `merge.concatenate` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `merge.concatenate` | schema_constraint_difference | `skip_empty` | See the JSON report for both schema fragments. |
| `merge.dictionaries` | schema_constraint_difference | `skip_empty` | See the JSON report for both schema fragments. |
| `merge.key_value_pairs` | schema_constraint_difference | `skip_empty` | See the JSON report for both schema fragments. |
| `merge.to_dict` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `merge.to_list` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `python` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `python` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `recipe` | registry_only_parameter | `input` | See the JSON report for both schema fragments. |
| `recipe` | docstring_required_mismatch | `name` | runtime required=false; docstring required=true |
| `recipe` | schema_constraint_difference | `name` | See the JSON report for both schema fragments. |
| `recipe` | registry_only_parameter | `output` | See the JSON report for both schema fragments. |
| `recipe` | schema_constraint_difference | `variables` | See the JSON report for both schema fragments. |
| `recipe` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `reindex` | schema_constraint_difference | `axis` | See the JSON report for both schema fragments. |
| `reindex` | schema_constraint_difference | `columns` | See the JSON report for both schema fragments. |
| `reindex` | schema_constraint_difference | `index` | See the JSON report for both schema fragments. |
| `reindex` | schema_constraint_difference | `labels` | See the JSON report for both schema fragments. |
| `remove_words` | docstring_required_mismatch | `output` | runtime required=false; docstring required=true |
| `remove_words` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `remove_words` | schema_constraint_difference | `to_remove` | See the JSON report for both schema fragments. |
| `rename` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `rename` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `rename` | schema_constraint_difference | `wrangles` | See the JSON report for both schema fragments. |
| `rename` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `replace` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `round` | schema_constraint_difference | `decimals` | See the JSON report for both schema fragments. |
| `round` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `search.find_links` | schema_constraint_difference | `api_key` | See the JSON report for both schema fragments. |
| `search.find_links` | schema_constraint_difference | `client` | See the JSON report for both schema fragments. |
| `search.find_links` | schema_constraint_difference | `country` | See the JSON report for both schema fragments. |
| `search.find_links` | schema_constraint_difference | `language` | See the JSON report for both schema fragments. |
| `search.find_links` | schema_constraint_difference | `n_results` | See the JSON report for both schema fragments. |
| `search.find_links` | docstring_required_mismatch | `output` | runtime required=false; docstring required=true |
| `search.find_links` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `search.find_links` | schema_constraint_difference | `threads` | See the JSON report for both schema fragments. |
| `search.retrieve_link_content` | schema_constraint_difference | `api_key` | See the JSON report for both schema fragments. |
| `search.retrieve_link_content` | schema_constraint_difference | `client` | See the JSON report for both schema fragments. |
| `search.retrieve_link_content` | docstring_required_mismatch | `output` | runtime required=false; docstring required=true |
| `search.retrieve_link_content` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `search.retrieve_link_content` | schema_constraint_difference | `output_format` | See the JSON report for both schema fragments. |
| `search.retrieve_link_content` | schema_constraint_difference | `prompt` | See the JSON report for both schema fragments. |
| `search.retrieve_link_content` | schema_constraint_difference | `threads` | See the JSON report for both schema fragments. |
| `select.dictionary_element` | schema_constraint_difference | `element` | See the JSON report for both schema fragments. |
| `select.dictionary_element` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `select.element` | schema_constraint_difference | `default` | See the JSON report for both schema fragments. |
| `select.element` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `select.group_by` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `select.head` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `select.highest_confidence` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `select.left` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `select.length` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `select.length` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `select.list_element` | docstring_required_mismatch | `element` | runtime required=false; docstring required=true |
| `select.list_element` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `select.right` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `select.sample` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `select.substring` | docstring_required_mismatch | `length` | runtime required=false; docstring required=true |
| `select.substring` | schema_constraint_difference | `length` | See the JSON report for both schema fragments. |
| `select.substring` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `select.substring` | docstring_required_mismatch | `start` | runtime required=false; docstring required=true |
| `select.substring` | schema_constraint_difference | `start` | See the JSON report for both schema fragments. |
| `select.tail` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `sort` | registry_only_parameter | `ignore_index` | See the JSON report for both schema fragments. |
| `sort` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `split.dictionary` | schema_constraint_difference | `default` | See the JSON report for both schema fragments. |
| `split.dictionary` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `split.list` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `split.text` | schema_constraint_difference | `element` | See the JSON report for both schema fragments. |
| `split.text` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `split.text` | schema_constraint_difference | `pad` | See the JSON report for both schema fragments. |
| `split.text` | schema_constraint_difference | `skip_empty` | See the JSON report for both schema fragments. |
| `split.tokenize` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `sql` | schema_constraint_difference | `params` | See the JSON report for both schema fragments. |
| `sql` | registry_only_parameter | `preserve_data_types` | See the JSON report for both schema fragments. |
| `sql` | registry_only_parameter | `preserve_index` | See the JSON report for both schema fragments. |
| `standardize` | docstring_required_mismatch | `model_id` | runtime required=true; docstring required=false |
| `standardize` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `standardize` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `standardize.clean` | schema_constraint_difference | `collapse_whitespace` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `fix_character_width` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `fix_encoding` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `input` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `normalization` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `preserve_line_breaks` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `remove_control_chars` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `separator` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `trim` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `uncurl_quotes` | See the JSON report for both schema fragments. |
| `standardize.clean` | schema_constraint_difference | `unescape_html` | See the JSON report for both schema fragments. |
| `standardize.clean` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `standardize.custom` | docstring_required_mismatch | `model_id` | runtime required=true; docstring required=false |
| `standardize.custom` | schema_constraint_difference | `output` | See the JSON report for both schema fragments. |
| `standardize.custom` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |
| `translate` | registry_only_parameter | `case` | See the JSON report for both schema fragments. |
| `transpose` | schema_constraint_difference | `header_column` | See the JSON report for both schema fragments. |
| `try` | schema_constraint_difference | `except` | See the JSON report for both schema fragments. |
| `try` | docstring_allows_additional_properties | — | The curated Registry contract rejects undocumented parameters. |

## Existing quasi-registry inventory

Every per-wrangle `_sources/*.md` record is included below. Display defaults
are retained as migration content and are not treated as Python runtime defaults.
The JSON report records a SHA-256 hash of every source file so changes anywhere
in the quasi-registry remain reviewable.

| Wrangle key | Source Markdown | UUID | Runtime | Normalization | Runtime parameter differences | Embedded schema differences |
| --- | --- | --- | --- | --- | ---: | ---: |
| `accordion` | `wrangles-docs/wrangle-docs/utility/_sources/accordion.md` | missing | matched | matched | 1 | 1 |
| `batch` | `wrangles-docs/wrangle-docs/utility/_sources/batch.md` | missing | matched | matched | 5 | 4 |
| `classify` | `wrangles-docs/wrangle-docs/ai/_sources/classify.md` | `06669ef8-cdd1-42f7-8078-98e0b7a42c30` | matched | matched | 0 | 0 |
| `clean_whitespaces` | `wrangles-docs/wrangle-docs/format/_sources/clean-whitespaces.md` | `e36e15c4-f0ad-43f8-8555-ef683a8ab892` | matched | matched | 3 | 3 |
| `compare.lists` | `wrangles-docs/wrangle-docs/compare/_sources/lists.md` | `a393225e-7ccf-4708-83f8-d5abd6ba9b1e` | matched | matched | 4 | 3 |
| `compare.text` | `wrangles-docs/wrangle-docs/compare/_sources/text.md` | `31905b74-ce58-45cd-8add-821cc04ab946` | matched | matched | 4 | 13 |
| `compute.case_when` | `wrangles-docs/wrangle-docs/compute/_sources/case-when.md` | `9a9662e4-53d1-4932-8adf-bc3e7aa364ad` | matched | matched | 3 | 3 |
| `compute.score_search_results` | `wrangles-docs/wrangle-docs/compute/_sources/score-search-results.md` | `313a8ec0-cf13-4956-8d3b-5362b8641d0f` | matched | matched | 3 | 3 |
| `concurrent` | `wrangles-docs/wrangle-docs/utility/_sources/concurrent.md` | missing | matched | matched | 4 | 3 |
| `convert.case` | `wrangles-docs/wrangle-docs/convert/_sources/case.md` | `12ff4120-3613-4801-8653-99c793477fbc` | matched | matched | 1 | 0 |
| `convert.data_type` | `wrangles-docs/wrangle-docs/convert/_sources/data-type.md` | `52384f01-7164-404f-8615-063e7677a588` | matched | matched | 1 | 0 |
| `convert.fraction_to_decimal` | `wrangles-docs/wrangle-docs/convert/_sources/fraction-to-decimal.md` | `7c55752e-70ab-4809-8298-c59436127457` | matched | matched | 0 | 0 |
| `convert.from_json` | `wrangles-docs/wrangle-docs/convert/_sources/from-json.md` | `e370dfcf-b0fe-4c48-8a52-6f34c47e7978` | matched | matched | 0 | 0 |
| `convert.from_yaml` | `wrangles-docs/wrangle-docs/convert/_sources/from-yaml.md` | `b1c20004-5f80-41c2-84d2-2d4601a033b5` | matched | matched | 2 | 2 |
| `convert.to_json` | `wrangles-docs/wrangle-docs/convert/_sources/to-json.md` | `94e54eb7-2b8c-4047-89d0-fb5d16baf396` | matched | matched | 0 | 0 |
| `convert.to_yaml` | `wrangles-docs/wrangle-docs/convert/_sources/to-yaml.md` | `4cd6252f-ce47-4a9d-8272-3d87e875b72a` | matched | matched | 1 | 0 |
| `copy` | `wrangles-docs/wrangle-docs/transform/_sources/copy.md` | `b002fbdc-92c0-4347-889d-0f4bfeec99fa` | matched | matched | 2 | 0 |
| `create.bins` | `wrangles-docs/wrangle-docs/create/_sources/bins.md` | `232e3ba0-4735-4934-88aa-0163181abb3f` | matched | matched | 0 | 0 |
| `create.column` | `wrangles-docs/wrangle-docs/create/_sources/column.md` | `5a18e2c8-ec7c-45f5-88fd-bb5c358a8b40` | matched | matched | 2 | 2 |
| `create.embeddings` | `wrangles-docs/wrangle-docs/create/_sources/embeddings.md` | `e3518afd-a819-40ec-8b49-eb25690220c1` | matched | matched | 4 | 4 |
| `create.guid` | `wrangles-docs/wrangle-docs/create/_sources/guid.md` | `cf3aaab2-3d5b-4c9b-826e-7af7510521c9` | matched | matched | 0 | 0 |
| `create.hash` | `wrangles-docs/wrangle-docs/create/_sources/hash.md` | `11e8fc13-00d2-4779-8d87-6288b07de7e7` | matched | matched | 0 | 1 |
| `create.index` | `wrangles-docs/wrangle-docs/create/_sources/index.md` | `0a4909ca-6e14-4da7-8a70-a7fd106d6944` | matched | matched | 0 | 0 |
| `create.jinja` | `wrangles-docs/wrangle-docs/create/_sources/jinja.md` | `10fc6709-16d4-4eab-8f56-6cb5d170ea66` | matched | matched | 0 | 0 |
| `create.uuid` | `wrangles-docs/wrangle-docs/create/_sources/uuid.md` | `c376f3ff-2283-4c4c-8d7f-70db6f53ed19` | matched | matched | 0 | 0 |
| `date_calculator` | `wrangles-docs/wrangle-docs/date/_sources/date-calculator.md` | `19cfeb4f-02af-4ab2-895c-0ff2bb5cce19` | matched | matched | 0 | 0 |
| `drop` | `wrangles-docs/wrangle-docs/select/_sources/drop.md` | `363bffbf-397e-4975-8382-e9efa5e9eed6` | matched | matched | 0 | 0 |
| `explode` | `wrangles-docs/wrangle-docs/split/_sources/explode.md` | `4e4b13ac-8d50-4b2c-85c8-2c31de1e817d` | matched | matched | 2 | 2 |
| `extract.address` | `wrangles-docs/wrangle-docs/extract/_sources/address.md` | `44153f95-4581-4cee-898e-b3b4714045fd` | matched | matched | 2 | 3 |
| `extract.ai` | `wrangles-docs/wrangle-docs/extract/_sources/ai.md` | `d9f89b00-fda3-4f4c-826c-6417b9390607` | matched | matched | 15 | 15 |
| `extract.attributes` | `wrangles-docs/wrangle-docs/extract/_sources/attributes.md` | `03ccedef-c938-41f1-8980-280f1a91542e` | matched | matched | 2 | 2 |
| `extract.brackets` | `wrangles-docs/wrangle-docs/extract/_sources/brackets.md` | `9b4c15fa-2aaa-40c8-8834-6e835760bee5` | matched | matched | 3 | 3 |
| `extract.codes` | `wrangles-docs/wrangle-docs/extract/_sources/codes.md` | `da591387-0fca-4842-8bcb-d19f561f0292` | matched | matched | 3 | 3 |
| `extract.custom` | `wrangles-docs/wrangle-docs/extract/_sources/custom.md` | `e8e96b76-86bf-41dc-8d16-825dcff9688b` | matched | matched | 3 | 3 |
| `extract.date_properties` | `wrangles-docs/wrangle-docs/extract/_sources/date-properties.md` | `a346de62-93cd-44ba-8d30-a6305629c6d7` | matched | matched | 0 | 0 |
| `extract.date_range` | `wrangles-docs/wrangle-docs/extract/_sources/date-range.md` | `9cebfa6f-a524-4aec-84a7-02d77b792843` | matched | matched | 0 | 1 |
| `extract.html` | `wrangles-docs/wrangle-docs/extract/_sources/html.md` | `728fc87a-a20d-4efa-833a-612e0b5eadc3` | matched | matched | 4 | 3 |
| `extract.properties` | `wrangles-docs/wrangle-docs/extract/_sources/properties.md` | `23bbdb86-fd13-4b78-8fff-a7a76769ab63` | matched | matched | 2 | 2 |
| `extract.regex` | `wrangles-docs/wrangle-docs/extract/_sources/regex.md` | `9aa0253a-4b70-4737-832c-964e15967289` | matched | matched | 2 | 2 |
| `filter` | `wrangles-docs/wrangle-docs/select/_sources/filter.md` | `e3242acf-d204-433f-8373-205b77481131` | matched | matched | 0 | 0 |
| `format.dates` | `wrangles-docs/wrangle-docs/format/_sources/dates.md` | `a3c15135-4f7a-4659-83fd-f657afa603c9` | matched | matched | 0 | 0 |
| `format.pad` | `wrangles-docs/wrangle-docs/format/_sources/pad.md` | `76c19378-38f4-45aa-85d1-3cdf8f8aae29` | matched | matched | 0 | 0 |
| `format.prefix` | `wrangles-docs/wrangle-docs/format/_sources/prefix.md` | `c12f99b9-2363-4da7-8405-7c73b87906e5` | matched | matched | 0 | 0 |
| `format.remove_duplicates` | `wrangles-docs/wrangle-docs/format/_sources/remove-duplicates.md` | `283b9e78-b2b2-43d0-844f-9842c33120aa` | matched | matched | 0 | 0 |
| `format.significant_figures` | `wrangles-docs/wrangle-docs/format/_sources/significant-figures.md` | `a359f72a-5250-4dd8-84f6-8a8173bee0f6` | matched | matched | 0 | 0 |
| `format.suffix` | `wrangles-docs/wrangle-docs/format/_sources/suffix.md` | `8d127060-ba2d-4934-897f-07662e01e40b` | matched | matched | 0 | 0 |
| `format.trim` | `wrangles-docs/wrangle-docs/format/_sources/trim.md` | `af16b3c1-c230-4868-8ebe-f574904a0c76` | matched | matched | 0 | 0 |
| `generate.ai` | `wrangles-docs/wrangle-docs/ai/_sources/ai.md` | `12c31c6c-cade-484d-84ba-7f302bf6af52` | matched | matched | 3 | 3 |
| `huggingface` | `wrangles-docs/wrangle-docs/ai/_sources/huggingface.md` | `ae12cf20-4934-428f-84a9-a6898cb7ffe0` | matched | matched | 3 | 3 |
| `log` | `wrangles-docs/wrangle-docs/utility/_sources/log.md` | `6177808e-aa2d-4d0b-8385-858b16948a5d` | matched | matched | 0 | 0 |
| `lookup` | `wrangles-docs/wrangle-docs/lookup/_sources/lookup.md` | `b3339193-d1cc-4c89-8ed6-901efa6d81be` | matched | matched | 2 | 1 |
| `math` | `wrangles-docs/wrangle-docs/compute/_sources/math.md` | `494b11ad-00c1-4748-8b93-6bec982f4fec` | matched | matched | 0 | 0 |
| `matrix` | `wrangles-docs/wrangle-docs/utility/_sources/matrix.md` | missing | matched | matched | 3 | 3 |
| `merge.coalesce` | `wrangles-docs/wrangle-docs/merge/_sources/coalesce.md` | `25c1a60d-fa48-4b9a-8c03-0921d5b31049` | matched | matched | 1 | 1 |
| `merge.concatenate` | `wrangles-docs/wrangle-docs/merge/_sources/concatenate.md` | `6ff76728-e1f6-4d3d-8946-6aa3b7524b3f` | matched | matched | 0 | 1 |
| `merge.dictionaries` | `wrangles-docs/wrangle-docs/merge/_sources/dictionaries.md` | `93e27737-e966-4ba9-8777-4e96724ebfc4` | matched | matched | 0 | 0 |
| `merge.key_value_pairs` | `wrangles-docs/wrangle-docs/merge/_sources/key-value-pairs.md` | `8a2cd37c-8ef7-4b05-8264-36512f5dd837` | matched | matched | 0 | 0 |
| `merge.lists` | `wrangles-docs/wrangle-docs/merge/_sources/lists.md` | `d9978f00-b3d4-4583-884e-a53b98a43e9a` | matched | matched | 0 | 0 |
| `merge.to_dict` | `wrangles-docs/wrangle-docs/merge/_sources/to-dict.md` | `9b869210-0d89-403b-8409-7cecdb5f9c7c` | matched | matched | 0 | 0 |
| `merge.to_list` | `wrangles-docs/wrangle-docs/merge/_sources/to-list.md` | `d5300fe7-c8a4-4a41-8f12-f2c1698678cc` | matched | matched | 0 | 0 |
| `python` | `wrangles-docs/wrangle-docs/compute/_sources/python.md` | `c0398a11-7731-4e47-8df0-b07eea0b1d6c` | matched | matched | 2 | 2 |
| `reindex` | `wrangles-docs/wrangle-docs/transform/_sources/reindex.md` | `def87df8-72da-4e34-83c1-1fde25126257` | matched | matched | 0 | 0 |
| `remove_words` | `wrangles-docs/wrangle-docs/format/_sources/remove-words.md` | `543b96c3-f354-48be-8046-bf0cb9fbaf56` | matched | matched | 0 | 1 |
| `rename` | `wrangles-docs/wrangle-docs/transform/_sources/rename.md` | `ab06898f-faf7-42e7-8275-5e3034a4d727` | matched | matched | 0 | 0 |
| `replace` | `wrangles-docs/wrangle-docs/format/_sources/replace.md` | `f0ab715e-9e0e-4614-83e4-5cd8ea08a09f` | matched | matched | 0 | 0 |
| `round` | `wrangles-docs/wrangle-docs/format/_sources/round.md` | `12f3111b-8511-4e42-8d3f-b5302dc3b4e4` | matched | matched | 0 | 0 |
| `search.find_links` | `wrangles-docs/wrangle-docs/search/_sources/find-links.md` | `ec1f661b-2cbc-4a47-88e3-646179104376` | matched | matched | 4 | 3 |
| `search.retrieve_link_content` | `wrangles-docs/wrangle-docs/search/_sources/retrieve-link-content.md` | `3d5faa87-9e96-48c0-8226-5ae566e8d76c` | matched | matched | 4 | 3 |
| `select.columns` | `wrangles-docs/wrangle-docs/select/_sources/columns.md` | `bca12c60-3957-4dc5-83f7-5ee460df2a11` | matched | matched | 2 | 2 |
| `select.dictionary_element` | `wrangles-docs/wrangle-docs/select/_sources/dictionary-element.md` | `5adaeada-6da8-464f-84cb-9fb5ecc17e48` | matched | matched | 0 | 0 |
| `select.element` | `wrangles-docs/wrangle-docs/select/_sources/element.md` | `223d2f4e-3247-4189-8b6c-e73fe44c4266` | matched | matched | 2 | 2 |
| `select.group_by` | `wrangles-docs/wrangle-docs/select/_sources/group-by.md` | `c0af10b1-423a-416c-8cb5-7e7fe1164964` | matched | matched | 3 | 3 |
| `select.head` | `wrangles-docs/wrangle-docs/select/_sources/head.md` | `237af1ec-db7d-415a-88b7-70586a2191fb` | matched | matched | 2 | 2 |
| `select.highest_confidence` | `wrangles-docs/wrangle-docs/select/_sources/highest-confidence.md` | `00aad85d-8cc8-42e5-86f3-e4ff916e8ac2` | matched | matched | 0 | 0 |
| `select.left` | `wrangles-docs/wrangle-docs/select/_sources/left.md` | `5cdd9857-0c77-43bf-80d7-d0a8cb6f980b` | matched | matched | 0 | 0 |
| `select.length` | `wrangles-docs/wrangle-docs/select/_sources/length.md` | `4d7a5f66-0a4a-40e0-8298-d5c55754423d` | matched | matched | 0 | 0 |
| `select.list_element` | `wrangles-docs/wrangle-docs/select/_sources/list-element.md` | `ec40495d-d29a-4f62-86dd-eafa43cf388a` | matched | matched | 0 | 1 |
| `select.right` | `wrangles-docs/wrangle-docs/select/_sources/right.md` | `89ee82ec-3bc5-4bfa-899b-7a1260ef9bdb` | matched | matched | 0 | 0 |
| `select.sample` | `wrangles-docs/wrangle-docs/select/_sources/sample.md` | `95a84ab6-a66e-450f-8a4a-7a87e3a77932` | matched | matched | 2 | 2 |
| `select.substring` | `wrangles-docs/wrangle-docs/select/_sources/substring.md` | `8befddf8-602e-4fa9-8f16-4c547210ebec` | matched | matched | 0 | 2 |
| `select.tail` | `wrangles-docs/wrangle-docs/select/_sources/tail.md` | `60853759-c160-49a4-87eb-036516a9d823` | matched | matched | 2 | 2 |
| `select.threshold` | `wrangles-docs/wrangle-docs/select/_sources/threshold.md` | `af2a5dcc-0ec0-48d7-8fb4-f58d9c5391d2` | matched | matched | 0 | 0 |
| `similarity` | `wrangles-docs/wrangle-docs/compare/_sources/similarity.md` | `7c733344-4cce-4938-8013-53742fb46a90` | matched | matched | 0 | 0 |
| `sort` | `wrangles-docs/wrangle-docs/select/_sources/sort.md` | `1dcf06ad-898a-4d83-862c-4774be37a687` | matched | matched | 3 | 2 |
| `split.dictionary` | `wrangles-docs/wrangle-docs/split/_sources/dictionary.md` | `06ca98e4-d026-43f7-84eb-af246d401ba9` | matched | matched | 1 | 1 |
| `split.list` | `wrangles-docs/wrangle-docs/split/_sources/list.md` | `3260b9f7-aae2-499f-8004-d211c2cf643e` | matched | matched | 2 | 2 |
| `split.text` | `wrangles-docs/wrangle-docs/split/_sources/text.md` | `e76e43f7-d129-4bf8-87b4-a304a378b130` | matched | matched | 0 | 0 |
| `split.tokenize` | `wrangles-docs/wrangle-docs/split/_sources/tokenize.md` | `6cc88418-ae0c-43f6-84ee-31e0d5f838c3` | matched | matched | 0 | 0 |
| `sql` | `wrangles-docs/wrangle-docs/compute/_sources/sql.md` | `467a06b1-a697-4d31-8061-7d83a719fd79` | matched | matched | 4 | 2 |
| `standardize` | `wrangles-docs/wrangle-docs/format/_sources/standardize.md` | `53cd3fdd-24e2-4411-8655-6014b92a3f3a` | matched | matched | 0 | 1 |
| `translate` | `wrangles-docs/wrangle-docs/format/_sources/translate.md` | `73c3ceb6-ffd8-4d74-8389-c83b99d33bb0` | matched | matched | 0 | 1 |
| `transpose` | `wrangles-docs/wrangle-docs/transform/_sources/transpose.md` | `8716347f-f286-49b2-8a0b-cb73292e7475` | matched | matched | 2 | 2 |
| `try` | `wrangles-docs/wrangle-docs/utility/_sources/try.md` | missing | matched | matched | 5 | 5 |

## Runtime entries without quasi-registry Markdown

| Runtime key | Python symbol | Embedded schema |
| --- | --- | --- |
| `format.price_breaks` | `wrangles.recipe_wrangles.format.price_breaks` | missing |
| `maths` | `wrangles.recipe_wrangles.main.maths` | missing |
| `recipe` | `wrangles.recipe_wrangles.main.recipe` | available |
| `standardize.clean` | `wrangles.recipe_wrangles.standardize.clean` | available |
| `standardize.custom` | `wrangles.recipe_wrangles.standardize.custom` | available |

## Supporting and aggregate Markdown

These files are accounted for as context or templates rather than one-to-one
wrangle records.

- `wrangles-docs/wrangle-docs/ai/ai.md` (SHA-256 `53be8601bddc…`)
- `wrangles-docs/wrangle-docs/compare/compare.md` (SHA-256 `56e2447f70b1…`)
- `wrangles-docs/wrangle-docs/compute/compute.md` (SHA-256 `309971c405d5…`)
- `wrangles-docs/wrangle-docs/convert/convert.md` (SHA-256 `ec27a3d5b9fd…`)
- `wrangles-docs/wrangle-docs/create/create.md` (SHA-256 `d7d6b9e27d82…`)
- `wrangles-docs/wrangle-docs/date/date.md` (SHA-256 `77a783d41ebd…`)
- `wrangles-docs/wrangle-docs/extract/extract.md` (SHA-256 `d2c3f1606f36…`)
- `wrangles-docs/wrangle-docs/format/format.md` (SHA-256 `1a7dc820b43e…`)
- `wrangles-docs/wrangle-docs/index.md` (SHA-256 `86ceb6fca00b…`)
- `wrangles-docs/wrangle-docs/lookup/lookup.md` (SHA-256 `7f630a74180b…`)
- `wrangles-docs/wrangle-docs/merge/merge.md` (SHA-256 `52e95aaf804f…`)
- `wrangles-docs/wrangle-docs/search/search.md` (SHA-256 `1492c8af3f2f…`)
- `wrangles-docs/wrangle-docs/select/select.md` (SHA-256 `49385756e393…`)
- `wrangles-docs/wrangle-docs/split/split.md` (SHA-256 `929966a314ef…`)
- `wrangles-docs/wrangle-docs/transform/transform.md` (SHA-256 `b2169fe57f28…`)
- `wrangles-docs/wrangle-docs/utility/utility.md` (SHA-256 `a8a3b2a0293e…`)
- `wrangles-docs/wrangle-docs/wrangle_template.md` (SHA-256 `00bc80faa234…`)
