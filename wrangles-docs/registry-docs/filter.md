---
title: "Filter"
description: "Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter."
sidebar_label: "Filter"
slug: "/filter"
---

# Filter

Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | No | string, integer, array | Name of the column to filter on. If multiple are provided, all must match the criteria. | `[]` |
| `equal` | No | string, array, null | Select rows where the values equal a given value. | `null` |
| `not_equal` | No | string, array, null | Select rows where the values do not equal a given value. | `null` |
| `is_in` | No | string, array, null | Select rows where the values are in a given list. | `null` |
| `not_in` | No | string, array, null | Select rows where the values are not in a given list. | `null` |
| `greater_than` | No | integer, number, null | Select rows where the values are greater than a specified value. Does include the value itself. | `null` |
| `greater_than_equal_to` | No | integer, number, null | Select rows where the values are greater than a specified value. Does include the value itself. | `null` |
| `less_than` | No | integer, number, null | Select rows where the values are less than a specified value. Does not include the value itself. | `null` |
| `less_than_equal_to` | No | integer, number, null | Select rows where the values are less than a specified value. Does include the value itself. | `null` |
| `between` | No | array, null | Value or list of values to filter that are in between two parameter values. | `null` |
| `contains` | No | string, null | Select rows where the input contains the value. Allows regular expressions. | `null` |
| `not_contains` | No | string, null | Select rows where the input does not contain the value. Allows regular expressions. | `null` |
| `is_null` | No | boolean, null | If true, select all rows where the value is NULL. If false, where is not NULL. | `null` |
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

## Provenance

- [WranglesPY filter implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing filter Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/filter.md)

## Registry metadata

- Registry ID: `e3242acf-d204-433f-8373-205b77481131`
- Namespace: root-level runtime key
- Recipe key: `filter`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.filter`
- Status: `active`
- Registry version: `0.1.0-pilot`
