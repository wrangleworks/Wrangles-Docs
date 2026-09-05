---
schema_version: '0.1'
type: wrangle
id: ab06898f-faf7-42e7-8275-5e3034a4d727
wrangle_name: rename
namespace: null
title: Rename
description: Rename a column or list of columns.
wrangle_key: rename
aliases: []
slug: rename
status: active
visibility: public
tags:
  - transform
  - rename
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.rename
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: false
  where_params: false
parameters:
  - name: input
    description: Name or list of input columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - integer
        - array
        - 'null'
  - name: output
    description: Name or list of output columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: wrangles
    description: >-
      Use wrangles to transform the column names. The input is named 'columns' and the final result
      must also include the column named 'columns'. This can only be used instead of the standard
      rename.
    required: false
    param_group: Execution
    runtime_default: null
    schema:
      type:
        - array
        - 'null'
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY rename implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/rename.md
    title: Existing rename Markdown
---

# Rename

Rename a column or list of columns.

## Migrated examples
:::note
Rename is not compatible with `where` filtering.
:::

#### Renaming Columns With Input and Output

##### Recipe

```yaml
wrangles:
  - rename:
      input:
        - Manufacturer Name
        - Manufacturer Part Number
      output:
        - Manufacturer
        - MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

#### Renaming Columns Without Using Input and Output

##### Recipe

```yaml
wrangles:
  - rename:
      Manufacturer Name: Manufacturer
      Manufacturer Part Number: MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

#### Using Wrangles in Rename

##### Recipe

```yaml
wrangles:
  - rename:
      wrangles:
        - convert.case:
            input: columns
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| MANUFACTURER NAME | MANUFACTURER PART NUMBER |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>
