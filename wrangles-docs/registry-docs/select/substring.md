---
title: "Substring"
description: "Return characters from the middle of text."
sidebar_label: "Substring"
slug: "/select/substring"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Substring

Return characters from the middle of text.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to edit. | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `start` | The position of the first character to select. If ommited will start from the beginning and length must be provided. | integer, null | `null` | No |
| `length` | The length of the string to select. If ommited will select to the end of the string and start must be provided. | integer, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
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
| udd |

</div>

</div>





```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
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
| udding |

</div>

</div>





```yaml
wrangles:
  - select.substring:
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
| pud |

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
| Recipe key | `select.substring` |
| Lifecycle status | active |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.substring` |

**Sources**

- [WranglesPY select.substring implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.substring Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/substring.md)

</details>
