---
schema_version: '0.2'
type: wrangle
id: 76c19378-38f4-45aa-85d1-3cdf8f8aae29
wrangle_name: pad
namespace: format
title: Pad
description: Pad a string to a fixed length.
wrangle_key: format.pad
aliases: []
slug: format/pad
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - format
  - pad
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.format.pad
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
  - name: pad_length
    description: Length for the output
    required: true
    param_group: Formatting
    schema:
      type:
        - number
      description: Length for the output
    runtime_required: true
  - name: side
    description: Side from which to fill resulting string
    required: true
    param_group: Options
    schema:
      type:
        - string
      description: Side from which to fill resulting string
    runtime_required: true
  - name: char
    description: The character to pad the input with
    required: true
    param_group: Formatting
    schema:
      type:
        - string
      description: The character to pad the input with
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
  - name: skip_empty
    description: If true, skip padding for empty or whitespace-only values
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
      description: If true, skip padding for empty or whitespace-only values
      default: false
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py
    title: WranglesPY format.pad implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/pad.md
    title: Archived format.pad Markdown
configuration_schema:
  type: object
  description: Pad a string to a fixed length
  additionalProperties: false
  required:
    - input
    - pad_length
    - side
    - char
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
    pad_length:
      type:
        - number
      description: Length for the output
    side:
      type:
        - string
      description: Side from which to fill resulting string
    char:
      type:
        - string
      description: The character to pad the input with
    skip_empty:
      type: boolean
      description: If true, skip padding for empty or whitespace-only values
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

# Pad

Pad a string to a fixed length

## Migrated examples
#### Adding Dashes to Part Numbers

##### Recipe

```yaml
wrangles:
  - format.pad:
      input: Part Number
      pad_length: 5
      side: left
      char: "-"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Number |
| --- |
| 0458 |
| 396 |
| 84 |
| 98516 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Part Number |
| --- |
| -0458 |
| --396 |
| ---84 |
| 98516 |

</div>

</div>
