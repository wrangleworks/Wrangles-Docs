---
title: "Split Wrangles"
description: "Split wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Split"
slug: "/namespaces/split"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Split Wrangles

Split wrangles, with recipe examples, parameters, and behavior.

## Explode <CopyableCode value="explode" /> {#explode}

Explode a column of lists into rows.

Explode a column of lists into rows

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to explode. If multiple columns are included they must contain lists of the same length | string, integer, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `drop_empty` | If true, any rows that contain an empty list will be dropped.<br />If false, rows that contain empty lists will keep 1 row with an empty value.<br />Default False. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `reset_index` | Reset the index after exploding. Default True. | boolean | `true` | No |
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
  "description": "Explode a column of lists into rows",
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
      "description": "Name of the column(s) to explode. If multiple columns are included they must contain lists of the same length"
    },
    "reset_index": {
      "type": "boolean",
      "description": "Reset the index after exploding. Default True."
    },
    "drop_empty": {
      "type": "boolean",
      "description": "If true, any rows that contain an empty list will be dropped.\nIf false, rows that contain empty lists will keep 1 row with an empty value.\nDefault False."
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

### Examples

```yaml
wrangles:
  - explode:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products | Manufacturer |
| --- | --- |
| [Ball Bearing, Bearing Seal] | SKF |
| [Angle Grinder, Drill, Impact Driver] | Milwaukee |
| Solid State Relay | Schneider |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Seal | SKF |
| Angle Grinder | Milwaukee |
| Drill | Milwaukee |
| Impact Driver | Milwaukee |
| Solid State Relay | Schneider |

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
| Catalog ID | `77` |
| Catalog key | `explode` |
| Recipe key | `explode` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.explode` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `4e4b13ac-8d50-4b2c-85c8-2c31de1e817d` |

**Sources**

- [WranglesPY explode implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived explode Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/explode.md)

</details>


---

## Dictionary <CopyableCode value="split.dictionary" /> {#dictionary}

Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned.

Split a dictionary into columns. The dictionary keys are used as the new column headers.

### Parameters

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

### Examples

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


---

## List <CopyableCode value="split.list" /> {#list}

Split a list in a single column to multiple columns.

Split a list into multiple columns. If only one output is given, `split.list` returns the same list it was given, so output should be a list of columns or a column name with a wildcard (`*`).

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to be split | string, integer | — | Yes |
| `output` | Name of column(s) for the results. If providing a single column, use a wildcard (*) to indicate a incrementing integer | string, array | — | Yes |
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

Compatibility correction: Normalize schema type "int" to integer.

```json
{
  "type": "object",
  "description": "Split a list in a single column to multiple columns.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "Name of the column to be split"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of column(s) for the results. If providing a single column, use a wildcard (*) to indicate a incrementing integer"
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

### Examples

```yaml
wrangles:
  - split.list:
      input: Column
      output: Column*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Column1 | Column2 | Column3 |
| --- | --- | --- |
| A | B | C |

</div>

</div>





```yaml
wrangles:
  - split.list:
      input: Column
      output:
        - Heading A
        - Heading B
        - Heading C
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Heading A | Heading B | Heading C |
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
| Catalog ID | `64` |
| Catalog key | `split.list` |
| Recipe key | `split.list` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.list` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `3260b9f7-aae2-499f-8004-d211c2cf643e` |

**Sources**

- [WranglesPY split.list implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Archived split.list Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/list.md)

</details>


---

## Text <CopyableCode value="split.text" /> {#text}

Split a string to multiple columns or a list.

Split text strings on certain characters. The text can be split into either multiple columns or a list.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to be split | string | — | Yes |
| `output` | Name of the output column(s)<br />If a single column is provided,<br />the results will be returned as a list<br />If multiple columns are listed,<br />the results will be separated into the columns.<br />If omitted, will overwrite the input. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `char` | Set the character(s) to split on.<br />Default comma (,)<br />Can also prefix with "regex:" to split on a pattern. | string | `","` | No |
| `element` | Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:", "2:8:2" | integer, string | `null` | No |
| `inclusive` | If true, include the split character in the output. Default False | boolean | `false` | No |
| `skip_empty` | Whether to skip empty values | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `pad` | Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists. | boolean | `null` | No |
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
  "description": "Split a string to multiple columns or a list.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": "string",
      "description": "Name of the column to be split"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column(s)\nIf a single column is provided,\nthe results will be returned as a list\nIf multiple columns are listed,\nthe results will be separated into the columns.\nIf omitted, will overwrite the input."
    },
    "char": {
      "type": "string",
      "description": "Set the character(s) to split on.\nDefault comma (,)\nCan also prefix with \"regex:\" to split on a pattern."
    },
    "pad": {
      "type": "boolean",
      "description": "Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists."
    },
    "element": {
      "type": [
        "integer",
        "string"
      ],
      "description": "Select a specific element or range after splitting using slicing syntax. e.g. 0, \":5\", \"5:\", \"2:8:2\""
    },
    "inclusive": {
      "type": "boolean",
      "description": "If true, include the split character in the output. Default False"
    },
    "skip_empty": {
      "type": "boolean",
      "description": "Whether to skip empty values",
      "default": false
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

### Examples

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
| Catalog ID | `65` |
| Catalog key | `split.text` |
| Recipe key | `split.text` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.text` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `e76e43f7-d129-4bf8-87b4-a304a378b130` |

**Sources**

- [WranglesPY split.text implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Archived split.text Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/text.md)

</details>


---

## Tokenize <CopyableCode value="split.tokenize" /> {#tokenize}

Split text into tokens. A variety of methods are available. The default method is to split on spaces.

Tokenize elements in a list or string into individual tokens.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Column(s) to be split into tokens | string, integer, array | — | Yes |
| `output` | Name of the output column | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | Method to split the list. Options include `space`, `boundary`, `boundary_ignore_space`, custom functions as `custom.<function>`, or regex patterns as `regex:<pattern>`. | string; one of:<ul className="ww-param-enum-values"><li>space</li><li>boundary</li><li>boundary_ignore_space</li></ul> or string | `"space"` | No |
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
  "description": "Split text into tokens. A variety of methods are available. The default method is to split on spaces.",
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
      "description": "Column(s) to be split into tokens"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column"
    },
    "method": {
      "anyOf": [
        {
          "type": "string",
          "enum": [
            "space",
            "boundary",
            "boundary_ignore_space"
          ],
          "description": "Method to split the list. Options: space, boundary, boundary_ignore_space or use a custom function with custom.<function> or use a regex pattern with regex:<pattern>"
        },
        {
          "type": "string",
          "description": "Method to split the list. Options: space, boundary, boundary_ignore_space or use a custom function with custom.<function> or use a regex pattern with regex:<pattern>"
        }
      ]
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

### Examples

```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Materials |
| --- |
| Stainless Steel Oak Wood |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

</div>

</div>






```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Materials |
| --- |
| ['Stainless Steel', 'Oak Wood'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

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
| Catalog ID | `66` |
| Catalog key | `split.tokenize` |
| Recipe key | `split.tokenize` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.tokenize` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `6cc88418-ae0c-43f6-84ee-31e0d5f838c3` |

**Sources**

- [WranglesPY split.tokenize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Archived split.tokenize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/tokenize.md)

</details>
