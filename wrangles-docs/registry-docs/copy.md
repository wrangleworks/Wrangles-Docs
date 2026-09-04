---
title: "Copy"
description: "Make a copy of a column or a list of columns."
sidebar_label: "Copy"
slug: "/copy"
---

# Copy

Make a copy of a column or a list of columns.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | No | string, integer, array, null | Name of the input columns or columns. | `null` |
| `output` | No | string, array, null | Name of the output columns or columns. | `null` |
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

Create a copy of columns in a dataframe.

## Migrated examples
#### Copying a Column With Input and Output

##### Recipe

```yaml
wrangles:
  - copy:
      input: Product Data
      output: Product Data (copy)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data | Product Data (copy) |
| --- | --- |
| SKF ball bearing | SKF ball bearing |
| bearing seal | bearing seal |

</div>

</div>

#### Copying a Column Express as a Dictionary

##### Recipe

```yaml
wrangles:
  - copy:
      Product Data: Product Data (copy)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data | Product Data (copy) |
| --- | --- |
| SKF ball bearing | SKF ball bearing |
| bearing seal | bearing seal |

</div>

</div>

## Provenance

- [WranglesPY copy implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing copy Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/copy.md)

## Registry metadata

- Registry ID: `b002fbdc-92c0-4347-889d-0f4bfeec99fa`
- Namespace: root-level runtime key
- Recipe key: `copy`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.pandas.copy`
- Status: `active`
- Registry version: `0.1.0-pilot`
