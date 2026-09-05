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
      type:
        - array
        - 'null'
  - name: index
    description: New labels for the index. Preferably an Index object to avoid duplicating data.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - array
        - 'null'
  - name: columns
    description: New labels for the columns. Preferably an Index object to avoid duplicating data.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - array
        - 'null'
  - name: axis
    description: Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1).
    required: false
    param_group: Options
    runtime_default: null
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
    title: WranglesPY reindex implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/reindex.md
    title: Existing reindex Markdown
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
        - 5
        - 4
        - 3
        - 2
        - 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

|  | Material | Product Data |
| --- | --- | --- |
| 1 | Ceramic | SKF ball brg |
| 2 | Rubber | brg seal |
| 3 | Brass | Ball valve |
| 4 | Ceramic | Ceramic cartridge |
| 5 | Stainless Steel | Needle Bearing |

</div>

<div className="ww-sample-panel">

##### Output Sample

|  | Material | Product Data |
| --- | --- | --- |
| 5 | Stainless Steel | Needle Bearing |
| 4 | Ceramic | Ceramic cartridge |
| 3 | Brass | Ball valve |
| 2 | Rubber | brg seal |
| 1 | Ceramic | SKF ball brg |

</div>

</div>
