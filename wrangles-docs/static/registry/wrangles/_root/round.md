---
schema_version: '0.1'
type: wrangle
id: 12f3111b-8511-4e42-8d3f-b5302dc3b4e4
wrangle_name: round
namespace: null
title: Round
description: Round column(s) to the specified decimals.
wrangle_key: round
aliases: []
slug: round
status: active
visibility: public
tags:
  - format
  - round
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.pandas.round
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
    description: Name of the input column(s).
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: decimals
    description: Number of decimal places to round column.
    required: false
    param_group: Formatting
    runtime_default: 0
    schema:
      type: integer
  - name: output
    description: Name of the output column(s).
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py
    title: WranglesPY round implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/round.md
    title: Existing round Markdown
---

# Round

Round numbers in a column to the nearest decimal point of your choosing.

## Migrated examples
#### Rounding a Column

##### Recipe

```yaml
wrangles:
  - round:
      input: Cost Per Unit
      output: Cost Rounded
      decimals: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Cost Per Unit |
| --- |
| 3.14159 |
| 2.71828 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Cost Per Unit | Cost Rounded |
| --- | --- |
| 3.14159 | 3.14 |
| 2.71828 | 2.72 |

</div>

</div>
