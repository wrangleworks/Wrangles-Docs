---
title: "Merge Wrangles"
description: "Merge wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Merge"
slug: "/namespaces/merge"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Merge Wrangles

Merge wrangles, with recipe examples, parameters, and behavior.

## Coalesce {#coalesce}

Take the first non-empty value from a series of columns or lists.

Take the first non-empty value from a series of columns.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns or a single column containing lists. | array | — | Yes |
| `output` | Name of the output columns. This is required if multiple input columns are provided. | string, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - merge.coalesce:
      input:
        - Col1
        - Col2
        - Col3
      output: Output Col
      where: Col2 = E
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |
| D | E | F |
| G | H | I |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output Col |
| --- |
|  |
| D |
|  |

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
| Recipe key | `merge.coalesce` |
| Lifecycle status | active |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.coalesce` |

**Sources**

- [WranglesPY merge.coalesce implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.coalesce Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/coalesce.md)

</details>


---

## Concatenate {#concatenate}

Concatenate a list of columns or a list within a single column.

If the input is a list of columns, concatenate multiple columns into one as a delimited string. If the input is a single column, concatenate a list within that column into a delimited string.

### Parameters

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

### Examples

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
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.concatenate` |

**Sources**

- [WranglesPY merge.concatenate implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.concatenate Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/concatenate.md)

</details>


---

## Dictionaries {#dictionaries}

Take dictionaries in multiple columns and merge them to a single dictionary.

:::note
For duplicate keys, the last key in the input list takes precedence in the merged dictionary.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `skip_empty` | Whether to skip empty dictionaries when merging. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - merge.dictionaries:
      input:
        - Dict 1
        - Dict 2
      output: Merged
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Dict 1 | Dict 2 |
| --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Merged |
| --- |
| \{'First': 'One', 'Second': 'Two'\} |

</div>

</div>





```yaml
# Using a Wildcard (*)
wrangles:
  - merge.dictionaries:
      input: Dict *
      output: Merged
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Dict 1 | Dict 2 |
| --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Merged |
| --- |
| \{'First': 'One', 'Second': 'Two'\} |

</div>

</div>





```yaml
# Using a Wildcard (*)
wrangles:
  - merge.dictionaries:
      input:
        - Dict *
        - -Dict 2
      output: Merged
```

Note the extra dash in front of `Dict 2` excludes that column from the wildcard selection.

<div className="ww-sample-grid">

<div className="ww-sample-panel">



| Dict 1 | Dict 2 | Dict 3 |
| --- | --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} | \{'Third': 'Three'\} |

</div>

<div className="ww-sample-panel">



| Merged |
| --- |
| \{'First': 'One', 'Third': 'Three'\} |

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
| Recipe key | `merge.dictionaries` |
| Lifecycle status | active |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.dictionaries` |

**Sources**

- [WranglesPY merge.dictionaries implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.dictionaries Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/dictionaries.md)

</details>


---

## Key Value Pairs {#key-value-pairs}

Create a dictionary from keys and values in paired columns e.g. COLUMN_NAME_1, COLUMN_VALUE_1, COLUMN_NAME_2, COLUMN_VALUE_2 ...

Create a dictionary from keys and values in paired columns.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Matched pairs of key and value columns. | object | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `skip_empty` | Whether to skip empty keys or values when creating the dictionary. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - merge.key_value_pairs:
      input:
        Letter: Number
      output: Pairs
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Letter | Number |
| --- | --- |
| A | 1 |
| B | 2 |
| C | 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Pairs |
| --- |
| \{'A': 1\} |
| \{'B': 2\} |
| \{'C': 3\} |

</div>

</div>





```yaml
# Using a Wildcard (*)
wrangles:
  - merge.key_value_pairs:
      input:
        key*: value*
      output: Object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| key 1 | key 2 | value 1 | value 2 |
| --- | --- | --- | --- |
| A | One | a | First |
| B | Two | b | Second |
| C | three | c | Third |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Object |
| --- |
| \{'A': 'a', 'One': 'First'\} |
| \{'B': 'b', 'Two': 'Second'\} |
| \{'C': 'c', 'three': 'Third'\} |

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
| Recipe key | `merge.key_value_pairs` |
| Lifecycle status | active |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.key_value_pairs` |

**Sources**

- [WranglesPY merge.key_value_pairs implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.key_value_pairs Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/key-value-pairs.md)

</details>


---

## Lists {#lists}

Take lists in multiple columns and merge them to a single list.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `remove_duplicates` | Whether to remove duplicates from the created list. | boolean | `false` | No |
| `ignore_case` | Ignore case when removing duplicates. | boolean | `false` | No |
| `include_empty` | Whether to include empty values in the created list. | boolean | `true` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - merge.lists:
      input:
        - col1
        - col2
      output: Combined Col
      remove_duplicates: false
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| ['A', 'B'] | ['D', 'E'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Combined Col |
| --- |
| ['A', 'B', 'D', 'E'] |

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
| Recipe key | `merge.lists` |
| Lifecycle status | active |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.lists` |

**Sources**

- [WranglesPY merge.lists implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.lists Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/lists.md)

</details>


---

## To Dict {#to-dict}

Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `include_empty` | Whether to include empty columns in the created dictionary. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - merge.to_dict:
      input:
        - Col1
        - Col2
      output: Dict Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| A | B |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Dict Col |
| --- |
| \{'Col1': 'A', 'Col2': 'B'\} |

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
| Recipe key | `merge.to_dict` |
| Lifecycle status | active |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.to_dict` |

**Sources**

- [WranglesPY merge.to_dict implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.to_dict Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/to-dict.md)

</details>


---

## To List {#to-list}

Take multiple columns and merge them to a list.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `include_empty` | Whether to include empty columns in the created list. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - merge.to_list:
      input:
        - Col1
        - Col2
        - Col3
      output: List Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| List Col |
| --- |
| ['A', 'B', 'C'] |

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
| Recipe key | `merge.to_list` |
| Lifecycle status | active |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.to_list` |

**Sources**

- [WranglesPY merge.to_list implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.to_list Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/to-list.md)

</details>
