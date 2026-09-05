---
schema_version: '0.2'
type: wrangle
id: bca12c60-3957-4dc5-83f7-5ee460df2a11
wrangle_name: columns
namespace: select
title: Columns
description: Select columns from the dataframe.
wrangle_key: select.columns
aliases: []
slug: select/columns
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - select
  - columns
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.columns
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
    description: Name of the column(s) to select.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.columns implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/columns.md
    title: Existing select.columns Markdown
---

# Columns

Select columns from the dataframe

## Migrated examples
#### Selecting Columns

##### Recipe

```yaml
wrangles:
  - select.columns:
      input: Manufacturer
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Number | Manufacturer |
| --- | --- |
| 1234 | SKF |
| 5678 | Timken |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer |
| --- |
| SKF |
| Timken |

</div>

</div>
