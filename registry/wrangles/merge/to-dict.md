---
schema_version: '0.1'
type: wrangle
id: 9b869210-0d89-403b-8409-7cecdb5f9c7c
wrangle_name: to_dict
namespace: merge
title: To Dict
description: >-
  Take multiple columns and merge them to a dictionary (aka object) using the column headers as
  keys.
wrangle_key: merge.to_dict
aliases: []
slug: merge/to-dict
status: active
visibility: public
tags:
  - merge
  - to-dict
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.merge.to_dict
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
    description: Whether to include empty columns in the created dictionary.
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
    title: WranglesPY merge.to_dict implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/to-dict.md
    title: Existing merge.to_dict Markdown
---

# To Dict

Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys.

## Migrated examples
#### Merging Two Columns Into a Dictionary

##### Recipe

```yaml
wrangles:
  - merge.to_dict:
      input:
        - Col1
        - Col2
      output: Dict Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| A | B |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Dict Col |
| --- |
| \{'Col1': 'A', 'Col2': 'B'\} |

</div>

</div>
