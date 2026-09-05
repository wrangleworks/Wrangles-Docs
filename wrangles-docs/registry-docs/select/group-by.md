---
title: "Group By"
description: "Group and aggregate the data."
sidebar_label: "Group By"
slug: "/select/group-by"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Group By

Group and aggregate the data.

Group and aggregate the data

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `by` | List of the input columns to group on. | string, array | `[]` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `list` | Group and return all values for these column(s) as a list. | string, array | — | No |
| `first` | The first value for these column(s). | string, array | — | No |
| `last` | The last value for these column(s). | string, array | — | No |
| `min` | The minimum value for these column(s). | string, array | — | No |
| `max` | The maximum value for these column(s). | string, array | — | No |
| `mean` | The mean (average) value for these column(s). | string, array | — | No |
| `median` | The median value for these column(s). | string, array | — | No |
| `nunique` | The count of unique values for these column(s). | string, array | — | No |
| `count` | The count of values for these column(s). | string, array | — | No |
| `counts` | Return a dictionary containing the count of each distinct value for these column(s). Keys are converted to JSON-safe strings; missing values use the key "null" and booleans use lowercase "true"/"false". | string, array | — | No |
| `std` | The standard deviation of values for these column(s). | string, array | — | No |
| `sum` | The total of values for these column(s). | string, array | — | No |
| `any` | Return true if any of the values for these column(s) are true. | string, array | — | No |
| `all` | Return true if all of the values for these column(s) are true. | string, array | — | No |
| `p75` | Get a percentile. Note, you can use any integer here for the corresponding percentile. | string, array | — | No |
| `custom.*` | Placeholder for custom functions. Replace 'placeholder' with the name of the function. | string, array | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `auto_rename_columns` | If true (default), aggregated column names include the operation as a suffix (e.g. Value.sum). If false, column names are left as-is; use a dictionary entry to supply a custom output name (e.g. - Value: Total). | boolean | `true` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - select.group_by:
      by:
        - Product Type
      sum: Quantity
      mean: Price ($)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Quantity | Price ($) | Product Type |
| --- | --- | --- | --- |
| Hammer | 3 | 12.99 | Hand Tools |
| Ratchet Wrench | 12 | 6.99 | Hand Tools |
| Cordless Drill | 2 | 49.99 | Power Tools |
| Reciprocating Saw | 7 | 29.99 | Power Tools |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Type | Quantity.sum | Price ($).mean |
| --- | --- | --- |
| Hand Tools | 15 | 9.99 |
| Power Tools | 9 | 39.99 |

</div>

</div>





```yaml
wrangles:
  - select.group_by:
      by: Category
      custom.sum_times_two: Quantity
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Category | Quantity |
| --- | --- |
| Hand Tools | 3 |
| Hand Tools | 1 |
| Hand Tools | 2 |
| Power Tools | 4 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Category | Quantity.sum_times_two |
| --- | --- |
| Hand Tools | 12 |
| Power Tools | 4 |

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
| Recipe key | `select.group_by` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.group_by` |

**Sources**

- [WranglesPY select.group_by implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.group_by Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/group-by.md)

</details>
