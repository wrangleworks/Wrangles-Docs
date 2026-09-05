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
  - name: output
    description: Name or list of output columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: trim
    description: Whether to trim leading and trailing spaces. Default True.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
  - name: remove_literals
    description: Whether to remove special space characters such as new lines etc. Default True.
    required: false
    param_group: Options
    runtime_default: true
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY clean_whitespaces implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/clean-whitespaces.md
    title: Existing clean_whitespaces Markdown
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
