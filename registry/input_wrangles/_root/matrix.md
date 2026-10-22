---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: matrix
namespace: null
title: Matrix
description: >-
  Apply a matrix of wrangles to the dataframe. This will run the wrangles for each combination of
  the variables.
wrangle_key: matrix
aliases: []
slug: matrix
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Matrix orchestration is not supported in the baseline.
tags:
  - utility
  - matrix
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.matrix
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
  - name: variables
    description: |-
      A dictionary of variables to pass to the wrangle.
      The key is the variable name and the value is a list of values.
    required: true
    param_group: Execution
    schema:
      type: object
      description: |-
        A dictionary of variables to pass to the wrangle.
        The key is the variable name and the value is a list of values.
    runtime_required: true
  - name: wrangles
    description: |-
      The wrangles to apply to the dataframe.
      Each wrangle will be run for each combination of the variables.
    required: true
    param_group: Execution
    schema:
      type: array
      description: |-
        The wrangles to apply to the dataframe.
        Each wrangle will be run for each combination of the variables.
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
    runtime_required: true
  - name: strategy
    description: >-
      Determines how to combine variables when there are multiple. loop (default) iterates over each
      set of variables, repeating shorter lists  until the longest is completed. permutations uses
      the combination of all  variables against all other variables.
    required: false
    param_group: Options
    runtime_default: loop
    schema:
      type: string
      enum:
        - permutations
        - loop
      description: >-
        Determines how to combine variables when there are multiple. loop (default) iterates over
        each set of variables, repeating shorter lists  until the longest is completed. permutations
        uses the combination of all  variables against all other variables.
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY matrix implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/matrix.md
    title: Archived matrix Markdown
configuration_schema:
  type: object
  description: |-
    Apply a matrix of wrangles to the dataframe.
    This will run the wrangles for each combination of the variables.
  required:
    - variables
    - wrangles
  properties:
    variables:
      type: object
      description: |-
        A dictionary of variables to pass to the wrangle.
        The key is the variable name and the value is a list of values.
    wrangles:
      type: array
      description: |-
        The wrangles to apply to the dataframe.
        Each wrangle will be run for each combination of the variables.
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
    strategy:
      type: string
      enum:
        - permutations
        - loop
      description: >-
        Determines how to combine variables when there are multiple. loop (default) iterates over
        each set of variables, repeating shorter lists  until the longest is completed. permutations
        uses the combination of all  variables against all other variables.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Matrix

Apply a matrix of wrangles to the dataframe. Each wrangle runs for the configured combinations of variables, including recipe variables and variables declared by the `variables` parameter.

See the [Matrix connector](/py/connectors/matrix) for the connector equivalent.

## Migrated examples
#### Use Hardcoded Variables

Run a custom function once for each configured variable value.

##### Recipe

```yaml
wrangles:
  - matrix:
      variables:
        var: [A, B, C]
      wrangles:
        - custom.test_fn:
            input: Part Code
            output: Part Code ${var}
            value: ${var}
```

```python
def test_fn(Part_Code, value):
    return str(Part_Code) + str(value)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Code |
| --- |
| 6202 |
| br549 |
| 554-114 |
| 554-112 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Part Code | Part Code A | Part Code B | Part Code C |
| --- | --- | --- | --- |
| 6202 | 6202A | 6202B | 6202C |
| br549 | br549A | br549B | br549C |
| 554-114 | 554-114A | 554-114B | 554-114C |
| 554-112 | 554-112A | 554-112B | 554-112C |

</div>

</div>

#### Use Unique Variables Per Row

This example runs `extract.custom` once for each unique model ID.

##### Recipe

```yaml
wrangles:
  - matrix:
      variables:
        model_id: set(Model ID)
      wrangles:
        - extract.custom:
            input: Description
            output: Extracted Values
            model_id: ${model_id}
            where: "[Model ID] = ?"
            where_params:
              - ${model_id}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Description | Model ID |
| --- | --- |
| The SKF 6202 bearing is the best bearing in the world | xxxxxxxx-xxxx-xxxx |
| The Timken 6102 bearing is indestructible | yyyyyyyy-yyyy-yyyy |
| The Milwaukee impact has 1200ft-lbs of torque | zzzzzzzz-zzzz-zzzz |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Description | Model ID | Extracted Values |
| --- | --- | --- |
| The SKF 6202 bearing is the best bearing in the world | xxxxxxxx-xxxx-xxxx | 6202 |
| The Timken 6102 bearing is indestructible | yyyyyyyy-yyyy-yyyy | indestructible |
| The Milwaukee impact has 1200ft-lbs of torque | zzzzzzzz-zzzz-zzzz | 1200ft-lbs |

</div>

</div>

#### Native Variables

| Variable | Function |
| --- | --- |
| `${column_count}` | Number of columns. |
| `${columns}` | List of all columns. |
| `${df}` | Current dataframe. |
| `${row_count}` | Number of visible rows processed in each batch. |
