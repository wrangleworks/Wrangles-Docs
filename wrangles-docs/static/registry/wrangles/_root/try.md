---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: try
namespace: null
title: Try
description: Try a list of wrangles and catch any errors that occur.
wrangle_key: try
aliases: []
slug: try
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Error-control orchestration is not supported in the baseline.
tags:
  - utility
  - try
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.Try
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
  - name: wrangles
    description: List of wrangles to apply
    required: true
    param_group: Execution
    schema:
      type: array
      description: List of wrangles to apply
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
    runtime_required: true
  - name: retries
    description: Number of times to retry the wrangles if an error occurs. Default 0.
    required: false
    param_group: Errors
    runtime_default: 0
    schema:
      type: integer
      description: Number of times to retry the wrangles if an error occurs. Default 0.
      minimum: 0
    runtime_required: false
  - name: except
    description: |-
      An action to take if the wrangles encounter an error.
      This can contain a list of wrangles or a dictionary of column names and values.
      If except is not provided, the error will be logged and the recipe will continue.
    required: false
    param_group: Errors
    schema:
      type:
        - object
      description: |-
        An action to take if the wrangles encounter an error.
        This can contain a list of wrangles or a dictionary of column names and values.
        If except is not provided, the error will be logged and the recipe will continue.
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY try implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/try.md
    title: Archived try Markdown
configuration_schema:
  type: object
  description: Try a list of wrangles and catch any errors that occur
  required:
    - wrangles
  properties:
    wrangles:
      type: array
      description: List of wrangles to apply
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
    except:
      type:
        - object
      description: |-
        An action to take if the wrangles encounter an error.
        This can contain a list of wrangles or a dictionary of column names and values.
        If except is not provided, the error will be logged and the recipe will continue.
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
    retries:
      type: integer
      description: Number of times to retry the wrangles if an error occurs. Default 0.
      minimum: 0
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Try

Run a list of wrangles and catch errors. When `except` is provided, its wrangles or fallback column values run after an error; otherwise, the error is logged and the recipe continues.

The runtime supports both forms, but the pinned upstream schema only permits a
dictionary for `except`. Use fallback column values for schema-validated recipes.

## Migrated examples
#### Use Fallback Column Values After an Error

This input deliberately lacks `column`, so the conversion raises a missing-column error and `except` creates it with the fallback value. Invalid numeric text alone does not trigger this fallback: `convert.data_type` retains unconvertible values unless a default is provided.

##### Recipe

```yaml
wrangles:
  - try:
      wrangles:
        - convert.data_type:
            input: column
            data_type: int
      except:
        column: unavailable
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product |
| --- |
| Hammer |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column |
| --- |
| unavailable |

</div>

</div>

#### Successful Conversion Without Fallback

The same recipe preserves a successful conversion rather than applying the fallback.

```yaml
wrangles:
  - try:
      wrangles:
        - convert.data_type:
            input: column
            data_type: int
      except:
        column: unavailable
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| "42" |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column |
| --- |
| 42 |

</div>

</div>
