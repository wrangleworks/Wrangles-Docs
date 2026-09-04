---
schema_version: '0.1'
type: wrangle
id: 89ee82ec-3bc5-4bfa-899b-7a1260ef9bdb
wrangle_name: right
namespace: select
title: Right
description: >-
  Return characters from the right of text. Strings shorter than the length defined will be
  unaffected.
wrangle_key: select.right
aliases: []
slug: select/right
status: active
visibility: public
tags:
  - select
  - right
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.right
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
    description: Name of the column(s) to edit.
    required: true
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: length
    description: >-
      Number of characters to include from the right. If negative, this will remove the specified
      number of characters from the right. May not equal 0.
    required: true
    role: option
    schema:
      type: integer
  - name: output
    description: Name of the output column(s).
    required: false
    role: column-output
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
    title: WranglesPY select.right implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/right.md
    title: Existing select.right Markdown
---

# Right

Select characters from the right of the input. Using a negative length reverses the side of selection, selecting from the left.

## Migrated examples
#### Selecting the Three Rightmost Elements

##### Recipe

```yaml
wrangles:
  - select.right:
      input: Column
      output: Result
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Result |
| --- |
| ing |

</div>

</div>
