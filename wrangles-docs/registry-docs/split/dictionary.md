---
title: "Dictionary"
description: "Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned."
sidebar_label: "Dictionary"
slug: "/split/dictionary"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Dictionary

Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned.

Split a dictionary into columns. The dictionary keys are used as the new column headers.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or lists of the column(s) containing dictionaries to be split. If providing multiple dictionaries and the dictionaries contain overlapping values, the last value will be returned. | string, integer, array | — | Yes |
| `output` | In columns output_format, this is an optional subset of keys to extract from the dictionary. If not provided, all keys will be returned. Columns can be renamed with the following syntax: output: - key1: new_column_name1 - key2: new_column_name2 In to_lists output_format, this must be two output columns for the keys and values lists. If not provided, Keys and Values will be used. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | How to split the dictionary. columns creates one output column for each dictionary key. to_lists creates two output columns containing lists of keys and values. | string; one of:<ul className="ww-param-enum-values"><li>columns</li><li>to_lists</li></ul> | `"columns"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Provide a set of default headings and values if they are not found within the input. | object, null | `null` | No |

</div>

## Examples

```yaml
wrangles:
  - split.dictionary:
      input: Column
      # Output not required
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

</div>





```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: Col2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Col2 |
| --- |
| B |

</div>

</div>





```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: Col*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Other': 'C'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Col1 | Col2 |
| --- | --- |
| A | B |

</div>

</div>





```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: "regex: .*3"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Col3 |
| --- |
| C |

</div>

</div>





```yaml
wrangles:
  - split.dictionary:
      input: Column
      output:
        - Col1: Column 1
        - Col2: Column 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Column 1 | Column 2 |
| --- | --- |
| A | B |

</div>

</div>





```yaml
wrangles:
  - split.dictionary:
      input: Column
      output:
        - Col*: Column *
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| A | B | C |

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
| Recipe key | `split.dictionary` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.dictionary` |

**Sources**

- [WranglesPY split.dictionary implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.dictionary Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/dictionary.md)

</details>
