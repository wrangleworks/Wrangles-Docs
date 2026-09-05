---
title: "Try"
description: "Try a list of wrangles and catch any errors that occur."
sidebar_label: "Try"
slug: "/try"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Try

Try a list of wrangles and catch any errors that occur.

Run a list of wrangles and catch errors. When `except` is provided, its wrangles or fallback column values run after an error; otherwise, the error is logged and the recipe continues.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | List of wrangles to apply. | array | — | Yes |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Number of times to retry the wrangles if an error occurs. Default 0. | integer | `0` | No |
| `except` | An action to take if the wrangles encounter an error. This can contain a list of wrangles or a dictionary of column names and values. If except is not provided, the error will be logged and the recipe will continue. | object | — | No |

</div>

## Examples

```yaml
wrangles:
  - try:
      wrangles:
        - risky_wrangle:
            input: column
      except:
        - backup_wrangle:
            input: column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_The input dataframe is passed to the primary wrangles._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_The primary result is returned on success; the `except` result is returned after an error._

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
| Recipe key | `try` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.Try` |

**Sources**

- [WranglesPY try implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing try Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/try.md)

</details>
