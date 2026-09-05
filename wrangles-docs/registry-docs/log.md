---
title: "Log"
description: "Log the current status of the dataframe."
sidebar_label: "Log"
slug: "/log"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Log

Log the current status of the dataframe.

Print the current status of the dataframe. Only a sample of rows is logged.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `columns` | (Optional, default all columns) List of specific columns to log. | array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `write` | (Optional) Allows for an intermediate output to a file/dataframe/database etc. | array, null | `null` | No |
| `warning` | Log a warning to the console. | string, null | `null` | No |
| `info` | Log info to the console. | string, null | `null` | No |
| `log_data` | Whether to log a sample of the contents of the dataframe. Default True if not logging to a write, error, warning or info. Default False otherwise. | boolean, null | `null` | No |
| `error` | Log an error to the console. | string | — | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - log: {}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_Logs a sample of rows or status information to the configured destination._

</div>

</div>





```yaml
wrangles:
  - log:
      columns:
        - column1
        - column2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_Logs a sample of rows or status information to the configured destination._

</div>

</div>





```yaml
wrangles:
  - log:
      write:
        - file:
            name: output/filepath
            columns:
              - column 1
              - column 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_Logs a sample of rows or status information to the configured destination._

</div>

</div>



| Variable | Function |
| --- | --- |
| `${column_count}` | Number of columns. |
| `${columns}` | List of all columns. |
| `${df}` | Current dataframe. |
| `${row_count}` | Number of visible rows processed in each batch. |

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
| Recipe key | `log` |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Operational logging steps are not authored in the baseline. |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.log` |

**Sources**

- [WranglesPY log implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing log Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/log.md)

</details>
