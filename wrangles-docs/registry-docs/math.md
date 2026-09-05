---
title: "Math"
description: "Apply a mathematical calculation."
sidebar_label: "Math"
slug: "/math"
---

# Math

Apply a mathematical calculation.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string | The mathematical expression using column names. e.g. column1 * column2 + column3. Note: spaces within column names are replaced by underscores (_). | — |
| `output` | Yes | string | The column to output the results to. | — |
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

Apply mathematical calculations to columns. Also called as `maths`.

:::info
Spaces within column headers are replaced with underscores automatically. Account for this when writing expressions in `input`.
:::

## Migrated examples
#### Square Root Example

##### Recipe

```yaml
wrangles:
  - math:
      input: sqrt(Values)
      output: Square Root
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Values |
| --- |
| 4 |
| 9 |
| 16 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Values | Square Root |
| --- | --- |
| 4 | 2 |
| 9 | 3 |
| 16 | 4 |

</div>

</div>

## Provenance

- [WranglesPY math implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing math Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/math.md)

## Registry metadata

- Registry ID: `494b11ad-00c1-4748-8b93-6bec982f4fec`
- Namespace: root-level runtime key
- Recipe key: `math`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.math`
- Status: `active`
- Registry version: `0.1.0-pilot`
