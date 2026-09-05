---
schema_version: '0.1'
type: wrangle
id: 6177808e-aa2d-4d0b-8385-858b16948a5d
wrangle_name: log
namespace: null
title: Log
description: Log the current status of the dataframe.
wrangle_key: log
aliases: []
slug: log
status: active
visibility: public
tags:
  - utility
  - log
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.log
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
  - name: columns
    description: (Optional, default all columns) List of specific columns to log.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - array
        - 'null'
  - name: write
    description: (Optional) Allows for an intermediate output to a file/dataframe/database etc.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - array
        - 'null'
      minItems: 1
      items:
        $ref: '#/$defs/write/items'
  - name: warning
    description: Log a warning to the console.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: info
    description: Log info to the console.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: log_data
    description: >-
      Whether to log a sample of the contents of the dataframe. Default True if not logging to a
      write, error, warning or info. Default False otherwise.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - boolean
        - 'null'
  - name: error
    description: Log an error to the console.
    required: false
    role: option
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY log implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/log.md
    title: Existing log Markdown
---

# Log

Print the current status of the dataframe. Only a sample of rows is logged.

## Migrated examples
#### Logging All Columns to Terminal

##### Recipe

```yaml
wrangles:
  - log: {}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Logging Specific Columns to Terminal

##### Recipe

```yaml
wrangles:
  - log:
      columns:
        - column1
        - column2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Logging to a File

##### Recipe

```yaml
wrangles:
  - log:
      write:
        - file:
            name: output/filepath
            columns:
              - column 1
              - column 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Native Variables

| Variable | Function |
| --- | --- |
| `${column_count}` | Number of columns. |
| `${columns}` | List of all columns. |
| `${df}` | Current dataframe. |
| `${row_count}` | Number of visible rows processed in each batch. |
