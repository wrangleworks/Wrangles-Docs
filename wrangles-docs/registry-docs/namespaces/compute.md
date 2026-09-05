---
title: "Compute Wrangles"
description: "Compute wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Compute"
slug: "/namespaces/compute"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Compute Wrangles

Compute wrangles, with recipe examples, parameters, and behavior.

## Case When {#case-when}

Assign values to a column based on conditional logic.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `cases` | List of conditions and corresponding values. | array | — | Yes |
| `default` | Value to assign if no conditions are met. Default None. | string, number, integer, boolean, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - compute.case_when:
      output: Letter Grade
      cases:
        - condition: Grade > 89
          value: 'A'
        - condition: 90 > Grade > 79
          value: 'B'
        - condition: 80 > Grade > 69
          value: 'C'
        - condition: 70 > Grade
          value: 'F'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Student | Grade |
| --- | --- |
| Billy | 62 |
| Sarah | 91 |
| Timmy | 88 |
| Tammy | 74 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Letter Grade |
| --- |
| F |
| A |
| B |
| C |

</div>

</div>



Conditions can be combined so multiple criteria must be met before assigning a value.



```yaml
wrangles:
  - compute.case_when:
      output: Letter Grade
      cases:
        - condition: (Grade > .89) & (Attendance == 'Good')
          value: 'A'
        - condition: (.90 > Grade > .79) & (Attendance == 'Good')
          value: 'B'
        - condition: (.80 > Grade > .69) & (Attendance == 'Good')
          value: 'C'
        - condition: (.70 > Grade) or (Attendance == 'Poor')
          value: 'F'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Student | Grade | Attendance |
| --- | --- | --- |
| Billy | 62 | Poor |
| Sarah | 91 | Poor |
| Timmy | 88 | Good |
| Tammy | 74 | Good |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Letter Grade |
| --- |
| F |
| F |
| B |
| C |

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
| Recipe key | `compute.case_when` |
| Lifecycle status | active |
| Namespace | `compute` |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compute.case_when` |

**Sources**

- [WranglesPY compute.case_when implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py)
- [Existing compute.case_when Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/case-when.md)

</details>


---

## Score Search Results {#score-search-results}

Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of 3 to 5 columns -&gt; [results, suppliers, part_codes, mpns (optional), descriptions (optional)]. | array | — | Yes |
| `output` | Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column, pretty_strings_column]. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `must_match_part_code` | If true, filters out results that don't satisfy the allowed match types. | boolean | `true` | No |
| `allow_mpn_exact` | Treat exact MPN matches as valid part code matches. | boolean | `true` | No |
| `allow_mpn_partial` | Treat partial MPN matches as valid part code matches. | boolean | `true` | No |
| `allow_other_exact` | Treat exact other part code matches as valid part code matches. | boolean | `true` | No |
| `allow_other_partial` | Treat partial other part code matches as valid part code matches. | boolean | `true` | No |
| `blacklist_keywords` | Comma-separated list or array of keywords to filter out URLs containing them. | string | `""` | No |
| `mpn_exact_score` | Mpn Exact Score value accepted by the runtime. | number | `8` | No |
| `mpn_partial_base` | Mpn Partial Base value accepted by the runtime. | number | `4` | No |
| `part_code_exact_score` | Part Code Exact Score value accepted by the runtime. | number | `6` | No |
| `part_code_partial_base` | Part Code Partial Base value accepted by the runtime. | number | `2` | No |
| `supplier_exact_score` | Supplier Exact Score value accepted by the runtime. | number | `3` | No |
| `supplier_partial_base` | Supplier Partial Base value accepted by the runtime. | number | `1` | No |
| `context_match_base` | Context Match Base value accepted by the runtime. | number | `2` | No |
| `fuzzy_match_threshold` | Fuzzy Match Threshold value accepted by the runtime. | number | `0.8` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

This template scores search results using supplier and part-code context. The fields added to each result dictionary depend on the scoring configuration.



```yaml
wrangles:
  - compute.score_search_results:
      input:
        - Search Results
        - Suppliers
        - Part Codes
      output:
        - Scored Results
      allow_other_exact: true
      must_match_part_code: true
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Search Results | Suppliers | Part Codes |
| --- | --- | --- |
| `[{"title": "SKF 6202 bearing", "link": "https://example.com/6202"}]` | `["SKF"]` | `["6202"]` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Scored Results |
| --- |
| Ranked result dictionaries |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

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
| Recipe key | `compute.score_search_results` |
| Lifecycle status | active |
| Namespace | `compute` |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compute.score_search_results` |

