---
title: "Lists"
description: "Compare multiple lists and return the intersection, difference, or union."
sidebar_label: "Lists"
slug: "/compare/lists"
---

# Lists

Compare multiple lists and return the intersection, difference, or union.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of input columns containing lists to compare. | — |
| `output` | Yes | string | Name of the output column. | — |
| `method` | No | string; one of: intersection, difference, union | Type of comparison to perform. | `"intersection"` |
| `remove_duplicates` | No | boolean | Remove duplicates from the result. | `false` |
| `ignore_case` | No | boolean | Ignore case when comparing string items. | `false` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

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

## Provenance

- [WranglesPY compare.lists implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py)
- [Existing compare.lists Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/lists.md)

## Registry metadata

- Registry ID: `a393225e-7ccf-4708-83f8-d5abd6ba9b1e`
- Namespace: `compare`
- Recipe key: `compare.lists`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.compare.lists`
- Status: `active`
- Registry version: `0.1.0-pilot`
