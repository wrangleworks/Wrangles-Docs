---
title: "Format Wrangles"
description: "Format wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Format"
slug: "/namespaces/format"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Format Wrangles

Format wrangles, with recipe examples, parameters, and behavior.

## Clean Whitespaces {#clean-whitespaces}

Condense multiple spaces to a single space and convert special space characters to a standard space.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `trim` | Whether to trim leading and trailing spaces. Default True. | boolean | `true` | No |
| `remove_literals` | Whether to remove special space characters such as new lines etc. Default True. | boolean | `true` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - clean_whitespaces:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products |
| --- |
| `Hello     world!` |
| `Hello     universe!` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products |
| --- |
| Hello world! |
| Hello universe! |

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
| Recipe key | `clean_whitespaces` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.clean_whitespaces` |

**Sources**

- [WranglesPY clean_whitespaces implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing clean_whitespaces Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/clean-whitespaces.md)

</details>


---

## Dates {#dates}

Format a date.

Format a date into the desired pattern.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `format` | String pattern to format date. | string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - format.dates:
      input: Date
      output: Output Format
      format: '%Y-%m-%d'  # must be wrapped by quotes " or '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Date |
| --- |
| 6/23/1912 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output Format |
| --- |
| 1912-06-23 |

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
| Recipe key | `format.dates` |
| Lifecycle status | active |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.dates` |

**Sources**

- [WranglesPY format.dates implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.dates Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/dates.md)

</details>


---

## Pad {#pad}

Pad a string to a fixed length.

Pad a string to a fixed length

### Parameters

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

### Examples

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
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.pad` |

**Sources**

- [WranglesPY format.pad implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.pad Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/pad.md)

</details>


---

## Prefix {#prefix}

Add a prefix to a column.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | (Optional) Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `value` | Prefix value to add. | string, integer, number | — | Yes |
| `skip_empty` | Whether to skip empty values. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - format.prefix:
      input: Data
      output: Prefix
      value: anti
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Data |
| --- |
| freeze |
| dote |
| hero |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Prefix |
| --- |
| antifreeze |
| antidote |
| antihero |

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
| Recipe key | `format.prefix` |
| Lifecycle status | active |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.prefix` |

**Sources**

- [WranglesPY format.prefix implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.prefix Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/prefix.md)

</details>


---

## Format Price Breaks {#price-breaks}

Expand non-empty price-break cells into paired category and value columns.

### Behavior

Expand non-empty price-break cells into paired category and value columns.

This first-pass guidance is derived from the callable signature.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | array | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `categoryLabel` | Prefix for output columns that identify the source price-break category. | string | — | Yes |
| `valueLabel` | Prefix for output columns that contain the corresponding price-break value. | string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

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
| Recipe key | `format.price_breaks` |
| Lifecycle status | active |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.price_breaks` |

**Sources**

- [WranglesPY format.price_breaks implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)

</details>


---

## Remove Duplicates {#remove-duplicates}

Remove duplicates from a list. Preserves input order.

Remove duplicate values in a list.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `ignore_case` | Ignore case when removing duplicates. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
    - format.remove_duplicates:
        input: Attack of the Clones
        output: Commander
        where: Rank = Commander
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Rank | Attack of the Clones |
| --- | --- |
| Commander | ['Cody', 'Cody', 'Cody'] |
| Captain | ['Rex', 'Rex', 'Rex'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Commander |
| --- |
| ['Cody'] |
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
| Recipe key | `format.remove_duplicates` |
| Lifecycle status | active |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.remove_duplicates` |

**Sources**

- [WranglesPY format.remove_duplicates implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.remove_duplicates Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/remove-duplicates.md)

</details>


---

## Significant Figures {#significant-figures}

Format a value to a specific number of significant figures.

Format a value to a specific number of significant figures

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `significant_figures` | Number of significant figures to format to. Default is 3. | integer | `3` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - format.significant_figures:
      input: Data
      significant_figures: 2
      output: Data to 2 Figures
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Data |
| --- |
| 1.25 |
| 12.3 |
| 55.6 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Data to 2 Figures |
| --- |
| 1.2 |
| 12 |
| 55 |

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
| Recipe key | `format.significant_figures` |
| Lifecycle status | active |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.significant_figures` |

**Sources**

- [WranglesPY format.significant_figures implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.significant_figures Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/significant-figures.md)

</details>


---

## Suffix {#suffix}

Add a suffix to a column.

Add a suffix to a column

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | (Optional) Name of the output column. | string, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `value` | Suffix value to add. | string, integer, number, array | — | Yes |
| `skip_empty` | Whether to skip empty values. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - format.suffix:
      input: Data
      output: Suffix
      value: ic
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Data |
| --- |
| sto |
| hero |
| icon |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Suffix |
| --- |
| stoic |
| heroic |
| iconic |

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
| Recipe key | `format.suffix` |
| Lifecycle status | active |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.suffix` |

**Sources**

- [WranglesPY format.suffix implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.suffix Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/suffix.md)

</details>


---

## Trim {#trim}

Remove excess whitespace at the start and end of text.

Remove excess whitespace at the start and end of text. Can accept multiple columns.

