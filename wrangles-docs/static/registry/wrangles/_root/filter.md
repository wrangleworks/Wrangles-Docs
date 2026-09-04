---
schema_version: '0.1'
type: wrangle
id: e3242acf-d204-433f-8373-205b77481131
wrangle_name: filter
namespace: null
title: Filter
description: >-
  Filter the dataframe based on the contents. If multiple filters are specified, all must be
  correct. For complex filters, use the where parameter.
wrangle_key: filter
aliases: []
slug: filter
status: active
visibility: public
tags:
  - select
  - filter
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.filter
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
    description: Name of the column to filter on. If multiple are provided, all must match the criteria.
    required: false
    role: column-selector
    runtime_default: []
    schema:
      type:
        - string
        - integer
        - array
  - name: equal
    description: Select rows where the values equal a given value.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: not_equal
    description: Select rows where the values do not equal a given value.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: is_in
    description: Select rows where the values are in a given list.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: not_in
    description: Select rows where the values are not in a given list.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: greater_than
    description: >-
      Select rows where the values are greater than a specified value. Does include the value
      itself.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - integer
        - number
        - 'null'
  - name: greater_than_equal_to
    description: >-
      Select rows where the values are greater than a specified value. Does include the value
      itself.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - integer
        - number
        - 'null'
  - name: less_than
    description: >-
      Select rows where the values are less than a specified value. Does not include the value
      itself.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - integer
        - number
        - 'null'
  - name: less_than_equal_to
    description: Select rows where the values are less than a specified value. Does include the value itself.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - integer
        - number
        - 'null'
  - name: between
    description: Value or list of values to filter that are in between two parameter values.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - array
        - 'null'
  - name: contains
    description: Select rows where the input contains the value. Allows regular expressions.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: not_contains
    description: Select rows where the input does not contain the value. Allows regular expressions.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: is_null
    description: If true, select all rows where the value is NULL. If false, where is not NULL.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - boolean
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY filter implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/filter.md
    title: Existing filter Markdown
---

# Filter

Filter the dataframe based on the contents.

## Migrated examples
#### Filtering a Column

##### Recipe

```yaml
wrangles:
  # Select only red fruits
  - filter:
      input: Color
      equal:
        - red
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Color | Fruit |
| --- | --- |
| red | Apple |
| green | Apple |
| orange | Orange |
| red | Strawberry |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Color | Fruit |
| --- | --- |
| red | Apple |
| red | Strawberry |

</div>

</div>
