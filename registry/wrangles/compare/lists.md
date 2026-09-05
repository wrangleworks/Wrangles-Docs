---
schema_version: '0.1'
type: wrangle
id: a393225e-7ccf-4708-83f8-d5abd6ba9b1e
wrangle_name: lists
namespace: compare
title: Lists
description: Compare multiple lists and return the intersection, difference, or union.
wrangle_key: compare.lists
aliases: []
slug: compare/lists
status: active
visibility: public
tags:
  - compare
  - lists
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.compare.lists
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
    description: List of input columns containing lists to compare.
    required: true
    role: column-selector
    schema:
      type: array
  - name: output
    description: Name of the output column.
    required: true
    role: column-output
    schema:
      type: string
  - name: method
    description: Type of comparison to perform.
    required: false
    role: option
    runtime_default: intersection
    schema:
      type: string
      enum:
        - intersection
        - difference
        - union
  - name: remove_duplicates
    description: Remove duplicates from the result.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
  - name: ignore_case
    description: Ignore case when comparing string items.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py
    title: WranglesPY compare.lists implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/lists.md
    title: Existing compare.lists Markdown
---

# Lists

Compare multiple lists and return the intersection, difference, or union.

## Migrated examples
#### Comparing the difference between two columns of lists

##### Recipe

```yaml
wrangles:
  - compare.lists:
      input:
        - col1
        - col2
      output: Difference
      method: difference
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| [A, B, C] | [C, D, E] |
| [H, I, J, K] | [H, I, J] |
| [X, Y, Z] | [1, 2, 3] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Difference |
| --- |
| [A, B] |
| [K] |
| [X, Y, Z] |

</div>

</div>

#### Comparing the intersection between two columns of lists

##### Recipe

```yaml
wrangles:
  - compare.lists:
      input:
        - col1
        - col2
      output: Intersection
      method: intersection
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| [A, B, C] | [C, D, E] |
| [H, I, J, K] | [H, I, J] |
| [X, Y, Z] | [1, 2, 3] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Intersection |
| --- |
| [C] |
| [H, I, J] |
| [] |

</div>

</div>

#### Comparing the union between two columns of lists

##### Recipe

```yaml
wrangles:
  - compare.lists:
      input:
        - col1
        - col2
      output: Union
      method: union
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| [A, B, C] | [C, D, E] |
| [H, I, J, K] | [H, I, J] |
| [X, Y, Z] | [1, 2, 3] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Union |
| --- |
| [A, B, C, D, E] |
| [H, I, J, K] |
| [X, Y, Z, 1, 2, 3] |

</div>

</div>
