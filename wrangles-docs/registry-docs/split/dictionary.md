---
title: "Dictionary"
description: "Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned."
sidebar_label: "Dictionary"
slug: "/split/dictionary"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Dictionary <CopyableCode value="split.dictionary" />

Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned.

Split a dictionary into columns. The dictionary keys are used as the new column headers.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of columns containing dictionaries or JSON object strings to split.<br />For overlapping keys, later input columns take precedence<br />before defaults are applied. | string, integer, array | — | Yes |
| `output` | In columns output_format, this is an optional subset of keys to extract<br />from the dictionary. If not provided, all keys will be returned.<br />Columns can be renamed with the following syntax:<br />output:<br />  - key1: new_column_name1<br />  - key2: new_column_name2<br />In to_lists output_format, this must be two output columns for the keys<br />and values lists. If not provided, Keys and Values will be used. | string, array | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | How to split the dictionary.<br />columns creates one output column for each dictionary key.<br />In recipes, remaining null cells are normalized to empty strings.<br />to_lists creates two output columns containing lists of keys and values.<br />Remaining null values inside these lists are preserved. | string; one of:<ul className="ww-param-enum-values"><li>columns</li><li>to_lists</li></ul> | `"columns"` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Provide defaults for missing top-level keys or keys with null values after merging the input dictionaries. Keys use their original names before output renaming. Non-null values, including 0, false, empty strings, lists, and dictionaries, are preserved. Nested values are not filled recursively. When default is supplied (including &#123;&#125;), invalid or non-dictionary input cells are treated as empty dictionaries, so valid values from other input columns are retained. Without default, invalid input raises an error. | object | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Split one or more dictionaries into columns.\nThe dictionary keys will be returned as the new column headers.\nDictionary keys are case-sensitive. With multiple input columns,\nlater dictionaries overwrite earlier keys before defaults are applied.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of columns containing dictionaries or JSON object strings to split.\nFor overlapping keys, later input columns take precedence\nbefore defaults are applied."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "In columns output_format, this is an optional subset of keys to extract\nfrom the dictionary. If not provided, all keys will be returned.\nColumns can be renamed with the following syntax:\noutput:\n  - key1: new_column_name1\n  - key2: new_column_name2\nIn to_lists output_format, this must be two output columns for the keys\nand values lists. If not provided, Keys and Values will be used."
    },
    "default": {
      "type": "object",
      "description": "Provide defaults for missing top-level keys or keys with null values after merging the input dictionaries. Keys use their original names before output renaming. Non-null values, including 0, false, empty strings, lists, and dictionaries, are preserved. Nested values are not filled recursively. When default is supplied (including {}), invalid or non-dictionary input cells are treated as empty dictionaries, so valid values from other input columns are retained. Without default, invalid input raises an error."
    },
    "output_format": {
      "type": "string",
      "enum": [
        "columns",
        "to_lists"
      ],
      "description": "How to split the dictionary.\ncolumns creates one output column for each dictionary key.\nIn recipes, remaining null cells are normalized to empty strings.\nto_lists creates two output columns containing lists of keys and values.\nRemaining null values inside these lists are preserved."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    }
  }
}
```

</details>

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
| Catalog ID | `63` |
| Catalog key | `split.dictionary` |
| Recipe key | `split.dictionary` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.dictionary` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `06ca98e4-d026-43f7-84eb-af246d401ba9` |

**Sources**

- [WranglesPY split.dictionary implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Archived split.dictionary Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/dictionary.md)

</details>
