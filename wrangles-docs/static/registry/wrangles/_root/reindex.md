---
schema_version: '0.2'
type: wrangle
id: def87df8-72da-4e34-83c1-1fde25126257
wrangle_name: reindex
namespace: null
title: Reindex
description: Changes the row labels and column labels of a DataFrame.
wrangle_key: reindex
aliases: []
slug: reindex
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - transform
  - reindex
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.pandas.reindex
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
  - name: labels
    description: New labels / index to conform the axis specified by ‘axis’ to.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type: array
      description: New labels / index to conform the axis specified by ‘axis’ to.
    runtime_required: false
  - name: index
    description: New labels for the index. Preferably an Index object to avoid duplicating data.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type: array
      description: New labels for the index. Preferably an Index object to avoid duplicating data.
    runtime_required: false
  - name: columns
    description: New labels for the columns. Preferably an Index object to avoid duplicating data.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type: array
      description: New labels for the columns. Preferably an Index object to avoid duplicating data.
    runtime_required: false
  - name: axis
    description: Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1).
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - number
        - string
      description: Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1).
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py
    title: WranglesPY reindex implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/reindex.md
    title: Archived reindex Markdown
configuration_schema:
  type: object
  description: Changes the row labels and column labels of a DataFrame.
  additionalProperties: false
  properties:
    labels:
      type: array
      description: New labels / index to conform the axis specified by ‘axis’ to.
    index:
      type: array
      description: New labels for the index. Preferably an Index object to avoid duplicating data.
    columns:
      type: array
      description: New labels for the columns. Preferably an Index object to avoid duplicating data.
    axis:
      type:
        - number
        - string
      description: Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1).
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Reindex

Conform a DataFrame to a new index with optional filling logic.

## Migrated examples
:::note
Cannot specify both `axis` and any of `index` or `columns`. Reindex is not compatible with `where` filtering.
:::

#### Reindexing a Dataframe

##### Recipe

```yaml
wrangles:
  - reindex:
      index:
        - 4
        - 3
        - 2
        - 1
        - 0
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |
| Brass | Ball valve |
| Ceramic | Ceramic cartridge |
| Stainless Steel | Needle Bearing |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Material | Product Data |
| --- | --- |
| Stainless Steel | Needle Bearing |
| Ceramic | Ceramic cartridge |
| Brass | Ball valve |
| Rubber | brg seal |
| Ceramic | SKF ball brg |

</div>

</div>
