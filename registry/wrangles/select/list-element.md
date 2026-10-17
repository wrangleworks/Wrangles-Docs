---
schema_version: '0.2'
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
recipe_writer:
  eligible: true
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
    description: Name of the input column
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Name of the input column
    runtime_required: true
  - name: output
    description: Name of the output column
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: Name of the output column
    runtime_required: false
  - name: element
    description: |-
      The numbered element of the list to select.
      Starts from zero.
      This may use python slicing syntax to select a subset of the list.
    required: true
    param_group: Options
    runtime_default: 0
    schema:
      type: integer
      description: |-
        The numbered element of the list to select.
        Starts from zero.
        This may use python slicing syntax to select a subset of the list.
    runtime_required: false
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
      description: Set the default value to return if the specified element doesn't exist.
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.list_element implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/list-element.md
    title: Archived select.list_element Markdown
configuration_schema:
  type: object
  description: Select a numbered element of a list (zero indexed).
  additionalProperties: false
  required:
    - input
    - element
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name of the input column
    output:
      type:
        - string
        - array
      description: Name of the output column
    element:
      type: integer
      description: |-
        The numbered element of the list to select.
        Starts from zero.
        This may use python slicing syntax to select a subset of the list.
    default:
      type:
        - string
        - number
        - array
        - object
        - boolean
        - 'null'
      description: Set the default value to return if the specified element doesn't exist.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
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
