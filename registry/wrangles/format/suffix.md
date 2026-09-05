---
schema_version: '0.2'
type: wrangle
id: 8d127060-ba2d-4934-897f-07662e01e40b
wrangle_name: suffix
namespace: format
title: Suffix
description: Add a suffix to a column.
wrangle_key: format.suffix
aliases: []
slug: format/suffix
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - format
  - suffix
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.format.suffix
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
  - name: value
    description: Suffix value to add.
    required: true
    param_group: Options
    schema:
      type:
        - string
        - integer
        - number
        - array
  - name: output
    description: (Optional) Name of the output column.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: skip_empty
    description: Whether to skip empty values.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py
    title: WranglesPY format.suffix implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/suffix.md
    title: Existing format.suffix Markdown
---

# Suffix

Add a suffix to a column

## Migrated examples
#### Adding a Suffix to a String

##### Recipe

```yaml
wrangles:
  - format.suffix:
      input: Data
      output: Suffix
      value: ic
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Data |
| --- |
| sto |
| hero |
| icon |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Suffix |
| --- | --- |
| sto | stoic |
| hero | heroic |
| icon | iconic |

</div>

</div>
