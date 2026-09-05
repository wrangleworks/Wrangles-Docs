---
schema_version: '0.1'
type: wrangle
id: c0af10b1-423a-416c-8cb5-7e7fe1164964
wrangle_name: group_by
namespace: select
title: Group By
description: Group and aggregate the data.
wrangle_key: select.group_by
aliases: []
slug: select/group-by
status: active
visibility: public
tags:
  - select
  - group-by
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.group_by
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
  - name: by
    description: List of the input columns to group on.
    required: false
    param_group: I/O
    runtime_default: []
    schema:
      type:
        - string
        - array
  - name: auto_rename_columns
    description: >-
      If true (default), aggregated column names include the operation as a suffix (e.g. Value.sum).
      If false, column names are left as-is; use a dictionary entry to supply a custom output name
      (e.g. - Value: Total).
    required: false
    param_group: Formatting
    runtime_default: true
    schema:
      type: boolean
  - name: list
    description: Group and return all values for these column(s) as a list.
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: first
    description: The first value for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: last
    description: The last value for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: min
    description: The minimum value for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: max
    description: The maximum value for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: mean
    description: The mean (average) value for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: median
    description: The median value for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: nunique
    description: The count of unique values for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: count
    description: The count of values for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: counts
    description: >-
      Return a dictionary containing the count of each distinct value for these column(s). Keys are
      converted to JSON-safe strings; missing values use the key "null" and booleans use lowercase
      "true"/"false".
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: std
    description: The standard deviation of values for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: sum
    description: The total of values for these column(s).
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: any
    description: Return true if any of the values for these column(s) are true.
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: all
    description: Return true if all of the values for these column(s) are true.
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: p75
    description: Get a percentile. Note, you can use any integer here for the corresponding percentile.
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
  - name: custom.*
    name_pattern: ^custom\.[A-Za-z_][A-Za-z0-9_]*$
    description: Placeholder for custom functions. Replace 'placeholder' with the name of the function.
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.group_by implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/group-by.md
    title: Existing select.group_by Markdown
---

# Group By

Group and aggregate the data

## Migrated examples
#### Grouping By One Column

##### Recipe

```yaml
wrangles:
  - select.group_by:
      by:
        - Product Type
      sum: Quantity
      mean: Price ($)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product | Quantity | Price ($) | Product Type |
| --- | --- | --- | --- |
| Hammer | 3 | 12.99 | Hand Tools |
| Ratchet Wrench | 12 | 6.99 | Hand Tools |
| Cordless Drill | 2 | 49.99 | Power Tools |
| Reciprocating Saw | 7 | 29.99 | Power Tools |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Type | Quantity.sum | Price ($).mean |
| --- | --- | --- |
| Hand Tools | 15 | 9.99 |
| Power Tools | 9 | 39.99 |

</div>

</div>

#### Grouping With Custom Function Aggregation

##### Recipe

```yaml
wrangles:
  - select.group_by:
      by: Category
      custom.sum_times_two: Quantity
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Category | Quantity |
| --- | --- |
| Hand Tools | 3 |
| Hand Tools | 1 |
| Hand Tools | 2 |
| Power Tools | 4 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Category | Quantity.sum_times_two |
| --- | --- |
| Hand Tools | 12 |
| Power Tools | 4 |

</div>

</div>
