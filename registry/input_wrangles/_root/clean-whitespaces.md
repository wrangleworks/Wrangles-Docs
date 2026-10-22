---
schema_version: '0.2'
type: wrangle
id: e36e15c4-f0ad-43f8-8555-ef683a8ab892
wrangle_name: clean_whitespaces
namespace: null
title: Clean Whitespaces
description: >-
  Condense multiple spaces to a single space and convert special space characters to a standard
  space.
wrangle_key: clean_whitespaces
aliases: []
slug: clean-whitespaces
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - format
  - clean-whitespaces
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.clean_whitespaces
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
    description: Name or list of input columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Name or list of input columns.
    runtime_required: true
  - name: output
    description: Name or list of output columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: Name or list of output columns.
    runtime_required: false
  - name: trim
    description: Whether to trim leading and trailing spaces. Default True.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
      description: Whether to trim leading and trailing spaces. Default True.
    runtime_required: false
  - name: remove_literals
    description: Whether to remove special space characters such as new lines etc. Default True.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
      description: Whether to remove special space characters such as new lines etc. Default True.
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY clean_whitespaces implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/clean-whitespaces.md
    title: Archived clean_whitespaces Markdown
configuration_schema:
  type: object
  description: >-
    Condense multiple spaces to a single space and convert special space characters to a standard
    space.
  additionalProperties: false
  required:
    - input
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name or list of input columns.
    output:
      type:
        - string
        - array
      description: Name or list of output columns.
    trim:
      type: boolean
      description: Whether to trim leading and trailing spaces. Default True.
    remove_literals:
      type: boolean
      description: Whether to remove special space characters such as new lines etc. Default True.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Clean Whitespaces

Condense multiple spaces to a single space and convert special space characters to a standard space.

## Migrated examples
#### Food Type Example

##### Recipe

```yaml
wrangles:
  - clean_whitespaces:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| `Hello     world!` |
| `Hello     universe!` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products |
| --- |
| Hello world! |
| Hello universe! |

</div>

</div>
