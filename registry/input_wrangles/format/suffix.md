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
  - name: value
    description: Suffix value to add
    required: true
    param_group: Options
    schema:
      type:
        - string
        - number
      description: Suffix value to add
    runtime_required: true
  - name: output
    description: (Optional) Name of the output column
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: (Optional) Name of the output column
    runtime_required: false
  - name: skip_empty
    description: Whether to skip empty values
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
      description: Whether to skip empty values
      default: false
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py
    title: WranglesPY format.suffix implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/suffix.md
    title: Archived format.suffix Markdown
configuration_schema:
  type: object
  description: Add a suffix to a column
  additionalProperties: false
  required:
    - input
    - value
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name of the input column
    value:
      type:
        - string
        - number
      description: Suffix value to add
    output:
      type:
        - string
        - array
      description: (Optional) Name of the output column
    skip_empty:
      type: boolean
      description: Whether to skip empty values
      default: false
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
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
