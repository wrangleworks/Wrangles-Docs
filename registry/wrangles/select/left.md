---
schema_version: '0.2'
type: wrangle
id: 5cdd9857-0c77-43bf-80d7-d0a8cb6f980b
wrangle_name: left
namespace: select
title: Left
description: >-
  Return characters from the left of text. Strings shorter than the length defined will be
  unaffected.
wrangle_key: select.left
aliases: []
slug: select/left
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - select
  - left
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.left
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
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: length
    description: >-
      Number of characters to include from the left. If negative, this will remove the specified
      number of characters from the left. May not equal 0.
    required: true
    param_group: Options
    schema:
      type: integer
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
    title: WranglesPY select.left implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/left.md
    title: Existing select.left Markdown
---

# Left

Select characters from the left of the input. Using a negative length reverses the side of selection, selecting from the right.

## Migrated examples
#### Selecting Three Leftmost Elements

##### Recipe

```yaml
wrangles:
  - select.left:
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
| pud |

</div>

</div>
