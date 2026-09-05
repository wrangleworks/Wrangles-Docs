---
title: "Pad"
description: "Pad a string to a fixed length."
sidebar_label: "Pad"
slug: "/format/pad"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Pad

Pad a string to a fixed length.

Pad a string to a fixed length

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `side` | Side from which to fill resulting string. | string | — | Yes |
| `skip_empty` | If true, skip padding for empty or whitespace-only values. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `pad_length` | Length for the output. | integer | — | Yes |
| `char` | The character to pad the input with. | string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - format.pad:
      input: Part Number
      pad_length: 5
      side: left
      char: "-"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part Number |
| --- |
| 0458 |
| 396 |
| 84 |
| 98516 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Part Number |
| --- |
| -0458 |
| --396 |
| ---84 |
| 98516 |

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
| Recipe key | `format.pad` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.pad` |

**Sources**

- [WranglesPY format.pad implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.pad Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/pad.md)

</details>
