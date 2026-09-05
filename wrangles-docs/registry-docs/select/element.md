---
title: "Element"
description: "Select elements of lists or dicts using python syntax like col[0]['key']."
sidebar_label: "Element"
slug: "/select/element"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Element

Select elements of lists or dicts using python syntax like col[0]['key'].

Select elements of lists or dictionaries using Python syntax like `col[1:3]['key']`.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column and sub elements This permits by index for lists or dict and by key for dicts e.g. col[0]['key'] // [&#123;"key":"val"&#125;] -&gt; "val". | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Set the default value to return if the specified element doesn't exist. | string, number, array, object, boolean, null | `null` | No |

</div>

## Examples

```yaml
wrangles:
  - select.element:
      input: Column A[0]
      output: First Element
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column A |
| --- |
| [A, 0.9] |
| [B, 0.8] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| First Element |
| --- |
| A |
| B |

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
| Recipe key | `select.element` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.element` |

**Sources**

- [WranglesPY select.element implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.element Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/element.md)

</details>
