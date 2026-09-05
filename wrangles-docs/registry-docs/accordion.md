---
title: "Accordion"
description: "Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each element in the list and the results will be returned back as a list."
sidebar_label: "Accordion"
slug: "/accordion"
---

# Accordion

Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each element in the list and the results will be returned back as a list.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `wrangles` | Yes | array | List of wrangles to apply. | — |
| `input` | Yes | string, integer, array | The column(s) containing the list(s) that the wrangles will be applied to the elements of. | — |
| `output` | No | string, array, null | Output of the wrangles to save back to the dataframe. | `null` |
| `propagate` | No | string, array, null | Limit the column(s) that will be available to the wrangles and replicated for each element. If not specified, all columns will be propogated. This may be useful to limit the memory use for large datasets. | `null` |
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

Apply a series of wrangles to the individual elements of one or more lists.

## Migrated examples
#### Apply Convert Case to List Elements

This example applies `convert.case` to each string in a list, where the wrangle would not normally operate on the list as a whole.

##### Recipe

```yaml
wrangles:
  - accordion:
      input: list_column
      output: modified_lists
      wrangles:
        - convert.case:
            input: list_column
            output: modified_lists
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| list_column |
| --- |
| ["a", "b", "c"] |
| ["e", "f", "g"] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| list_column | modified_lists |
| --- | --- |
| ["a", "b", "c"] | ["A", "B", "C"] |
| ["e", "f", "g"] | ["E", "F", "G"] |

</div>

</div>

## Provenance

- [WranglesPY accordion implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing accordion Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/accordion.md)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: root-level runtime key
- Recipe key: `accordion`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.accordion`
- Status: `active`
- Registry version: `0.1.0-pilot`
