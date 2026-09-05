---
schema_version: '0.1'
type: wrangle
id: 223d2f4e-3247-4189-8b6c-e73fe44c4266
wrangle_name: element
namespace: select
title: Element
description: Select elements of lists or dicts using python syntax like col[0]['key'].
wrangle_key: select.element
aliases: []
slug: select/element
status: active
visibility: public
tags:
  - select
  - element
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.element
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
      Name of the input column and sub elements This permits by index for lists or dict and by key
      for dicts e.g. col[0]['key'] // [{"key":"val"}] -> "val".
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
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
  - name: default
    description: Set the default value to return if the specified element doesn't exist.
    required: false
    param_group: Errors
    runtime_default: null
    schema:
      type:
        - string
        - number
        - array
        - object
        - boolean
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.element implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/element.md
    title: Existing select.element Markdown
---

# Element

Select elements of lists or dictionaries using Python syntax like `col[1:3]['key']`.

## Migrated examples
#### Selecting The First Element

##### Recipe

```yaml
wrangles:
  - select.element:
      input: Column A[0]
      output: First Element
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column A |
| --- |
| [A, 0.9] |
| [B, 0.8] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column A | First Element |
| --- | --- |
| [A, 0.9] | A |
| [B, 0.8] | B |

</div>

</div>
