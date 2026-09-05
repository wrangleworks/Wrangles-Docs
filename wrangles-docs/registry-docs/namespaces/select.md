---
title: "Select Wrangles"
description: "Select wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Select"
slug: "/namespaces/select"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Select Wrangles

Select wrangles, with recipe examples, parameters, and behavior.

## Drop {#drop}

Drop (Delete) selected column(s).

Drop (Delete) selected column(s)

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `columns` | Name of the column(s) to drop. | string, array | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |

</div>

### Examples

```yaml
wrangles:
  - drop:
      columns:
        - Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

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
| Recipe key | `drop` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.drop` |

**Sources**

- [WranglesPY drop implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing drop Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/drop.md)

</details>


---

## Filter {#filter}

Filter the dataframe based on the contents. If multiple filters are specified, all must be correct. For complex filters, use the where parameter.

Filter the dataframe based on the contents.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to filter on. If multiple are provided, all must match the criteria. | string, integer, array | `[]` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `equal` | Select rows where the values equal a given value. | string, array, null | `null` | No |
| `not_equal` | Select rows where the values do not equal a given value. | string, array, null | `null` | No |
| `is_in` | Select rows where the values are in a given list. | string, array, null | `null` | No |
| `not_in` | Select rows where the values are not in a given list. | string, array, null | `null` | No |
| `greater_than` | Select rows where the values are greater than a specified value. Does include the value itself. | integer, number, null | `null` | No |
| `greater_than_equal_to` | Select rows where the values are greater than a specified value. Does include the value itself. | integer, number, null | `null` | No |
| `less_than` | Select rows where the values are less than a specified value. Does not include the value itself. | integer, number, null | `null` | No |
| `less_than_equal_to` | Select rows where the values are less than a specified value. Does include the value itself. | integer, number, null | `null` | No |
| `between` | Value or list of values to filter that are in between two parameter values. | array, null | `null` | No |
| `contains` | Select rows where the input contains the value. Allows regular expressions. | string, null | `null` | No |
| `not_contains` | Select rows where the input does not contain the value. Allows regular expressions. | string, null | `null` | No |
| `is_null` | If true, select all rows where the value is NULL. If false, where is not NULL. | boolean, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  # Select only red fruits
  - filter:
      input: Color
      equal:
        - red
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Color | Fruit |
| --- | --- |
| red | Apple |
| green | Apple |
| orange | Orange |
| red | Strawberry |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Color | Fruit |
| --- | --- |
| red | Apple |
| red | Strawberry |

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
| Recipe key | `filter` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.filter` |

**Sources**

- [WranglesPY filter implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing filter Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/filter.md)

</details>


---

## Columns {#columns}

Select columns from the dataframe.

Select columns from the dataframe

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to select. | string, integer, array | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.columns:
      input: Manufacturer
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part Number | Manufacturer |
| --- | --- |
| 1234 | SKF |
| 5678 | Timken |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Manufacturer |
| --- |
| SKF |
| Timken |

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
| Recipe key | `select.columns` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.columns` |

**Sources**

- [WranglesPY select.columns implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.columns Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/columns.md)

</details>


---

## Dictionary Element {#dictionary-element}

Select one or more element of a dictionary.



### Parameters

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

### Examples

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


---

## Element {#element}

Select elements of lists or dicts using python syntax like col[0]['key'].

Select elements of lists or dictionaries using Python syntax like `col[1:3]['key']`.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column and sub elements This permits by index for lists or dict and by key for dicts e.g. col[0]['key'] // [&#123;"key":"val"&#125;] -&gt; "val". | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Set the default value to return if the specified element doesn't exist. | string, number, array, object, boolean, null | `null` | No |

</div>

### Examples

```yaml
wrangles:
  - select.element:
      input: Column A[0]
      output: First Element
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column A |
| --- |
| [A, 0.9] |
| [B, 0.8] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| First Element |
| --- |
| A |
| B |

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
| Recipe key | `select.element` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.element` |

**Sources**

- [WranglesPY select.element implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.element Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/element.md)

</details>


---

## Group By {#group-by}

Group and aggregate the data.

