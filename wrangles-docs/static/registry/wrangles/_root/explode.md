---
schema_version: '0.1'
type: wrangle
id: 4e4b13ac-8d50-4b2c-85c8-2c31de1e817d
wrangle_name: explode
namespace: null
title: Explode
description: Explode a column of lists into rows.
wrangle_key: explode
aliases: []
slug: explode
status: active
visibility: public
tags:
  - split
  - explode
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.pandas.explode
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
    description: >-
      Name of the column(s) to explode. If multiple columns are included they must contain lists of
      the same length.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: reset_index
    description: Reset the index after exploding. Default True.
    required: false
    param_group: Formatting
    runtime_default: true
    schema:
      type: boolean
  - name: drop_empty
    description: >-
      If true, any rows that contain an empty list will be dropped. If false, rows that contain
      empty lists will keep 1 row with an empty value. Default False.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py
    title: WranglesPY explode implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/explode.md
    title: Existing explode Markdown
---

# Explode

Explode a column of lists into rows

## Migrated examples
#### Exploding a Column

##### Recipe

```yaml
wrangles:
  - explode:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products | Manufacturer |
| --- | --- |
| [Ball Bearing, Bearing Seal] | SKF |
| [Angle Grinder, Drill, Impact Driver] | Milwaukee |
| Solid State Relay | Schneider |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Seal | SKF |
| Angle Grinder | Milwaukee |
| Drill | Milwaukee |
| Impact Driver | Milwaukee |
| Solid State Relay | Schneider |

</div>

</div>
