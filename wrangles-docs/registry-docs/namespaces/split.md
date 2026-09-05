---
title: "Split Wrangles"
description: "Split wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Split"
slug: "/namespaces/split"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Split Wrangles

Split wrangles, with recipe examples, parameters, and behavior.

## Explode {#explode}

Explode a column of lists into rows.

Explode a column of lists into rows

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to explode. If multiple columns are included they must contain lists of the same length. | string, integer, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `drop_empty` | If true, any rows that contain an empty list will be dropped. If false, rows that contain empty lists will keep 1 row with an empty value. Default False. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `reset_index` | Reset the index after exploding. Default True. | boolean | `true` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

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
| Recipe key | `explode` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.explode` |

**Sources**

- [WranglesPY explode implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing explode Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/explode.md)

</details>


---

## Dictionary {#dictionary}

Split one or more dictionaries into columns. The dictionary keys will be returned as the new column headers. If the dictionaries contain overlapping values, the last value will be returned.

Split a dictionary into columns. The dictionary keys are used as the new column headers.

### Parameters

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
| Recipe key | `split.dictionary` |
| Lifecycle status | active |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.dictionary` |

**Sources**

- [WranglesPY split.dictionary implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.dictionary Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/dictionary.md)

</details>


---

## List {#list}

Split a list in a single column to multiple columns.

Split a list into multiple columns. If only one output is given, `split.list` returns the same list it was given, so output should be a list of columns or a column name with a wildcard (`*`).

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to be split. | string, integer | — | Yes |
| `output` | Name of column(s) for the results. If providing a single column, use a wildcard (*) to indicate a incrementing integer. | string, array | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

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
| Recipe key | `split.list` |
| Lifecycle status | active |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.list` |

**Sources**

- [WranglesPY split.list implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.list Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/list.md)

</details>


---

## Text {#text}

Split a string to multiple columns or a list.

Split text strings on certain characters. The text can be split into either multiple columns or a list.

### Parameters

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
| Recipe key | `split.text` |
| Lifecycle status | active |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.text` |

**Sources**

- [WranglesPY split.text implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.text Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/text.md)

</details>


---

## Tokenize {#tokenize}

Split text into tokens. A variety of methods are available. The default method is to split on spaces.

Tokenize elements in a list or string into individual tokens.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Column(s) to be split into tokens. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | Method to split the list. Options include `space`, `boundary`, `boundary_ignore_space`, custom functions as `custom.<function>`, or regex patterns as `regex:<pattern>`. | string; one of:<ul className="ww-param-enum-values"><li>space</li><li>boundary</li><li>boundary_ignore_space</li></ul> or string | `"space"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

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
| Recipe key | `split.tokenize` |
| Lifecycle status | active |
| Namespace | `split` |
| Documentation group | `split` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.split.tokenize` |

**Sources**

- [WranglesPY split.tokenize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py)
- [Existing split.tokenize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/tokenize.md)

</details>
