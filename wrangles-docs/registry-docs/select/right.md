---
title: "Right"
description: "Return characters from the right of text. Strings shorter than the length defined will be unaffected."
sidebar_label: "Right"
slug: "/select/right"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Right

Return characters from the right of text. Strings shorter than the length defined will be unaffected.

Select characters from the right of the input. Using a negative length reverses the side of selection, selecting from the left.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to edit. | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `length` | Number of characters to include from the right. If negative, this will remove the specified number of characters from the right. May not equal 0. | integer | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - select.right:
      input: Column
      output: Result
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| ing |

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
| Recipe key | `select.right` |
| Lifecycle status | active |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.right` |

**Sources**

- [WranglesPY select.right implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.right Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/right.md)

</details>
