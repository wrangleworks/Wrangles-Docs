---
schema_version: '0.1'
type: wrangle
id: 19cfeb4f-02af-4ab2-895c-0ff2bb5cce19
wrangle_name: date_calculator
namespace: null
title: Date Calculator
description: Add or Subtract time from a date.
wrangle_key: date_calculator
aliases: []
slug: date-calculator
status: active
visibility: public
tags:
  - date
  - date-calculator
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.date_calculator
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
    description: Name of the dates column.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: operation
    description: Date operation.
    required: false
    param_group: Options
    runtime_default: add
    schema:
      type: string
      enum:
        - add
        - subtract
  - name: output
    description: Name of the output column of dates.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: time_unit
    description: Time unit for operation.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - years
        - months
        - weeks
        - days
        - hours
        - minutes
        - seconds
        - milliseconds
  - name: time_value
    description: Time unit value for operation.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - number
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY date_calculator implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/date/_sources/date-calculator.md
    title: Existing date_calculator Markdown
---

# Date Calculator

Add or subtract time from a date.

## Migrated examples
#### Calculating a Future Date

##### Recipe

```yaml
wrangles:
   - date_calculator:
      input: Date
      output: New Date
      operation: subtract  # Optional default is addition
      time_unit: days
      time_value: 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Date |
| --- |
| 2022-12-26 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| New Date |
| --- |
| 2022-12-25 |

</div>

</div>
