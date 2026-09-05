---
title: "Matrix"
description: "Apply a matrix of wrangles to the dataframe. This will run the wrangles for each combination of the variables."
sidebar_label: "Matrix"
slug: "/matrix"
---

# Matrix

Apply a matrix of wrangles to the dataframe. This will run the wrangles for each combination of the variables.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `variables` | Yes | object | A dictionary of variables to pass to the wrangle. The key is the variable name and the value is a list of values. | — |
| `wrangles` | Yes | array | The wrangles to apply to the dataframe. Each wrangle will be run for each combination of the variables. | — |
| `strategy` | No | string; one of: permutations, loop | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists until the longest is completed. permutations uses the combination of all variables against all other variables. | `"loop"` |
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

Apply a matrix of wrangles to the dataframe. Each wrangle runs for the configured combinations of variables, including recipe variables and variables declared by the `variables` parameter.

See the [Matrix connector](/python/connectors/matrix) for the connector equivalent.

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
def test_fn(part_code, value):
    return part_code + value
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

## Provenance

- [WranglesPY matrix implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing matrix Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/matrix.md)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: root-level runtime key
- Recipe key: `matrix`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.matrix`
- Status: `active`
- Registry version: `0.1.0-pilot`
