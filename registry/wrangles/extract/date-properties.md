---
schema_version: '0.1'
type: wrangle
id: a346de62-93cd-44ba-8d30-a6305629c6d7
wrangle_name: date_properties
namespace: extract
title: Date Properties
description: Extract date properties from a date (day, month, year, etc...).
wrangle_key: extract.date_properties
aliases: []
slug: extract/date-properties
status: active
visibility: public
tags:
  - extract
  - date-properties
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.date_properties
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
  - name: property
    description: Property to extract from date.
    required: true
    role: option
    schema:
      type: string
      enum:
        - day
        - day_of_year
        - month
        - month_name
        - weekday
        - week_day_name
        - week_year
        - quarter
  - name: output
    description: Name of the output columns.
    required: false
    role: column-output
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.date_properties implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/date-properties.md
    title: Existing extract.date_properties Markdown
---

# Date Properties

Extract date properties from a date, such as day, month, year, weekday, or quarter.

## Migrated examples
#### Extracting Month From Date

##### Recipe

```yaml
wrangles:
  - extract.date_properties:
      input: Date
      output: Output
      property: month_name
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Date | Output |
| --- | --- |
| 1992-08-13 00:00:00 | August |

</div>

</div>
