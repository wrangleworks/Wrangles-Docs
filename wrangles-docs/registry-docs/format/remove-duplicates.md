---
title: "Remove Duplicates"
description: "Remove duplicates from a list. Preserves input order."
sidebar_label: "Remove Duplicates"
slug: "/format/remove-duplicates"
---

# Remove Duplicates

Remove duplicates from a list. Preserves input order.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | No | string, array, null | Name of the output column. | `null` |
| `ignore_case` | No | boolean | Ignore case when removing duplicates. | `false` |
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

Remove duplicate values in a list.

## Migrated examples
#### Removing Duplicates From a List

##### Recipe

```yaml
wrangles:
    - format.remove_duplicates:
        input: Attack of the Clones
        output: Commander
        where: Rank = Commander
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Rank | Attack of the Clones |
| --- | --- |
| Commander | ['Cody', 'Cody', 'Cody'] |
| Captain | ['Rex', 'Rex', 'Rex'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Rank | Commander | Attack of the Clones |
| --- | --- | --- |
| Commander | ['Cody'] | ['Cody', 'Cody', 'Cody'] |
| Captain |  | ['Rex', 'Rex', 'Rex'] |

</div>

</div>

## Provenance

- [WranglesPY format.remove_duplicates implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)
- [Existing format.remove_duplicates Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/remove-duplicates.md)

## Registry metadata

- Registry ID: `283b9e78-b2b2-43d0-844f-9842c33120aa`
- Namespace: `format`
- Recipe key: `format.remove_duplicates`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.format.remove_duplicates`
- Status: `active`
- Registry version: `0.1.0-pilot`
