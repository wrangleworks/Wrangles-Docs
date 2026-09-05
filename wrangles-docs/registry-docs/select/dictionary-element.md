---
title: "Dictionary Element"
description: "Select one or more element of a dictionary."
sidebar_label: "Dictionary Element"
slug: "/select/dictionary-element"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Dictionary Element

Select one or more element of a dictionary.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If omitted, the input column will be replaced. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `element` | The key or keys from the dictionary to select. If a single key is provided, the value will be returned If a lists of keys are selected, the result will be a new dictionary. | string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Set the default value to return if the specified element doesn't exist. If selecting multiple elements, a dict of defaults can be set. | string, number, array, object, boolean, null | `""` | No |

</div>

## Examples

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Shapes
      element: shapes
      default: square
      where: Part Number = 1234
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Properties | Part Number |
| --- | --- |
| \{'colours': ['red', 'white', 'blue'], 'shapes': 'round', 'materials': 'tungsten'\} | 1234 |
| \{'colours': ['green', 'yellow', 'orange'], 'shapes': 'square', 'materials': 'tungsten'\} | 5678 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Shapes |
| --- |
| round |
|  |

</div>

</div>





```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      element:
        - shapes
        - materials
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Properties |
| --- |
| \{'colours': ['red', 'white', 'blue'], 'shapes': 'round', 'materials': 'tungsten'\} |
| \{'colours': ['green', 'yellow', 'orange'], 'shapes': 'square', 'materials': 'tungsten'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Properties |
| --- |
| \{'shapes': 'round', 'materials': 'tungsten'\} |
| \{'shapes': 'square', 'materials': 'tungsten'\} |

</div>

</div>





```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - Col*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Other3': 'C'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Col1': 'A', 'Col2': 'B'\} |

</div>

</div>





```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - "regex: .*2"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output Dict |
| --- |
| \{'Col2': 'B'\} |

</div>

</div>





```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
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

| Output Dict |
| --- |
| \{'Column 1': 'A', 'Column 2': 'B'\} |

</div>

</div>





```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - Col1
        - Col3
      default:
        Col1: Z
        Col3: Y
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |
| \{'Col1': 'D', 'Col2': 'E'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output Dict |
| --- |
| \{'Col1': 'A', 'Col3': 'C'\} |
| \{'Col1': 'D', 'Col3': 'Y'\} |

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
| Recipe key | `select.dictionary_element` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.dictionary_element` |

**Sources**

- [WranglesPY select.dictionary_element implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.dictionary_element Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/dictionary-element.md)

</details>