**Sources**

- [WranglesPY compute.score_search_results implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py)
- [Existing compute.score_search_results Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/score-search-results.md)

</details>


---

## Math {#math}

Apply a mathematical calculation.

Apply mathematical calculations to columns. Also called as `maths`.

:::info
Spaces within column headers are replaced with underscores automatically. Account for this when writing expressions in `input`.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The mathematical expression using column names. e.g. column1 * column2 + column3. Note: spaces within column names are replaced by underscores (_). | string | — | Yes |
| `output` | The column to output the results to. | string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - math:
      input: sqrt(Values)
      output: Square Root
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Values |
| --- |
| 4 |
| 9 |
| 16 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Square Root |
| --- |
| 2 |
| 3 |
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
| Recipe key | `math` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.math` |

**Sources**

- [WranglesPY math implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing math Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/math.md)

</details>


---

## Python {#python}

Apply a simple single-line python command. For more complex python use a custom function. Note, this evaluates the python command - be especially cautious including variables from untrusted sources within the command string. The python command will be evaluated once for each row and the result returned. Reference column values by using their name. Non-alphanumeric characters within column names are replaced by underscores (_) Additionally, all columns are available as a dict named kwargs. Additional parameters set for the wrangle will also be available to the command.

The Python wrangle executes simple Python commands inline within a recipe. Row values are referenced by column name and commands are evaluated once per row. Spaces within column names are replaced by underscores (`_`). All columns are also available as a dictionary named `kwargs`. For more complex Python, use custom functions.

:::caution
This wrangle evaluates the Python command. Be cautious when including variables from untrusted sources in the command string.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of output column(s). To output multiple columns, return a list of the corresponding length. | string, array | — | Yes |
| `input` | Name or list of input column(s) to filter the data available to the command. Useful in conjunction with kwargs to target a variable range of columns. If not specified, all columns will be available. | string, integer, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `command` | Python command. This must return a value. Note: any non-alphanumeric characters in variable names are replaced by underscores (_). | string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `except` | Value to return for the row if an exception occurs during the evaluation. If not provided, an exception will be raised as normal. If multiple output columns are specified, this must match the length. | string, array, number, integer, boolean, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - python:
      output: result
      command: My_Column.upper()
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| My Column |
| --- |
| example text |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| result |
| --- |
| EXAMPLE TEXT |

</div>

</div>



The Python wrangle supports parameters so values of unknown origin can be injected safely.



```yaml
wrangles:
  - python:
      output: sliced
      command: input_column[:i]
      i: ${var}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_No sample available._

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
| Recipe key | `python` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.python` |

**Sources**

- [WranglesPY python implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing python Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/python.md)

</details>


---

## SQL {#sql}

Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output.

Apply a SQL command to the current dataframe. Only `SELECT` statements are supported; the result becomes the output. The current table is called `df`.

:::info
SQL does not currently work with objects. If your table contains objects, use `convert.to_json` before using SQL. SQL is not compatible with `where` filtering.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `command` | SQL Command. The table is called df. For specific SQL syntax, this uses the SQLite dialect. | string | — | Yes |
| `params` | Variables to use in conjunctions with query. This allows the query to be parameterized. This uses sqlite syntax (? or :name). | array, object, null | `null` | No |
| `preserve_data_types` | Preserve Data Types value accepted by the runtime. | boolean | `true` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `preserve_index` | Preserve Index value accepted by the runtime. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - sql:
      command: |
        SELECT header1, header2
        FROM df
        WHERE header1 >= 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| header1 | header2 | header3 |
| --- | --- | --- |
| 1 | a | x |
| 2 | b | y |
| 3 | c | z |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| header1 | header2 |
| --- | --- |
| 2 | b |
| 3 | c |

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
| Recipe key | `sql` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.sql` |

**Sources**

- [WranglesPY sql implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing sql Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/sql.md)

</details>


---

## Maths (Deprecated) {#maths}

:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use [`math`](/wrangles/namespaces/compute#math) for new recipes.
:::

Deprecated alias for `math`; evaluate an expression and write its result to an output column.

### Behavior

Deprecated alias for `math`; evaluate an expression and write its result to an output column.

This first-pass guidance is derived from the callable signature.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | string | — | Yes |
| `output` | Name or list of output columns. | string | — | Yes |
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
| Recipe key | `maths` |
| Lifecycle status | deprecated |
| Replaced by | [`math`](/wrangles/namespaces/compute#math) |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.maths` |

**Sources**

- [WranglesPY maths implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)

</details>
