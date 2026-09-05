---
title: "Brackets"
description: "Extract text properties in brackets from the input."
sidebar_label: "Brackets"
slug: "/extract/brackets"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Brackets

Extract text properties in brackets from the input.

Extract text in brackets from the input.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output columns. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | (Optional) The type of brackets to find (round '()', square '[]', curly '&#123;&#125;', angled '&lt;&gt;'). Default is all brackets. | string, array | `"all"` | No |
| `include_brackets` | (Optional) Include the brackets in the output. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | Format of the extract output. | string, null; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate. | string | `", "` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - extract.brackets:
      input: Data
      output: Output
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Data |
| --- |
| `{Hello}` |
| `[Wrangles]` |
| `(!)` |
| `<!>` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output |
| --- |
| Hello |
| Wrangles |
| ! |
| ! |

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
| Recipe key | `extract.brackets` |
| Lifecycle status | active |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.brackets` |

**Sources**

- [WranglesPY extract.brackets implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.brackets Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/brackets.md)

</details>
