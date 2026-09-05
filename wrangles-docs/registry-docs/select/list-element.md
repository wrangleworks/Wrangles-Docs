---
title: "List Element"
description: "Select a numbered element of a list (zero indexed)."
sidebar_label: "List Element"
slug: "/select/list-element"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# List Element

Select a numbered element of a list (zero indexed).



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `element` | The numbered element of the list to select. Starts from zero. This may use python slicing syntax to select a subset of the list. | integer | `0` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Set the default value to return if the specified element doesn't exist. | string, number, array, object, boolean, null | `""` | No |

</div>

## Examples

```yaml
wrangles:
  - select.list_element:
      input: Col1
      output: Second Element
      element: 2 # Zero indexed
      default: F
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 |
| --- |
| ['A', 'B', 'C'] |
| ['D', 'E'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Third Element |
| --- |
| C |
| F |

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
| Recipe key | `select.list_element` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.list_element` |

**Sources**

- [WranglesPY select.list_element implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.list_element Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/list-element.md)

</details>
