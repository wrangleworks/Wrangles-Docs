---
title: "Python"
description: "Apply a simple single-line python command. For more complex python use a custom function. Note, this evaluates the python command - be especially cautious including variables from untrusted sources within the command string. The python command will be evaluated once for each row and the result returned. Reference column values by using their name. Non-alphanumeric characters within column names are replaced by underscores (_) Additionally, all columns are available as a dict named kwargs. Additional parameters set for the wrangle will also be available to the command."
sidebar_label: "Python"
slug: "/python"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Python

Apply a simple single-line python command. For more complex python use a custom function. Note, this evaluates the python command - be especially cautious including variables from untrusted sources within the command string. The python command will be evaluated once for each row and the result returned. Reference column values by using their name. Non-alphanumeric characters within column names are replaced by underscores (_) Additionally, all columns are available as a dict named kwargs. Additional parameters set for the wrangle will also be available to the command.

The Python wrangle executes simple Python commands inline within a recipe. Row values are referenced by column name and commands are evaluated once per row. Spaces within column names are replaced by underscores (`_`). All columns are also available as a dictionary named `kwargs`. For more complex Python, use custom functions.

:::caution
This wrangle evaluates the Python command. Be cautious when including variables from untrusted sources in the command string.
:::

## Parameters

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

## Examples

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
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.python` |

**Sources**

- [WranglesPY python implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing python Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/python.md)

</details>
