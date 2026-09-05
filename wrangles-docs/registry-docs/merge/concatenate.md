---
title: "Concatenate"
description: "Concatenate a list of columns or a list within a single column."
sidebar_label: "Concatenate"
slug: "/merge/concatenate"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Concatenate

Concatenate a list of columns or a list within a single column.

If the input is a list of columns, concatenate multiple columns into one as a delimited string. If the input is a single column, concatenate a list within that column into a delimited string.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Either a single column name or list of columns. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `skip_empty` | Whether to skip empty values, defaults to false. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `char` | (Optional) Character to add between successive values. | string | `","` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
# Using concatenate to combine multiple columns
wrangles:
  - merge.concatenate:
      input:
        - Col1
        - Col2
        - Col3
      output: Join Col
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Join Col |
| --- |
| A, B, C |

</div>

</div>





```yaml
# Using concatenate to join a column that is a list
wrangles:
  - merge.concatenate:
      input: Col1
      output: Join List
      char: ' '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Join List |
| --- |
| A B C |

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
| Recipe key | `merge.concatenate` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.concatenate` |

**Sources**

- [WranglesPY merge.concatenate implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.concatenate Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/concatenate.md)

</details>
