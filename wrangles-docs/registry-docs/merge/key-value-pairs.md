---
title: "Key Value Pairs"
description: "Create a dictionary from keys and values in paired columns e.g. COLUMN_NAME_1, COLUMN_VALUE_1, COLUMN_NAME_2, COLUMN_VALUE_2 ..."
sidebar_label: "Key Value Pairs"
slug: "/merge/key-value-pairs"
---

# Key Value Pairs

Create a dictionary from keys and values in paired columns e.g. COLUMN_NAME_1, COLUMN_VALUE_1, COLUMN_NAME_2, COLUMN_VALUE_2 ...

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | object | Matched pairs of key and value columns. | — |
| `output` | Yes | string | Name of the output column. | — |
| `skip_empty` | No | boolean | Whether to skip empty keys or values when creating the dictionary. | `false` |
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

Create a dictionary from keys and values in paired columns.

## Migrated examples
#### Using Named Columns

##### Recipe

```yaml
wrangles:
  - merge.key_value_pairs:
      input:
        Letter: Number
      output: Pairs
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Letter | Number |
| --- | --- |
| A | 1 |
| B | 2 |
| C | 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Pairs |
| --- |
| \{'A': 1\} |
| \{'B': 2\} |
| \{'C': 3\} |

</div>

</div>

#### Using a wildcard (*)

##### Recipe

```yaml
# Using a Wildcard (*)
wrangles:
  - merge.key_value_pairs:
      input:
        key*: value*
      output: Object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| key 1 | key 2 | value 1 | value 2 |
| --- | --- | --- | --- |
| A | One | a | First |
| B | Two | b | Second |
| C | three | c | Third |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Object |
| --- |
| \{'A': 'a', 'One': 'First'\} |
| \{'B': 'b', 'Two': 'Second'\} |
| \{'C': 'c', 'three': 'Third'\} |

</div>

</div>

## Provenance

- [WranglesPY merge.key_value_pairs implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Existing merge.key_value_pairs Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/merge/_sources/key-value-pairs.md)

## Registry metadata

- Registry ID: `8a2cd37c-8ef7-4b05-8264-36512f5dd837`
- Namespace: `merge`
- Recipe key: `merge.key_value_pairs`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.merge.key_value_pairs`
- Status: `active`
- Registry version: `0.1.0-pilot`
