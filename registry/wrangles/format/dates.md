---
schema_version: '0.1'
type: wrangle
id: a3c15135-4f7a-4659-83fd-f657afa603c9
wrangle_name: dates
namespace: format
title: Dates
description: Format a date.
wrangle_key: format.dates
aliases: []
slug: format/dates
status: active
visibility: public
tags:
  - format
  - dates
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.format.dates
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
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: format
    description: String pattern to format date.
    required: true
    role: option
    schema:
      type: string
  - name: output
    description: Name of the output column.
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
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py
    title: WranglesPY format.dates implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/dates.md
    title: Existing format.dates Markdown
---

# Dates

Format a date into the desired pattern.

## Migrated examples
#### Changing The Format of a Date

##### Recipe

```yaml
wrangles:
  - format.dates:
      input: Date
      output: Output Format
      format: '%Y-%m-%d'  # must be wrapped by quotes " or '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Date |
| --- |
| 6/23/1912 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Date | Output Format |
| --- | --- |
| 6/23/1912 | 1912-06-23 |

</div>

</div>
