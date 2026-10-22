---
schema_version: '0.2'
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
recipe_writer:
  eligible: true
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
    description: List of the input columns to group on
    required: false
    param_group: I/O
    runtime_default: []
    schema:
      type:
        - string
        - array
      description: List of the input columns to group on
    runtime_required: false
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
      description: >-
        If true (default), aggregated column names include the operation as a suffix (e.g.
        Value.sum). If false, column names are left as-is; use a dictionary entry to supply a custom
        output name (e.g. - Value: Total).
    runtime_required: false
  - name: list
    description: Group and return all values for these column(s) as a list
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: Group and return all values for these column(s) as a list
    runtime_required: false
  - name: first
    description: The first value for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The first value for these column(s)
    runtime_required: false
  - name: last
    description: The last value for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The last value for these column(s)
    runtime_required: false
  - name: min
    description: The minimum value for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The minimum value for these column(s)
    runtime_required: false
  - name: max
    description: The maximum value for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The maximum value for these column(s)
    runtime_required: false
  - name: mean
    description: The mean (average) value for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The mean (average) value for these column(s)
    runtime_required: false
  - name: median
    description: The median value for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The median value for these column(s)
    runtime_required: false
  - name: nunique
    description: The count of unique values for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The count of unique values for these column(s)
    runtime_required: false
  - name: count
    description: The count of values for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The count of values for these column(s)
    runtime_required: false
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
      description: >-
        Return a dictionary containing the count of each distinct value for these column(s). Keys
        are converted to JSON-safe strings; missing values use the key "null" and booleans use
        lowercase "true"/"false".
    runtime_required: false
  - name: std
    description: The standard deviation of values for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The standard deviation of values for these column(s)
    runtime_required: false
  - name: sum
    description: The total of values for these column(s)
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: The total of values for these column(s)
    runtime_required: false
  - name: any
    description: Return true if any of the values for these column(s) are true
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: Return true if any of the values for these column(s) are true
    runtime_required: false
  - name: all
    description: Return true if all of the values for these column(s) are true
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: Return true if all of the values for these column(s) are true
    runtime_required: false
  - name: p75
    description: Get a percentile. Note, you can use any integer here for the corresponding percentile.
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: Get a percentile. Note, you can use any integer here for the corresponding percentile.
    runtime_required: false
  - name: custom.*
    name_pattern: ^custom\.[A-Za-z_][A-Za-z0-9_]*$
    description: Placeholder for custom functions. Replace 'placeholder' with the name of the function.
    required: false
    param_group: Options
    schema:
      type:
        - string
        - array
      description: Placeholder for custom functions. Replace 'placeholder' with the name of the function.
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.group_by implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/group-by.md
    title: Archived select.group_by Markdown
configuration_schema:
  type: object
  description: Group and aggregate the data
  properties:
    by:
      type:
        - string
        - array
      description: List of the input columns to group on
    list:
      type:
        - string
        - array
      description: Group and return all values for these column(s) as a list
    first:
      type:
        - string
        - array
      description: The first value for these column(s)
    last:
      type:
        - string
        - array
      description: The last value for these column(s)
    min:
      type:
        - string
        - array
      description: The minimum value for these column(s)
    max:
      type:
        - string
        - array
      description: The maximum value for these column(s)
    mean:
      type:
        - string
        - array
      description: The mean (average) value for these column(s)
    median:
      type:
        - string
        - array
      description: The median value for these column(s)
    nunique:
      type:
        - string
        - array
      description: The count of unique values for these column(s)
    count:
      type:
        - string
        - array
      description: The count of values for these column(s)
    counts:
      type:
        - string
        - array
      description: >-
        Return a dictionary containing the count of each distinct value for these column(s). Keys
        are converted to JSON-safe strings; missing values use the key "null" and booleans use
        lowercase "true"/"false".
    std:
      type:
        - string
        - array
      description: The standard deviation of values for these column(s)
    sum:
      type:
        - string
        - array
      description: The total of values for these column(s)
    any:
      type:
        - string
        - array
      description: Return true if any of the values for these column(s) are true
    all:
      type:
        - string
        - array
      description: Return true if all of the values for these column(s) are true
    p75:
      type:
        - string
        - array
      description: Get a percentile. Note, you can use any integer here for the corresponding percentile.
    custom.placeholder:
      type:
        - string
        - array
      description: Placeholder for custom functions. Replace 'placeholder' with the name of the function.
    auto_rename_columns:
      type: boolean
      description: >-
        If true (default), aggregated column names include the operation as a suffix (e.g.
        Value.sum). If false, column names are left as-is; use a dictionary entry to supply a custom
        output name (e.g. - Value: Total).
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where_special'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
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

The interactive runner loads `sum_times_two` from `customFunctions.py`:

```python
def sum_times_two(values):
    return sum(values) * 2
```

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
| Power Tools | 8 |

</div>

</div>
