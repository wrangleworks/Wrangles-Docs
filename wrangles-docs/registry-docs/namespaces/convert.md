---
title: "Convert Wrangles"
description: "Convert wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Convert"
slug: "/namespaces/convert"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Convert Wrangles

Convert wrangles, with recipe examples, parameters, and behavior.

## Convert Case {#case}

Change the letter case of text values.

Use `convert.case` to normalize capitalization while keeping the source column
or writing the result to a new column.

### Behavior

- Supported modes are `lower`, `upper`, `title`, and `sentence`.
- Omitting `output` overwrites the input column.
- Input and output lists must have equal lengths.
- Non-string values are passed through unchanged and produce a warning.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. If omitted, each input column is overwritten. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case` | Letter case to apply. Sentence case lowercases the value and capitalizes sentence starts. | string; one of:<ul className="ww-param-enum-values"><li>lower</li><li>upper</li><li>title</li><li>sentence</li></ul> | `"lower"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |

</div>

### Examples

```yaml
wrangles:
  - convert.case:
      input: product
      output: product_upper
      case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| product |
| --- |
| Cordless Drill |
| bearing seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| product_upper |
| --- |
| CORDLESS DRILL |
| BEARING SEAL |

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
| Recipe key | `convert.case` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.case` |

**Sources**

- [WranglesPY convert.case implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.case documentation](https://wrangles.io/python/recipes/wrangles/convert#case)

</details>


---

## Convert Data Type {#data-type}

Convert values to strings, numbers, booleans, or datetimes.

Use `convert.data_type` when a recipe needs consistent Python-compatible
values rather than display-only formatting.

### Behavior

- Supported target types are `str`, `float`, `int`, `bool`, and `datetime`.
- Omitting `data_type` uses the runtime default `str`.
- Omitting `output` overwrites the input column.
- Failed conversions retain the original value unless `default` is supplied.
- Additional undocumented keyword arguments are implementation details and are
  not part of the public Registry contract.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. If omitted, each input column is overwritten. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `data_type` | Data type to produce. | string; one of:<ul className="ww-param-enum-values"><li>str</li><li>float</li><li>int</li><li>bool</li><li>datetime</li></ul> | `"str"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Value returned when conversion fails. If omitted, the original value is retained. | string, number, array, object, boolean, null | `null` | No |

</div>

### Examples

```yaml
wrangles:
  - convert.data_type:
      input: quantity
      output: quantity_integer
      data_type: int
      default: 0
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| quantity |
| --- |
| 12 |
| not available |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| quantity_integer |
| --- |
| 12 |
| 0 |

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
| Recipe key | `convert.data_type` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.data_type` |

**Sources**

- [WranglesPY convert.data_type implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.data_type documentation](https://wrangles.io/python/recipes/wrangles/convert#data-type)

</details>


---

## Fraction to Decimal {#fraction-to-decimal}

Convert fractions to decimals.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output colum. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `decimals` | Number of decimals to round fraction. | integer | `4` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - convert.fraction_to_decimal:
      input: fractions
      output: decimals
      decimals: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| fractions |
| --- |
| 3/32 |
| 25/64 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| decimals |
| --- |
| 0.094 |
| 0.391 |

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
| Recipe key | `convert.fraction_to_decimal` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.fraction_to_decimal` |

**Sources**

- [WranglesPY convert.fraction_to_decimal implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Existing convert.fraction_to_decimal Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/fraction-to-decimal.md)

</details>


---

## Convert From JSON {#from-json}

Parse JSON text into lists, objects, scalars, booleans, or null values.

Use `convert.from_json` when a column contains JSON text that later wrangles
need to treat as structured values.

### Behavior

- Each non-fallback value is parsed with Python's JSON parser.
- Omitting `output` overwrites the input column.
- Multiple input columns may share one fallback or use one fallback per input.
- Invalid JSON raises an error unless a non-null fallback is supplied.
- Permissive Python-literal or YAML-like parsing is outside this wrangle's
  contract.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of columns containing valid JSON text. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. If omitted, each input column is overwritten. | string, array | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Value returned for empty or invalid JSON. A list may supply one fallback per input column. | string, number, array, object, boolean, null | `null` | No |

</div>

### Examples

```yaml
wrangles:
  - convert.from_json:
      input: attributes_json
      output: attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| attributes_json |
| --- |
| &#123;"material":"steel","voltage":18&#125; |
| ["corded","variable speed"] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| attributes |
| --- |
| &#123;"material":"steel","voltage":18&#125; |
| ["corded","variable speed"] |

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
| Recipe key | `convert.from_json` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.from_json` |

**Sources**

- [WranglesPY convert.from_json implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Legacy convert.from_json documentation](https://wrangles.io/python/recipes/wrangles/convert#from-json)

</details>


---

## From YAML {#from-yaml}

Convert a YAML representation into an object.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If omitted, the input column will be overwritten. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Value to return if the row is empty or fails to be parsed as YAML. If input is a list, default may also be a list - either a single value to apply to all columns, or one value per input column. | string, array, object, number, boolean, null | `null` | No |

</div>

### Examples

```yaml
wrangles:
  - convert.from_yaml:
      input: column 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

```yaml
Product Specs:
  length: 6 inch
  voltage: 24V
  weight: 3lb
```

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

```python
{
  'Product Specs': {
    'length': '6 inch',
    'voltage': '24V',
    'weight': '3lb'
  }
}
```

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
| Recipe key | `convert.from_yaml` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.from_yaml` |

**Sources**

- [WranglesPY convert.from_yaml implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Existing convert.from_yaml Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/from-yaml.md)

</details>


---

## To JSON {#to-json}

Convert an object to a JSON representation.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If omitted, the input column will be overwritten. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `ensure_ascii` | If true, non-ASCII characters will be escaped. Default is false. | boolean | `false` | No |
| `indent` | If indent is a non-negative integer or string, then JSON array elements and object members will be pretty-printed with that indent level. An indent level of 0, negative, or "" will only insert newlines. None (the default) selects the most compact representation. Using a positive integer indent indents that many spaces per level. If indent is a string (such as '\t'), that string is used to indent each level. | string, integer | — | No |
| `sort_keys` | If sort_keys is true (defaults to False), then the output of dictionaries will be sorted by key. | boolean | — | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - convert.to_json:
      input: column
      output: new column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| `['a', 'python', 'list']` |
| `{'python': 'dict'}` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| new column |
| --- |
| `["a","python","list"]` |
| `{"python":"dict"}` |

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
| Recipe key | `convert.to_json` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.to_json` |

**Sources**

- [WranglesPY convert.to_json implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Existing convert.to_json Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/to-json.md)

</details>


---

## To YAML {#to-yaml}

Convert an object to a YAML representation.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If omitted, the input column will be overwritten. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `sort_keys` | If sort_keys is true (default: False), then the output of dictionaries will be sorted by key. | boolean | `false` | No |
| `allow_unicode` | Allow Unicode value accepted by the runtime. | boolean | `true` | No |
| `indent` | Specify the number of spaces for indentation to specify nested elements. | integer | — | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - convert.to_yaml:
      input: column 1
      indent: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

```python
{
  'Product Specs': {
    'length': '6 inch',
    'voltage': '24V',
    'weight': '3lb'
  }
}
```

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

```yaml
Product Specs:
  length: 6 inch
  voltage: 24V
  weight: 3lb
```

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
| Recipe key | `convert.to_yaml` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `convert` |
| Documentation group | `convert` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.convert.to_yaml` |

**Sources**

- [WranglesPY convert.to_yaml implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py)
- [Existing convert.to_yaml Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/to-yaml.md)

</details>
