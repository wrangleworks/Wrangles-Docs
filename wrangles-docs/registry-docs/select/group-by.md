---
title: "Group By"
description: "Group and aggregate the data."
sidebar_label: "Group By"
slug: "/select/group-by"
---

# Group By

Group and aggregate the data.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `by` | No | string, array | List of the input columns to group on. | `[]` |
| `auto_rename_columns` | No | boolean | If true (default), aggregated column names include the operation as a suffix (e.g. Value.sum). If false, column names are left as-is; use a dictionary entry to supply a custom output name (e.g. - Value: Total). | `true` |
| `list` | No | string, array | Group and return all values for these column(s) as a list. | — |
| `first` | No | string, array | The first value for these column(s). | — |
| `last` | No | string, array | The last value for these column(s). | — |
| `min` | No | string, array | The minimum value for these column(s). | — |
| `max` | No | string, array | The maximum value for these column(s). | — |
| `mean` | No | string, array | The mean (average) value for these column(s). | — |
| `median` | No | string, array | The median value for these column(s). | — |
| `nunique` | No | string, array | The count of unique values for these column(s). | — |
| `count` | No | string, array | The count of values for these column(s). | — |
| `counts` | No | string, array | Return a dictionary containing the count of each distinct value for these column(s). Keys are converted to JSON-safe strings; missing values use the key "null" and booleans use lowercase "true"/"false". | — |
| `std` | No | string, array | The standard deviation of values for these column(s). | — |
| `sum` | No | string, array | The total of values for these column(s). | — |
| `any` | No | string, array | Return true if any of the values for these column(s) are true. | — |
| `all` | No | string, array | Return true if all of the values for these column(s) are true. | — |
| `p75` | No | string, array | Get a percentile. Note, you can use any integer here for the corresponding percentile. | — |
| `custom.*` | No | string, array | Placeholder for custom functions. Replace 'placeholder' with the name of the function. | — |
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

## Provenance

- [WranglesPY select.group_by implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.group_by Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/group-by.md)

## Registry metadata

- Registry ID: `c0af10b1-423a-416c-8cb5-7e7fe1164964`
- Namespace: `select`
- Recipe key: `select.group_by`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.select.group_by`
- Status: `active`
- Registry version: `0.1.0-pilot`
