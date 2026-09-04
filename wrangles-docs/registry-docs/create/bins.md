---
title: "Bins"
description: "Create a column that groups data into bins."
sidebar_label: "Bins"
slug: "/create/bins"
---

# Bins

Create a column that groups data into bins.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of input column. | — |
| `output` | Yes | string, array | Name of new column. | — |
| `bins` | Yes | integer, array | Defines the number of equal-width bins in the range. | — |
| `labels` | No | string, array, null | Labels for the returned bins. | `null` |
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

## Provenance

- [WranglesPY create.bins implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.bins Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/bins.md)

## Registry metadata

- Registry ID: `232e3ba0-4735-4934-88aa-0163181abb3f`
- Namespace: `create`
- Recipe key: `create.bins`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.create.bins`
- Status: `active`
- Registry version: `0.1.0-pilot`
