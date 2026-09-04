---
schema_version: '0.1'
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
    description: List of wrangles to apply.
    required: true
    role: nested-wrangles
    schema:
      type: array
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
  - name: retries
    description: Number of times to retry the wrangles if an error occurs. Default 0.
    required: false
    role: option
    runtime_default: 0
    schema:
      type: integer
      minimum: 0
  - name: except
    description: >-
      An action to take if the wrangles encounter an error. This can contain a list of wrangles or a
      dictionary of column names and values. If except is not provided, the error will be logged and
      the recipe will continue.
    required: false
    role: option
    schema:
      type: object
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY try implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/try.md
    title: Existing try Markdown
---

# Try

Run a list of wrangles and catch errors. When `except` is provided, its wrangles or fallback column values run after an error; otherwise, the error is logged and the recipe continues.

## Migrated examples
#### Use Fallback Wrangles After an Error

##### Recipe

```yaml
wrangles:
  - try:
      wrangles:
        - risky_wrangle:
            input: column
      except:
        - backup_wrangle:
            input: column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_The input dataframe is passed to the primary wrangles._

</div>

<div className="ww-sample-panel">

##### Output Sample

_The primary result is returned on success; the `except` result is returned after an error._

</div>

</div>
