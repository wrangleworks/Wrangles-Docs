---
title: "Date Properties"
description: "Extract date properties from a date (day, month, year, etc...)."
sidebar_label: "Date Properties"
slug: "/extract/date-properties"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Date Properties

Extract date properties from a date (day, month, year, etc...).

Extract date properties from a date, such as day, month, year, weekday, or quarter.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output columns. | string, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `property` | Property to extract from date. | string; one of:<ul className="ww-param-enum-values"><li>day</li><li>day_of_year</li><li>month</li><li>month_name</li><li>weekday</li><li>week_day_name</li><li>week_year</li><li>quarter</li></ul> | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - extract.date_properties:
      input: Date
      output: Output
      property: month_name
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Date |
| --- |
| 1992-08-13 00:00:00 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output |
| --- |
| August |

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
| Recipe key | `extract.date_properties` |
| Lifecycle status | active |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.date_properties` |

**Sources**

- [WranglesPY extract.date_properties implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.date_properties Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/date-properties.md)

</details>
