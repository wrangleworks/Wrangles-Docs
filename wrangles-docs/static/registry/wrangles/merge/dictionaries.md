---
schema_version: '0.2'
type: wrangle
id: 93e27737-e966-4ba9-8777-4e96724ebfc4
wrangle_name: dictionaries
namespace: merge
title: Dictionaries
description: Take dictionaries in multiple columns and merge them to a single dictionary.
wrangle_key: merge.dictionaries
aliases: []
slug: merge/dictionaries
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - merge
  - dictionaries
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.merge.dictionaries
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
    description: List of input columns.
    required: true
    param_group: I/O
    schema:
      type: array
  - name: output
    description: Name of the output column.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: skip_empty
    description: Whether to skip empty dictionaries when merging.
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
    title: WranglesPY merge.dictionaries implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/dictionaries.md
    title: Existing merge.dictionaries Markdown
---

# Dictionaries

Take dictionaries in multiple columns and merge them to a single dictionary.

:::note
For duplicate keys, the last key in the input list takes precedence in the merged dictionary.
:::

## Migrated examples
#### Using Named Columns

##### Recipe

```yaml
wrangles:
  - merge.dictionaries:
      input:
        - Dict 1
        - Dict 2
      output: Merged
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Dict 1 | Dict 2 |
| --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Merged |
| --- |
| \{'First': 'One', 'Second': 'Two'\} |

</div>

</div>

#### Using a Wildcard (*)

##### Recipe

```yaml
# Using a Wildcard (*)
wrangles:
  - merge.dictionaries:
      input: Dict *
      output: Merged
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Dict 1 | Dict 2 |
| --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Merged |
| --- |
| \{'First': 'One', 'Second': 'Two'\} |

</div>

</div>

#### Using a Wildcard (*) With Not Columns

##### Recipe

```yaml
# Using a Wildcard (*)
wrangles:
  - merge.dictionaries:
      input:
        - Dict *
        - -Dict 2
      output: Merged
```

Note the extra dash in front of `Dict 2` excludes that column from the wildcard selection.

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Dict 1 | Dict 2 | Dict 3 |
| --- | --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} | \{'Third': 'Three'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Merged |
| --- |
| \{'First': 'One', 'Third': 'Three'\} |

</div>

</div>
