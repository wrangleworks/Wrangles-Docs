---
schema_version: '0.2'
type: wrangle
id: 8a2cd37c-8ef7-4b05-8264-36512f5dd837
wrangle_name: key_value_pairs
namespace: merge
title: Key Value Pairs
description: >-
  Create a dictionary from keys and values in paired columns e.g. COLUMN_NAME_1, COLUMN_VALUE_1,
  COLUMN_NAME_2, COLUMN_VALUE_2 ...
wrangle_key: merge.key_value_pairs
aliases: []
slug: merge/key-value-pairs
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - merge
  - key-value-pairs
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.merge.key_value_pairs
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: input
    description: Matched pairs of key and value columns.
    required: true
    param_group: I/O
    schema:
      type: object
  - name: output
    description: Name of the output column.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: skip_empty
    description: Whether to skip empty keys or values when creating the dictionary.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py
    title: WranglesPY merge.key_value_pairs implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/key-value-pairs.md
    title: Existing merge.key_value_pairs Markdown
---

# Key Value Pairs

Create a dictionary from keys and values in paired columns.

## Migrated examples
#### Using Named Columns

##### Recipe

```yaml
wrangles:
  - merge.key_value_pairs:
      input:
        Letter: Number
      output: Pairs
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Letter | Number |
| --- | --- |
| A | 1 |
| B | 2 |
| C | 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Pairs |
| --- |
| \{'A': 1\} |
| \{'B': 2\} |
| \{'C': 3\} |

</div>

</div>

#### Using a wildcard (*)

##### Recipe

```yaml
# Using a Wildcard (*)
wrangles:
  - merge.key_value_pairs:
      input:
        key*: value*
      output: Object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| key 1 | key 2 | value 1 | value 2 |
| --- | --- | --- | --- |
| A | One | a | First |
| B | Two | b | Second |
| C | three | c | Third |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Object |
| --- |
| \{'A': 'a', 'One': 'First'\} |
| \{'B': 'b', 'Two': 'Second'\} |
| \{'C': 'c', 'three': 'Third'\} |

</div>

</div>