Group and aggregate the data

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `by` | List of the input columns to group on. | string, array | `[]` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `list` | Group and return all values for these column(s) as a list. | string, array | — | No |
| `first` | The first value for these column(s). | string, array | — | No |
| `last` | The last value for these column(s). | string, array | — | No |
| `min` | The minimum value for these column(s). | string, array | — | No |
| `max` | The maximum value for these column(s). | string, array | — | No |
| `mean` | The mean (average) value for these column(s). | string, array | — | No |
| `median` | The median value for these column(s). | string, array | — | No |
| `nunique` | The count of unique values for these column(s). | string, array | — | No |
| `count` | The count of values for these column(s). | string, array | — | No |
| `counts` | Return a dictionary containing the count of each distinct value for these column(s). Keys are converted to JSON-safe strings; missing values use the key "null" and booleans use lowercase "true"/"false". | string, array | — | No |
| `std` | The standard deviation of values for these column(s). | string, array | — | No |
| `sum` | The total of values for these column(s). | string, array | — | No |
| `any` | Return true if any of the values for these column(s) are true. | string, array | — | No |
| `all` | Return true if all of the values for these column(s) are true. | string, array | — | No |
| `p75` | Get a percentile. Note, you can use any integer here for the corresponding percentile. | string, array | — | No |
| `custom.*` | Placeholder for custom functions. Replace 'placeholder' with the name of the function. | string, array | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `auto_rename_columns` | If true (default), aggregated column names include the operation as a suffix (e.g. Value.sum). If false, column names are left as-is; use a dictionary entry to supply a custom output name (e.g. - Value: Total). | boolean | `true` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.group_by:
      by:
        - Product Type
      sum: Quantity
      mean: Price ($)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Quantity | Price ($) | Product Type |
| --- | --- | --- | --- |
| Hammer | 3 | 12.99 | Hand Tools |
| Ratchet Wrench | 12 | 6.99 | Hand Tools |
| Cordless Drill | 2 | 49.99 | Power Tools |
| Reciprocating Saw | 7 | 29.99 | Power Tools |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Type | Quantity.sum | Price ($).mean |
| --- | --- | --- |
| Hand Tools | 15 | 9.99 |
| Power Tools | 9 | 39.99 |

</div>

</div>





```yaml
wrangles:
  - select.group_by:
      by: Category
      custom.sum_times_two: Quantity
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Category | Quantity |
| --- | --- |
| Hand Tools | 3 |
| Hand Tools | 1 |
| Hand Tools | 2 |
| Power Tools | 4 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Category | Quantity.sum_times_two |
| --- | --- |
| Hand Tools | 12 |
| Power Tools | 4 |

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
| Recipe key | `select.group_by` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.group_by` |

**Sources**

- [WranglesPY select.group_by implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.group_by Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/group-by.md)

</details>


---

## Head {#head}

Return the first n rows.

Return the first n rows

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `n` | Number of rows to return. | integer | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.head:
      n: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |

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
| Recipe key | `select.head` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.head` |

**Sources**

- [WranglesPY select.head implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.head Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/head.md)

</details>


---

## Highest Confidence {#highest-confidence}

Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form [&lt;&lt;value&gt;&gt;, &lt;&lt;confidence_score&gt;&gt;].

Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form `[value, confidence_score]`.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of the input columns to select from. | array | — | Yes |
| `output` | If two columns; the result and confidence. If one column; [result, confidence]. | string, array | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.highest_confidence:
      input:
        - Col1
        - Col2
        - Col3
      output: Highest Confidence
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| ['A', 0.79] | ['B', 0.77] | ['C', 0.99] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Highest Confidence |
| --- |
| ['C', 0.99] |

</div>

</div>





```yaml
wrangles:
  - select.highest_confidence:
      input:
        - Col1
        - Col2
        - Col3
      output:
        - Item
        - Confidence
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| ['A', 0.79] | ['B', 0.77] | ['C', 0.99] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Item | Confidence |
| --- | --- |
| C | 0.99 |

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
| Recipe key | `select.highest_confidence` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.highest_confidence` |

**Sources**

- [WranglesPY select.highest_confidence implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.highest_confidence Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/highest-confidence.md)

</details>


---

## Left {#left}

Return characters from the left of text. Strings shorter than the length defined will be unaffected.

Select characters from the left of the input. Using a negative length reverses the side of selection, selecting from the right.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to edit. | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `length` | Number of characters to include from the left. If negative, this will remove the specified number of characters from the left. May not equal 0. | integer | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.left:
      input: Column
      output: Result
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| pud |

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
| Recipe key | `select.left` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.left` |

**Sources**

- [WranglesPY select.left implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.left Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/left.md)

</details>


---

## Length {#length}

