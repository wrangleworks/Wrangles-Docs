---
schema_version: '0.1'
type: wrangle
id: d5300fe7-c8a4-4a41-8f12-f2c1698678cc
wrangle_name: to_list
namespace: merge
title: To List
description: Take multiple columns and merge them to a list.
wrangle_key: merge.to_list
aliases: []
slug: merge/to-list
status: active
visibility: public
tags:
  - merge
  - to-list
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.merge.to_list
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
    description: List of input columns.
    required: true
    role: column-selector
    schema:
      type: array
  - name: output
    description: Name of the output column.
    required: true
    role: column-output
    schema:
      type: string
  - name: include_empty
    description: Whether to include empty columns in the created list.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py
    title: WranglesPY merge.to_list implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/to-list.md
    title: Existing merge.to_list Markdown
---

# To List

Take multiple columns and merge them to a list.

## Migrated examples
#### Merging Multiple Columns to a Single List

##### Recipe

```yaml
wrangles:
  - merge.to_list:
      input:
        - Col1
        - Col2
        - Col3
      output: List Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

<div className="ww-sample-panel">

##### Output Sample

| List Col |
| --- |
| ['A', 'B', 'C'] |

</div>

</div>
