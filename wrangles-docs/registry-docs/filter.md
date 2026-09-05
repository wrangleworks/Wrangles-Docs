---
title: "Filter"
description: "Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter."
sidebar_label: "Filter"
slug: "/filter"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Filter

Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter.

Filter the dataframe based on the contents.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to filter on. If multiple are provided, all must match the criteria. | string, integer, array | `[]` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `equal` | Select rows where the values equal a given value. | string, array, null | `null` | No |
| `not_equal` | Select rows where the values do not equal a given value. | string, array, null | `null` | No |
| `is_in` | Select rows where the values are in a given list. | string, array, null | `null` | No |
| `not_in` | Select rows where the values are not in a given list. | string, array, null | `null` | No |
| `greater_than` | Select rows where the values are greater than a specified value. Does include the value itself. | integer, number, null | `null` | No |
| `greater_than_equal_to` | Select rows where the values are greater than a specified value. Does include the value itself. | integer, number, null | `null` | No |
| `less_than` | Select rows where the values are less than a specified value. Does not include the value itself. | integer, number, null | `null` | No |
| `less_than_equal_to` | Select rows where the values are less than a specified value. Does include the value itself. | integer, number, null | `null` | No |
| `between` | Value or list of values to filter that are in between two parameter values. | array, null | `null` | No |
| `contains` | Select rows where the input contains the value. Allows regular expressions. | string, null | `null` | No |
| `not_contains` | Select rows where the input does not contain the value. Allows regular expressions. | string, null | `null` | No |
| `is_null` | If true, select all rows where the value is NULL. If false, where is not NULL. | boolean, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  # Select only red fruits
  - filter:
      input: Color
      equal:
        - red
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Color | Fruit |
| --- | --- |
| red | Apple |
| green | Apple |
| orange | Orange |
| red | Strawberry |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Color | Fruit |
| --- | --- |
| red | Apple |
| red | Strawberry |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | `filter` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.filter` |

**Sources**

- [WranglesPY filter implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing filter Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/filter.md)

</details>
