---
title: "Python"
description: "Apply a simple single-line python command. For more complex python use a custom function. Note, this evaluates the python command - be especially cautious including variables from untrusted sources within the command string. The python command will be evaluated once for each row and the result returned. Reference column values by using their name. Non-alphanumeric characters within column names are replaced by underscores (_) Additionally, all columns are available as a dict named kwargs. Additional parameters set for the wrangle will also be available to the command."
sidebar_label: "Python"
slug: "/python"
---

# Python

Apply a simple single-line python command. For more complex python use a custom function. Note, this evaluates the python command - be especially cautious including variables from untrusted sources within the command string. The python command will be evaluated once for each row and the result returned. Reference column values by using their name. Non-alphanumeric characters within column names are replaced by underscores (_) Additionally, all columns are available as a dict named kwargs. Additional parameters set for the wrangle will also be available to the command.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `command` | Yes | string | Python command. This must return a value. Note: any non-alphanumeric characters in variable names are replaced by underscores (_). | — |
| `output` | Yes | string, array | Name or list of output column(s). To output multiple columns, return a list of the corresponding length. | — |
| `input` | No | string, integer, array, null | Name or list of input column(s) to filter the data available to the command. Useful in conjunction with kwargs to target a variable range of columns. If not specified, all columns will be available. | `null` |
| `except` | No | string, array, number, integer, boolean, object | Value to return for the row if an exception occurs during the evaluation. If not provided, an exception will be raised as normal. If multiple output columns are specified, this must match the length. | — |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

The Python wrangle executes simple Python commands inline within a recipe. Row values are referenced by column name and commands are evaluated once per row. Spaces within column names are replaced by underscores (`_`). All columns are also available as a dictionary named `kwargs`. For more complex Python, use custom functions.

:::caution
This wrangle evaluates the Python command. Be cautious when including variables from untrusted sources in the command string.
:::

## Migrated examples
#### Python Wrangle

##### Recipe

```yaml
wrangles:
  - python:
      output: result
      command: My_Column.upper()
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| My Column |
| --- |
| example text |

</div>

<div className="ww-sample-panel">

##### Output Sample

| My Column | result |
| --- | --- |
| example text | EXAMPLE TEXT |

</div>

</div>

#### Including Your Own Parameters

The Python wrangle supports parameters so values of unknown origin can be injected safely.

##### Recipe

```yaml
wrangles:
  - python:
      output: sliced
      command: input_column[:i]
      i: ${var}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

_No sample available._

</div>

</div>

## Provenance

- [WranglesPY python implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing python Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/python.md)

## Registry metadata

- Registry ID: `c0398a11-7731-4e47-8df0-b07eea0b1d6c`
- Namespace: root-level runtime key
- Recipe key: `python`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.python`
- Status: `active`
- Registry version: `0.1.0-pilot`
