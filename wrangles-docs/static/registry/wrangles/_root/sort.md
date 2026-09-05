---
schema_version: '0.1'
type: wrangle
id: 1dcf06ad-898a-4d83-862c-4774be37a687
wrangle_name: sort
namespace: null
title: Sort
description: Sort the data.
wrangle_key: sort
aliases: []
slug: sort
status: active
visibility: public
tags:
  - select
  - sort
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.pandas.sort
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
  - name: ignore_index
    description: Ignore Index value accepted by the runtime.
    required: false
    role: option
    runtime_default: true
    schema:
      type: boolean
  - name: by
    description: Name or list of the column(s) to sort by.
    required: true
    role: column-selector
    schema:
      type:
        - string
        - array
  - name: ascending
    description: >-
      Sort ascending vs. descending. Specify a list to sort multiple columns in different orders. If
      this is a list of bools then it must match the length of the by.
    required: false
    role: option
    schema:
      type:
        - boolean
        - array
      items:
        type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py
    title: WranglesPY sort implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/sort.md
    title: Existing sort Markdown
---

# Sort

Sort the data

## Migrated examples
#### Replacing Abbreviations

##### Recipe

```yaml
wrangles:
  - sort:
      by: Price
      ascending: true
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Item | Price |
| --- | --- |
| Hammer | 11.99 |
| Chisel | 4.99 |
| Drill | 29.99 |
| Wrench | 6.99 |
| Saw | 13.99 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Item | Price |
| --- | --- |
| Chisel | 4.99 |
| Wrench | 6.99 |
| Hammer | 11.99 |
| Saw | 13.99 |
| Drill | 29.99 |

</div>

</div>
