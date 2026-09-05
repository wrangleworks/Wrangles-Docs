---
title: "Columns"
description: "Select columns from the dataframe."
sidebar_label: "Columns"
slug: "/select/columns"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Columns

Select columns from the dataframe.

Select columns from the dataframe

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to select. | string, integer, array | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - select.columns:
      input: Manufacturer
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part Number | Manufacturer |
| --- | --- |
| 1234 | SKF |
| 5678 | Timken |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Manufacturer |
| --- |
| SKF |
| Timken |

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
| Recipe key | `select.columns` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.columns` |

**Sources**

- [WranglesPY select.columns implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.columns Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/columns.md)

</details>
