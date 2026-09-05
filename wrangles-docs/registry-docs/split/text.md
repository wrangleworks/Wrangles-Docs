---
title: "Text"
description: "Split a string to multiple columns or a list."
sidebar_label: "Text"
slug: "/split/text"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Text

Split a string to multiple columns or a list.

Split text strings on certain characters. The text can be split into either multiple columns or a list.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to be split. | string | — | Yes |
| `output` | Name of the output column(s) If a single column is provided, the results will be returned as a list If multiple columns are listed, the results will be separated into the columns. If omitted, will overwrite the input. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `char` | Set the character(s) to split on. Default comma (,) Can also prefix with "regex:" to split on a pattern. | string | `","` | No |
| `element` | Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:", "2:8:2". | string, integer, null | `null` | No |
| `inclusive` | If true, include the split character in the output. Default False. | boolean | `false` | No |
| `skip_empty` | Whether to skip empty values. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `pad` | Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists. | boolean, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - split.text:
      input: Column1
      output: Column2
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column1 |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Column2 |
| --- |
| ['Hello', 'Wrangles!'] |

</div>

</div>





```yaml
# Split on x, case insensitive.
wrangles:
  - split.text:
      input: Col1
      output: Col2
      char: 'regex:(?i)x'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 |
| --- |
| 1x2 |
| 1X2 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Col2 |
| --- |
| ['1', '2'] |
| ['1', '2'] |

</div>

</div>





```yaml
wrangles:
  - split.text:
      input: Column1
      output: Column2
      char: ', '
      element: 0
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column1 |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Column2 |
| --- |
| Hello |

</div>

</div>





```yaml
wrangles:
  - split.text:
      input: Col
      output: Col*              # Optional
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Col1 | Col2 |
| --- | --- |
| Hello | Wrangles! |

</div>

</div>





```yaml
wrangles:
  - split.text:
      input: Col
      output:
        - Col 1
        - Col 2
        - Col 3
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col |
| --- |
| Wrangles, are, Cool! |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Col 1 | Col 2 | Col 3 |
| --- | --- | --- |
| Wrangles | are | Cool! |

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
| Recipe key | `split.text` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.text` |

**Sources**

- [WranglesPY split.text implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.text Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/text.md)

</details>
