---
schema_version: '0.1'
type: wrangle
id: 6ff76728-e1f6-4d3d-8946-6aa3b7524b3f
wrangle_name: concatenate
namespace: merge
title: Concatenate
description: Concatenate a list of columns or a list within a single column.
wrangle_key: merge.concatenate
aliases: []
slug: merge/concatenate
status: active
visibility: public
tags:
  - merge
  - concatenate
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.merge.concatenate
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
    description: Either a single column name or list of columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of the output column.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: char
    description: (Optional) Character to add between successive values.
    required: false
    param_group: Formatting
    runtime_default: ','
    schema:
      type: string
  - name: skip_empty
    description: Whether to skip empty values, defaults to false.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
      desription: Whether to skip empty values
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py
    title: WranglesPY merge.concatenate implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/concatenate.md
    title: Existing merge.concatenate Markdown
---

# Concatenate

If the input is a list of columns, concatenate multiple columns into one as a delimited string. If the input is a single column, concatenate a list within that column into a delimited string.

## Migrated examples
#### Concatenating 3 Columns

##### Recipe

```yaml
# Using concatenate to combine multiple columns
wrangles:
  - merge.concatenate:
      input:
        - Col1
        - Col2
        - Col3
      output: Join Col
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Join Col |
| --- |
| A, B, C |

</div>

</div>

#### Concatenating a Single Column

##### Recipe

```yaml
# Using concatenate to join a column that is a list
wrangles:
  - merge.concatenate:
      input: Col1
      output: Join List
      char: ' '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Join List |
| --- |
| A B C |

</div>

</div>