:::note
Non-string values pass through unaltered.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - format.trim:
      input:
        - col1
      output: col1 trimmed
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| col1 |
| --- |
| `  Hello World  ` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| col1 | col1 trimmed |
| --- | --- |
| Hello World | Hello World |

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
| Recipe key | `format.trim` |
| Lifecycle status | active |
| Namespace | `format` |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.format.trim` |

**Sources**

- [WranglesPY format.trim implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.trim Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/trim.md)

</details>


---

## Remove Words {#remove-words}

Remove all the elements that occur in one list from another.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of column to remove words from. | string, integer, array | — | Yes |
| `to_remove` | Column or list of columns with a list of words to be removed. | string | — | Yes |
| `output` | Name of the output columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `tokenize_to_remove` | Tokenize all to_remove inputs. | boolean | `false` | No |
| `ignore_case` | Ignore input and to_remove case. | boolean | `true` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
   - remove_words:
        input: Description
        to_remove: # To Remove columns must be list
          - Materials
          - Colours
        output: Product
        tokenize_to_remove: True
        ignore_case: False
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Colours | Materials | Description |
| --- | --- | --- |
| ['Blue'] | ['Steel'] | Steel Blue Bottle |
| ['Blue'] | ['Steel'] | ['Steel', 'Blue', 'Bottle'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product |
| --- |
| Bottle |
| Bottle |

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
| Recipe key | `remove_words` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.remove_words` |

**Sources**

- [WranglesPY remove_words implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing remove_words Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/remove-words.md)

</details>


---

## Replace {#replace}

Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.

Quick find and replace for simple values. Can use regex in the `find` field.

:::note
Values that are not a number or a string pass through unaltered.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input column. | string, integer, array | — | Yes |
| `output` | Name or list of output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | Pattern to find using regex. | string | — | Yes |
| `replace` | Value to replace the pattern found. | string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - replace:
      input: Product Data
      find: brg
      replace: bearing
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Data |
| --- |
| SKF ball bearing |
| bearing seal |

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
| Recipe key | `replace` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.replace` |

**Sources**

- [WranglesPY replace implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing replace Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/replace.md)

</details>


---

## Round {#round}

Round column(s) to the specified decimals.

Round numbers in a column to the nearest decimal point of your choosing.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column(s). | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `decimals` | Number of decimal places to round column. | integer | `0` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - round:
      input: Cost Per Unit
      output: Cost Rounded
      decimals: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Cost Per Unit |
| --- |
| 3.14159 |
| 2.71828 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Cost Rounded |
| --- |
| 3.14 |
| 2.72 |

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
| Recipe key | `round` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.round` |

**Sources**

- [WranglesPY round implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing round Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/round.md)

</details>


---

## Translate {#translate}

Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available).

Translate the input column to another language. Powered by DeepL.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to translate. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `target_language` | Code of the language to translate to. | string; one of:<ul className="ww-param-enum-values"><li>Bulgarian</li><li>Chinese</li><li>Czech</li><li>Danish</li><li>Dutch</li><li>English (American)</li><li>English (British)</li><li>Estonian</li><li>Finnish</li><li>French</li><li>German</li><li>Greek</li><li>Hungarian</li><li>Italian</li><li>Japanese</li><li>Latvian</li><li>Lithuanian</li><li>Polish</li><li>Portuguese</li><li>Portuguese (Brazilian)</li><li>Romanian</li><li>Russian</li><li>Slovak</li><li>Slovenian</li><li>Spanish</li><li>Swedish</li></ul> | — | Yes |
| `source_language` | Code of the language to translate from. If omitted, automatically detects the input language. | string; one of:<ul className="ww-param-enum-values"><li>Auto</li><li>Bulgarian</li><li>Chinese</li><li>Czech</li><li>Danish</li><li>Dutch</li><li>English</li><li>Estonian</li><li>Finnish</li><li>French</li><li>German</li><li>Greek</li><li>Hungarian</li><li>Italian</li><li>Japanese</li><li>Latvian</li><li>Lithuanian</li><li>Polish</li><li>Portuguese</li><li>Romanian</li><li>Russian</li><li>Slovak</li><li>Slovenian</li><li>Spanish</li><li>Swedish</li></ul> | `"AUTO"` | No |
| `case` | Allow changing the case of the input prior to translation. | string, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - translate:
      input: Español
      output: English
      source_language: Spanish
      target_language: English (British)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Español |
| --- |
| ¡Hola Mundo! |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| English |
| --- |
| Hello World! |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | `translate` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.translate` |

**Sources**

- [WranglesPY translate implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing translate Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/translate.md)

</details>


---

## Standardize (Deprecated) {#standardize}

:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use [`standardize.custom`](/wrangles/namespaces/standardize#custom) for new recipes.
:::

Deprecated compatibility key for `standardize.custom`, which standardizes data using a trained DIY or bespoke model.

Run a standardize wrangle, such as one that expands abbreviations. A standardization wrangle must be trained first.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case_sensitive` | Allows the wrangle to be case sensitive if set to True, default is False. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | The ID of the wrangle to use (do not include 'find' and 'replace'). | string, array | — | Yes |

</div>

### Examples

```yaml
wrangles:
  - standardize:
      input: Abbrev
      output: Abbreviations
      model_id: code_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Abbrev |
| --- |
| ASAP |
| ETA |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Abbreviations |
| --- |
| As Soon As Possible |
| Estimated Time of Arrival |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | `standardize` |
| Lifecycle status | deprecated |
| Replaced by | [`standardize.custom`](/wrangles/namespaces/standardize#custom) |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.standardize` |

**Sources**

- [WranglesPY standardize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing standardize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/standardize.md)

</details>
