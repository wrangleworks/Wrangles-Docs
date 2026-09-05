---
schema_version: '0.1'
type: wrangle
id: af2a5dcc-0ec0-48d7-8fb4-f58d9c5391d2
wrangle_name: threshold
namespace: select
title: Threshold
description: Select the first option if it exceeds a given threshold, else the second option.
wrangle_key: select.threshold
aliases: []
slug: select/threshold
status: active
visibility: public
tags:
  - select
  - threshold
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.threshold
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
    description: List of the input columns to select from.
    required: true
    param_group: I/O
    schema:
      type: array
  - name: output
    description: Name of the output column.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: threshold
    description: Threshold above which to choose the first option, otherwise the second.
    required: true
    param_group: Options
    schema:
      type: number
      minimum: 0
      maximum: 1
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.threshold implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/threshold.md
    title: Existing select.threshold Markdown
---

# Threshold

Select the first option if it exceeds a given threshold, else the second option.

## Migrated examples
#### Selecting Results Above a Threshold

##### Recipe

```yaml
wrangles:
  - select.threshold:
      input:
        - Col1
        - Col2
      output: Result
      threshold: .77
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| ['A', 0.6] | ['B', 0.79] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Result |
| --- |
| B |

</div>

</div>
