---
title: "Round"
description: "Round column(s) to the specified decimals."
sidebar_label: "Round"
slug: "/round"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Round

Round column(s) to the specified decimals.

Round numbers in a column to the nearest decimal point of your choosing.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column(s). | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `decimals` | Number of decimal places to round column. | integer | `0` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - round:
      input: Cost Per Unit
      output: Cost Rounded
      decimals: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Cost Per Unit |
| --- |
| 3.14159 |
| 2.71828 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Cost Rounded |
| --- |
| 3.14 |
| 2.72 |

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
| Recipe key | `round` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.round` |

**Sources**

- [WranglesPY round implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing round Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/round.md)

</details>
