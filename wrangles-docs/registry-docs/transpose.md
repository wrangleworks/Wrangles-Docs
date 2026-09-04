---
title: "Transpose"
description: "Transpose the DataFrame (swap columns to rows)."
sidebar_label: "Transpose"
slug: "/transpose"
---

# Transpose

Transpose the DataFrame (swap columns to rows).

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `header_column` | No | string, integer, null | Name or position of the column that will be used as the column headings for the transposed DataFrame. Default 0 (first column). Use header_column = null to not use any column as header. | `0` |
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

Transpose a dataframe.

## Migrated examples
:::note
Transpose is not compatible with `where` filtering.
:::

#### Transposing a Dataframe

##### Recipe

```yaml
wrangles:
  - transpose:
      header_column: Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Material | Ceramic | Rubber |
| --- | --- | --- |
| Product Data | SKF ball brg | brg seal |

</div>

</div>

## Provenance

- [WranglesPY transpose implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing transpose Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/transpose.md)

## Registry metadata

- Registry ID: `8716347f-f286-49b2-8a0b-cb73292e7475`
- Namespace: root-level runtime key
- Recipe key: `transpose`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.pandas.transpose`
- Status: `active`
- Registry version: `0.1.0-pilot`
