---
schema_version: '0.1'
type: wrangle
id: 467a06b1-a697-4d31-8061-7d83a719fd79
wrangle_name: sql
namespace: null
title: SQL
description: >-
  Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result
  will be the output.
wrangle_key: sql
aliases: []
slug: sql
status: active
visibility: public
tags:
  - compute
  - sql
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.sql
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
  - name: command
    description: SQL Command. The table is called df. For specific SQL syntax, this uses the SQLite dialect.
    required: true
    param_group: Options
    schema:
      type: string
  - name: params
    description: >-
      Variables to use in conjunctions with query. This allows the query to be parameterized. This
      uses sqlite syntax (? or :name).
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - array
        - object
        - 'null'
  - name: preserve_index
    description: Preserve Index value accepted by the runtime.
    required: false
    param_group: Formatting
    runtime_default: false
    schema:
      type: boolean
  - name: preserve_data_types
    description: Preserve Data Types value accepted by the runtime.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY sql implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/sql.md
    title: Existing sql Markdown
---

# SQL

Apply a SQL command to the current dataframe. Only `SELECT` statements are supported; the result becomes the output. The current table is called `df`.

:::info
SQL does not currently work with objects. If your table contains objects, use `convert.to_json` before using SQL. SQL is not compatible with `where` filtering.
:::

## Migrated examples
#### Selecting a Subset of Data

##### Recipe

```yaml
wrangles:
  - sql:
      command: |
        SELECT header1, header2
        FROM df
        WHERE header1 >= 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| header1 | header2 | header3 |
| --- | --- | --- |
| 1 | a | x |
| 2 | b | y |
| 3 | c | z |

</div>

<div className="ww-sample-panel">

##### Output Sample

| header1 | header2 |
| --- | --- |
| 2 | b |
| 3 | c |

</div>

</div>
