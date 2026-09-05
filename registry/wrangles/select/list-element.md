---
schema_version: '0.1'
type: wrangle
id: ec40495d-d29a-4f62-86dd-eafa43cf388a
wrangle_name: list_element
namespace: select
title: List Element
description: Select a numbered element of a list (zero indexed).
wrangle_key: select.list_element
aliases: []
slug: select/list-element
status: active
visibility: public
tags:
  - select
  - list-element
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.list_element
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
    description: Name of the input column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of the output column.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: element
    description: >-
      The numbered element of the list to select. Starts from zero. This may use python slicing
      syntax to select a subset of the list.
    required: false
    param_group: Options
    runtime_default: 0
    schema:
      type: integer
  - name: default
    description: Set the default value to return if the specified element doesn't exist.
    required: false
    param_group: Errors
    runtime_default: ''
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
    title: WranglesPY select.list_element implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/list-element.md
    title: Existing select.list_element Markdown
---

# List Element

Select a numbered element of a list (zero indexed).

## Migrated examples
#### Selecting the Second Element in a List

##### Recipe

```yaml
wrangles:
  - select.list_element:
      input: Col1
      output: Second Element
      element: 2 # Zero indexed
      default: F
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 |
| --- |
| ['A', 'B', 'C'] |
| ['D', 'E'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Third Element |
| --- |
| C |
| F |

</div>

</div>
