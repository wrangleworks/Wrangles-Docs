---
title: "Dictionaries"
description: "Take dictionaries in multiple columns and merge them to a single dictionary."
sidebar_label: "Dictionaries"
slug: "/merge/dictionaries"
---

# Dictionaries

Take dictionaries in multiple columns and merge them to a single dictionary.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of input columns. | — |
| `output` | Yes | string | Name of the output column. | — |
| `skip_empty` | No | boolean | Whether to skip empty dictionaries when merging. | `false` |
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

Take dictionaries in multiple columns and merge them to a single dictionary.

:::note
For duplicate keys, the last key in the input list takes precedence in the merged dictionary.
:::

## Migrated examples
#### Using Named Columns

##### Recipe

```yaml
wrangles:
  - merge.dictionaries:
      input:
        - Dict 1
        - Dict 2
      output: Merged
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Dict 1 | Dict 2 |
| --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Merged |
| --- |
| \{'First': 'One', 'Second': 'Two'\} |

</div>

</div>

#### Using a Wildcard (*)

##### Recipe

```yaml
# Using a Wildcard (*)
wrangles:
  - merge.dictionaries:
      input: Dict *
      output: Merged
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Dict 1 | Dict 2 |
| --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Merged |
| --- |
| \{'First': 'One', 'Second': 'Two'\} |

</div>

</div>

#### Using a Wildcard (*) With Not Columns

##### Recipe

```yaml
# Using a Wildcard (*)
wrangles:
  - merge.dictionaries:
      input:
        - Dict *
        - -Dict 2
      output: Merged
```

Note the extra dash in front of `Dict 2` excludes that column from the wildcard selection.

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Dict 1 | Dict 2 | Dict 3 |
| --- | --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} | \{'Third': 'Three'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Merged |
| --- |
| \{'First': 'One', 'Third': 'Three'\} |

</div>

</div>

## Provenance

- [WranglesPY merge.dictionaries implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.dictionaries Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/dictionaries.md)

## Registry metadata

- Registry ID: `93e27737-e966-4ba9-8777-4e96724ebfc4`
- Namespace: `merge`
- Recipe key: `merge.dictionaries`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.merge.dictionaries`
- Status: `active`
- Registry version: `0.1.0-pilot`
