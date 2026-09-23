# Wrangles Registry Source Reconciliation

Generated file. Do not edit directly.

- Runtime version: `1.20.2`
- Runtime source: [`7916bf158e8b7e561270a1bea7b808f88956edc4`](https://github.com/wrangleworks/WranglesPY/commit/7916bf158e8b7e561270a1bea7b808f88956edc4)
- Registry version: `0.3.1`
- Runtime entries: 98
- Embedded Python schema docstrings: 96
- Registry entries: 98
- Verified Registry entries: 98
- Runtime entries without Registry entries: 0

The compiler reconciles Registry records directly with the pinned WranglesPY
runtime manifest. Signature-owned names, required status, defaults, symbols,
and common-control capabilities must agree. Embedded Python schema differences
remain migration evidence until the runtime-owned contract migration is complete.

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
