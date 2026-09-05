---
schema_version: '0.2'
type: wrangle
id: 8716347f-f286-49b2-8a0b-cb73292e7475
wrangle_name: transpose
namespace: null
title: Transpose
description: Transpose the DataFrame (swap columns to rows).
wrangle_key: transpose
aliases: []
slug: transpose
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - transform
  - transpose
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.pandas.transpose
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
  - name: header_column
    description: >-
      Name or position of the column that will be used as the column headings for the transposed
      DataFrame. Default 0 (first column). Use header_column = null to not use any column as header.
    required: false
    param_group: I/O
    runtime_default: 0
    schema:
      type:
        - string
        - integer
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py
    title: WranglesPY transpose implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/transpose.md
    title: Existing transpose Markdown
---

# Transpose

Transpose a dataframe.

## Migrated examples
:::note
Transpose is not compatible with `where` filtering.
:::

#### Transposing a Dataframe

##### Recipe

```yaml
wrangles:
  - transpose:
      header_column: Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Material | Ceramic | Rubber |
| --- | --- | --- |
| Product Data | SKF ball brg | brg seal |

</div>

</div>
