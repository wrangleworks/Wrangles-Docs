---
schema_version: '0.1'
type: wrangle
id: 4d7a5f66-0a4a-40e0-8298-d5c55754423d
wrangle_name: length
namespace: select
title: Length
description: >-
  Calculate the lengths of data in a column. The length depends on the data type e.g. text will be
  the length of the text, lists will be the number of elements in the list.
wrangle_key: select.length
aliases: []
slug: select/length
status: active
visibility: public
tags:
  - select
  - length
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.length
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
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.length implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/length.md
    title: Existing select.length Markdown
---

# Length

Calculate the lengths of data in a column. The length depends on the data type e.g. text will be the length of the text, lists will be the number of elements in the list.

## Migrated examples
#### Selecting the Length of Data Within a Column

##### Recipe

```yaml
wrangles:
  - select.length:
      input: Part Code
      output: Part Code Length
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Code |
| --- |
| 6202 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Part Code Length |
| --- |
| 4 |

</div>

</div>
