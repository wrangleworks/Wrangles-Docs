---
title: "To List"
description: "Take multiple columns and merge them to a list."
sidebar_label: "To List"
slug: "/merge/to-list"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# To List

Take multiple columns and merge them to a list.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `include_empty` | Whether to include empty columns in the created list. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - merge.to_list:
      input:
        - Col1
        - Col2
        - Col3
      output: List Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| List Col |
| --- |
| ['A', 'B', 'C'] |

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
| Recipe key | `merge.to_list` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.to_list` |

**Sources**

- [WranglesPY merge.to_list implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.to_list Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/to-list.md)

</details>
