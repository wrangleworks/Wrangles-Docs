---
title: "Trim"
description: "Remove excess whitespace at the start and end of text."
sidebar_label: "Trim"
slug: "/format/trim"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Trim

Remove excess whitespace at the start and end of text.

Remove excess whitespace at the start and end of text. Can accept multiple columns.

:::note
Non-string values pass through unaltered.
:::

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - format.trim:
      input:
        - col1
      output: col1 trimmed
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| col1 |
| --- |
| `  Hello World  ` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| col1 | col1 trimmed |
| --- | --- |
| Hello World | Hello World |

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
| Catalog ID | `38` |
| Catalog key | `format.trim` |
| Recipe key | `format.trim` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.trim` |
| Legacy UUID | `af16b3c1-c230-4868-8ebe-f574904a0c76` |

**Sources**

- [WranglesPY format.trim implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Archived format.trim Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/trim.md)

</details>
