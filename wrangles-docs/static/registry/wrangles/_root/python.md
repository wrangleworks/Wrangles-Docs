---
schema_version: '0.1'
type: wrangle
id: c0398a11-7731-4e47-8df0-b07eea0b1d6c
wrangle_name: python
namespace: null
title: Python
description: >-
  Apply a simple single-line python command. For more complex python use a custom function. Note,
  this evaluates the python command - be especially cautious including variables from untrusted
  sources within the command string. The python command will be evaluated once for each row and the
  result returned. Reference column values by using their name. Non-alphanumeric characters within
  column names are replaced by underscores (_) Additionally, all columns are available as a dict
  named kwargs. Additional parameters set for the wrangle will also be available to the command.
wrangle_key: python
aliases: []
slug: python
status: active
visibility: public
tags:
  - compute
  - python
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.python
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: command
    description: >-
      Python command. This must return a value. Note: any non-alphanumeric characters in variable
      names are replaced by underscores (_).
    required: true
    role: option
    schema:
      type: string
  - name: output
    description: >-
      Name or list of output column(s). To output multiple columns, return a list of the
      corresponding length.
    required: true
    role: column-output
    schema:
      type:
        - string
        - array
  - name: input
    description: >-
      Name or list of input column(s) to filter the data available to the command. Useful in
      conjunction with kwargs to target a variable range of columns. If not specified, all columns
      will be available.
    required: false
    role: column-selector
    runtime_default: null
    schema:
      type:
        - string
        - integer
        - array
        - 'null'
  - name: except
    description: >-
      Value to return for the row if an exception occurs during the evaluation. If not provided, an
      exception will be raised as normal. If multiple output columns are specified, this must match
      the length.
    required: false
    role: option
    schema:
      type:
        - string
        - array
        - number
        - integer
        - boolean
        - object
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY python implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/python.md
    title: Existing python Markdown
---

# Python

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
