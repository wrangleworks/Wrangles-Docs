---
schema_version: '0.1'
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
    description: Name of the input column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: pad_length
    description: Length for the output.
    required: true
    param_group: Formatting
    schema:
      type: integer
  - name: side
    description: Side from which to fill resulting string.
    required: true
    param_group: Options
    schema:
      type: string
  - name: char
    description: The character to pad the input with.
    required: true
    param_group: Formatting
    schema:
      type: string
  - name: output
    description: Name of the output column.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: skip_empty
    description: If true, skip padding for empty or whitespace-only values.
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
    title: WranglesPY format.pad implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/pad.md
    title: Existing format.pad Markdown
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
