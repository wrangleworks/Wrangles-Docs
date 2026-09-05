---
schema_version: '0.2'
type: wrangle
id: f0ab715e-9e0e-4614-83e4-5cd8ea08a09f
wrangle_name: replace
namespace: null
title: Replace
description: >-
  Quick find and replace for simple values. Can use regex if 'input' in params and
  isinstance(params['input'], list):in the find field.
wrangle_key: replace
aliases: []
slug: replace
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - format
  - replace
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.replace
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
    description: Name or list of input column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: find
    description: Pattern to find using regex.
    required: true
    param_group: Options
    schema:
      type: string
  - name: replace
    description: Value to replace the pattern found.
    required: true
    param_group: Options
    schema:
      type: string
  - name: output
    description: Name or list of output column.
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
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY replace implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/replace.md
    title: Existing replace Markdown
---

# Replace

Quick find and replace for simple values. Can use regex in the `find` field.

:::note
Values that are not a number or a string pass through unaltered.
:::

## Migrated examples
#### Replacing an Abbreviation

##### Recipe

```yaml
wrangles:
  - replace:
      input: Product Data
      find: brg
      replace: bearing
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data |
| --- |
| SKF ball bearing |
| bearing seal |

</div>

</div>
