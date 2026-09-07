---
schema_version: '0.2'
type: wrangle
id: 9cebfa6f-a524-4aec-84a7-02d77b792843
wrangle_name: date_range
namespace: extract
title: Date Range
description: Extract date range frequency from two dates.
wrangle_key: extract.date_range
aliases: []
slug: extract/date-range
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - extract
  - date-range
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.date_range
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
  - name: start_time
    description: Name of the start date column.
    required: true
    param_group: I/O
    column_semantics:
      role: reference
      cardinality: scalar
    schema:
      type: string
  - name: end_time
    description: Name of the end date column.
    required: true
    param_group: I/O
    column_semantics:
      role: reference
      cardinality: scalar
    schema:
      type: string
  - name: output
    description: Name of the output column.
    required: true
    param_group: I/O
    column_semantics:
      role: destination
      cardinality: scalar
    schema:
      type: string
  - name: range
    description: Type of frequency to count.
    required: false
    param_group: Options
    runtime_default: day
    schema:
      type: string
      enum:
        - business days
        - days
        - weeks
        - months
        - semi months
        - business month ends
        - month starts
        - semi month starts
        - business month starts
        - quarters
        - quarter starts
        - years
        - business hours
        - hours
        - minutes
        - seconds
        - milliseconds
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.date_range implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/date-range.md
    title: Existing extract.date_range Markdown
---

# Date Range

Extract date range frequency from two dates.

## Migrated examples
#### Extracting Number of Months From Range

##### Recipe

```yaml
wrangles:
  - extract.date_range:
      start_time: Start
      end_time: End
      output: Output
      range: months
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| End | Start | Output |
| --- | --- | --- |
| 2023-08-13 00:00:00 | 1992-08-13 00:00:00 | 371 |

</div>

</div>