Calculate the lengths of data in a column. The length depends on the data type e.g. text will be the length of the text, lists will be the number of elements in the list.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column(s). | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.length:
      input: Part Code
      output: Part Code Length
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part Code |
| --- |
| 6202 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Part Code Length |
| --- |
| 4 |

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
| Recipe key | `select.length` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.length` |

**Sources**

- [WranglesPY select.length implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.length Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/length.md)

</details>


---

## List Element {#list-element}

Select a numbered element of a list (zero indexed).



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `element` | The numbered element of the list to select. Starts from zero. This may use python slicing syntax to select a subset of the list. | integer | `0` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `default` | Set the default value to return if the specified element doesn't exist. | string, number, array, object, boolean, null | `""` | No |

</div>

### Examples

```yaml
wrangles:
  - select.list_element:
      input: Col1
      output: Second Element
      element: 2 # Zero indexed
      default: F
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 |
| --- |
| ['A', 'B', 'C'] |
| ['D', 'E'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Third Element |
| --- |
| C |
| F |

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
| Recipe key | `select.list_element` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.list_element` |

**Sources**

- [WranglesPY select.list_element implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.list_element Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/list-element.md)

</details>


---

## Right {#right}

Return characters from the right of text. Strings shorter than the length defined will be unaffected.

Select characters from the right of the input. Using a negative length reverses the side of selection, selecting from the left.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to edit. | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `length` | Number of characters to include from the right. If negative, this will remove the specified number of characters from the right. May not equal 0. | integer | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.right:
      input: Column
      output: Result
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| ing |

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
| Recipe key | `select.right` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.right` |

**Sources**

- [WranglesPY select.right implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.right Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/right.md)

</details>


---

## Sample {#sample}

Return a random sample of the rows.

Return a random sample of the rows

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `rows` | If a whole number, will select that number of rows. If a decimal between 0 and 1 will select that fraction of the rows e.g. 0.1 =&gt; 10% of rows will be returned. | integer, number | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.sample:
      rows: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Needle Bearing | Acme Bearings |

</div>

</div>





```yaml
wrangles:
  - select.sample:
      rows: .25
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Manufacturer |
| --- | --- |
| Needle Bearing | Acme Bearings |

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
| Recipe key | `select.sample` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.sample` |

**Sources**

- [WranglesPY select.sample implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.sample Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/sample.md)

</details>


---

## Substring {#substring}

Return characters from the middle of text.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to edit. | string, integer, array | — | Yes |
| `output` | Name of the output column(s). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `start` | The position of the first character to select. If ommited will start from the beginning and length must be provided. | integer, null | `null` | No |
| `length` | The length of the string to select. If ommited will select to the end of the string and start must be provided. | integer, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| udd |

</div>

</div>





```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| udding |

</div>

</div>





```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| pud |

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
| Recipe key | `select.substring` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.substring` |

**Sources**

- [WranglesPY select.substring implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.substring Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/substring.md)

</details>


---

## Tail {#tail}

Return the last n rows.

Return the last n rows

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `n` | Number of rows to return. | integer | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.tail:
      n: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Manufacturer |
| --- | --- |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

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
| Recipe key | `select.tail` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.tail` |

**Sources**

- [WranglesPY select.tail implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.tail Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/tail.md)

</details>


---

## Threshold {#threshold}

Select the first option if it exceeds a given threshold, else the second option.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of the input columns to select from. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `threshold` | Threshold above which to choose the first option, otherwise the second. | number | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - select.threshold:
      input:
        - Col1
        - Col2
      output: Result
      threshold: .77
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| ['A', 0.6] | ['B', 0.79] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| B |

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
| Recipe key | `select.threshold` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.threshold` |

**Sources**

- [WranglesPY select.threshold implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Existing select.threshold Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/threshold.md)

</details>


---

## Sort {#sort}

Sort the data.

Sort the data

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `by` | Name or list of the column(s) to sort by. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `ascending` | Sort ascending vs. descending. Specify a list to sort multiple columns in different orders. If this is a list of bools then it must match the length of the by. | boolean, array | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `ignore_index` | Ignore Index value accepted by the runtime. | boolean | `true` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - sort:
      by: Price
      ascending: true
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Item | Price |
| --- | --- |
| Hammer | 11.99 |
| Chisel | 4.99 |
| Drill | 29.99 |
| Wrench | 6.99 |
| Saw | 13.99 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Item | Price |
| --- | --- |
| Chisel | 4.99 |
| Wrench | 6.99 |
| Hammer | 11.99 |
| Saw | 13.99 |
| Drill | 29.99 |

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
| Recipe key | `sort` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.sort` |

**Sources**

- [WranglesPY sort implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing sort Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/sort.md)

</details>
