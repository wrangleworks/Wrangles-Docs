---
schema_version: '0.1'
type: wrangle
id: 5a18e2c8-ec7c-45f5-88fd-bb5c358a8b40
wrangle_name: column
namespace: create
title: Column
description: Create column(s) with a user defined value. Defaults to None (empty).
wrangle_key: create.column
aliases: []
slug: create/column
status: active
visibility: public
tags:
  - create
  - column
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.create.column
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
  - name: output
    description: 'Name or list of names of new columns or column_name: value pairs.'
    required: true
    role: column-output
    schema:
      type:
        - string
        - array
  - name: value
    description: >-
      (Optional) Value(s) to add in the new column(s). If using a dictionary in output, value can
      only be a string.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - number
        - object
        - array
        - boolean
        - 'null'
  - name: value_if_exists
    description: >-
      Determines behaviour when the output column already exists. existing (default): leave the
      column unchanged. coalesce: fill empty/null cells with the new value, keeping non-null cells.
      new: overwrite the entire column with the new value.
    required: false
    role: option
    runtime_default: existing
    schema:
      type: string
      enum:
        - existing
        - coalesce
        - new
  - name: coalesce_value
    description: >-
      Only used when value_if_exists is coalesce. Determines which side is preferred when both the
      existing and new values are non-empty. existing (default): keep the existing value, only fill
      empty/null cells with the new value. new: keep the new value, only fall back to the existing
      value where the new value is empty/null.
    required: false
    role: option
    runtime_default: existing
    schema:
      type: string
      enum:
        - existing
        - new
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py
    title: WranglesPY create.column implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/column.md
    title: Existing create.column Markdown
---

# Column

Create column(s) with a user defined value. Defaults to `None` (empty). If you need to copy an existing column, use the copy wrangle instead.

## Migrated examples
#### Creating a New Column

##### Recipe

```yaml
wrangles:
  - create.column:
      output: New Column
      value: new value      # Optional, otherwise empty
      where: column > 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column |
| --- | --- |
| 1 |  |
| 2 | new value |
| 3 | new value |

</div>

</div>

#### Creating Multiple Columns

##### Recipe

```yaml
wrangles:
  - create.column:
      output:
        - New Column 1: new value 1 # Optional, otherwise empty
        - New Column 2: new value 2
        - New Column 3: new value 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column 1 | New Column 2 | New Column 3 |
| --- | --- | --- | --- |
| 1 | new value 1 | new value 2 | new value 1 |
| 2 | new value 1 | new value 2 | new value 1 |
| 3 | new value 1 | new value 2 | new value 1 |

</div>

</div>

#### Creating Columns That Consist of Lists

##### Recipe

```yaml
wrangles:
  - create.column:
      output:
        - New Column:
            - 4
            - 5
            - 6
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column |
| --- | --- |
| 1 | [4, 5, 6] |
| 2 | [4, 5, 6] |
| 3 | [4, 5, 6] |

</div>

</div>

Columns of empty lists can also be created by passing an empty list (`[]`) as the column value.
