---
schema_version: '0.1'
type: wrangle
id: 232e3ba0-4735-4934-88aa-0163181abb3f
wrangle_name: bins
namespace: create
title: Bins
description: Create a column that groups data into bins.
wrangle_key: create.bins
aliases: []
slug: create/bins
status: active
visibility: public
tags:
  - create
  - bins
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.create.bins
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
    description: Name of input column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of new column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
  - name: bins
    description: Defines the number of equal-width bins in the range.
    required: true
    param_group: Options
    schema:
      type:
        - integer
        - array
  - name: labels
    description: Labels for the returned bins.
    required: false
    param_group: Options
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
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py
    title: WranglesPY create.bins implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/bins.md
    title: Existing create.bins Markdown
---

# Bins

Creates a column that segments and sorts data values into bins. `bins` can be an integer or a list. When `bins` is an integer, the input data is split equally into that number of bins. When `bins` is a list, the input data is split based on the list boundaries.

## Migrated examples
#### Creating Bins With an Integer

##### Recipe

```yaml
wrangles:
  - create.bins:
      input: Data
      output: Category
      bins: 3
      labels:
        - Bad
        - Medium
        - Good
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Category |
| --- | --- |
| 1 | Bad |
| 7 | Good |
| 5 | Medium |
| 4 | Medium |
| 6 | Good |
| 3 | Bad |

</div>

</div>

#### Creating Bins With a List

##### Recipe

```yaml
wrangles:
  - create.bins:
      input: Grades
      output: Letter Grade
      bins:
        - 0
        - 60
        - 70
        - 80
        - 90
        - 100
      labels:
        - F
        - D
        - C
        - B
        - A
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Grade | Student |
| --- | --- |
| 64 | Charles |
| 92 | Sabrina |
| 76 | Edward |
| 84 | Wendy |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Grade | Student | Letter Grade |
| --- | --- | --- |
| 64 | Charles | D |
| 92 | Sabrina | A |
| 76 | Edward | C |
| 84 | Wendy | B |

</div>

</div>
