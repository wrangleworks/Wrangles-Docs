---
schema_version: '0.1'
type: wrangle
id: af16b3c1-c230-4868-8ebe-f574904a0c76
wrangle_name: trim
namespace: format
title: Trim
description: Remove excess whitespace at the start and end of text.
wrangle_key: format.trim
aliases: []
slug: format/trim
status: active
visibility: public
tags:
  - format
  - trim
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.format.trim
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
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py
    title: WranglesPY format.trim implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/trim.md
    title: Existing format.trim Markdown
---

# Trim

Remove excess whitespace at the start and end of text. Can accept multiple columns.

:::note
Non-string values pass through unaltered.
:::

## Migrated examples
#### Trimming a String

##### Recipe

```yaml
wrangles:
  - format.trim:
      input:
        - col1
      output: col1 trimmed
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| col1 |
| --- |
| `  Hello World  ` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| col1 | col1 trimmed |
| --- | --- |
| Hello World | Hello World |

</div>

</div>
