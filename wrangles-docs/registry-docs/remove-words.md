---
title: "Remove Words"
description: "Remove all the elements that occur in one list from another."
sidebar_label: "Remove Words"
slug: "/remove-words"
---

# Remove Words

Remove all the elements that occur in one list from another.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of column to remove words from. | — |
| `to_remove` | Yes | string | Column or list of columns with a list of words to be removed. | — |
| `output` | No | string, array, null | Name of the output columns. | `null` |
| `tokenize_to_remove` | No | boolean | Tokenize all to_remove inputs. | `false` |
| `ignore_case` | No | boolean | Ignore input and to_remove case. | `true` |
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

Remove all the elements that occur in one list from another.

## Migrated examples
#### Removing Words From a Column

##### Recipe

```yaml
wrangles:
   - remove_words:
        input: Description
        to_remove: # To Remove columns must be list
          - Materials
          - Colours
        output: Product
        tokenize_to_remove: True
        ignore_case: False
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Colours | Materials | Description |
| --- | --- | --- |
| ['Blue'] | ['Steel'] | Steel Blue Bottle |
| ['Blue'] | ['Steel'] | ['Steel', 'Blue', 'Bottle'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product |
| --- |
| Bottle |
| Bottle |

</div>

</div>

## Provenance

- [WranglesPY remove_words implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing remove_words Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/remove-words.md)

## Registry metadata

- Registry ID: `543b96c3-f354-48be-8046-bf0cb9fbaf56`
- Namespace: root-level runtime key
- Recipe key: `remove_words`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.remove_words`
- Status: `active`
- Registry version: `0.1.0-pilot`
