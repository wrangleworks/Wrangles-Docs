---
title: "Prefix"
description: "Add a prefix to a column."
sidebar_label: "Prefix"
slug: "/format/prefix"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Prefix

Add a prefix to a column.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | (Optional) Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `value` | Prefix value to add. | string, integer, number | — | Yes |
| `skip_empty` | Whether to skip empty values. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - format.prefix:
      input: Data
      output: Prefix
      value: anti
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Data |
| --- |
| freeze |
| dote |
| hero |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Prefix |
| --- |
| antifreeze |
| antidote |
| antihero |

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
| Recipe key | `format.prefix` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.prefix` |

**Sources**

- [WranglesPY format.prefix implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.prefix Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/prefix.md)

</details>
