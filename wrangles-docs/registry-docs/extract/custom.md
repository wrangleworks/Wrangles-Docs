---
title: "Custom"
description: "Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription."
sidebar_label: "Custom"
slug: "/extract/custom"
---

# Custom

Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or list of input columns. | — |
| `model_id` | Yes | string, array | The ID of the wrangle to use. | — |
| `output` | No | string, array, null | Name or list of output columns. | `null` |
| `use_labels` | No | boolean | Use Labels in the extract output &#123;label: value&#125;. | `false` |
| `first_element` | No | boolean | Get the first element from results. | `false` |
| `case_sensitive` | No | boolean | Allows the wrangle to be case sensitive if set to True, default is False. | `false` |
| `extract_raw` | No | boolean | Extract the raw data from the wrangle. | `false` |
| `use_spellcheck` | No | boolean | Use spellcheck to also find minor mispellings compared to the reference data. | `false` |
| `include_empty_labels` | No | boolean | Include labels with no found values in the output when using use_labels=True. | `true` |
| `sort` | No | string; one of: training_order, input_order, longest, shortest, alphabetical, reverse_alphabetical, ascending, descending | Sort the results. | `"training_order"` |
| `output_format` | No | string, null; one of: list, dictionary, columns, concatenate | Format of the extract output. | `null` |
| `char` | No | string | Character to use when output_format is concatenate. | `", "` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | Yes |
| requires subscription | No |
| requires external api key | No |

## Guidance

Extract data from the input using a DIY or bespoke extraction wrangle. Can be performed on one column or multiple columns. Requires WrangleWorks Account and Subscription.

:::info
Non-regex pattern matching extracts whole-word matches separated by word boundaries. Word boundaries include anything that is not a letter, number, or underscore.
:::

## Migrated examples
#### Extracting Wood Types From Single Column

##### Recipe

```yaml
# One column input
wrangles:
  - extract.custom:
      input: Product
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Wood Types |
| --- | --- |
| Dining Oakwood Chair | Oakwood |
| Living Room Teakwood Frame Mirror | Teakwood |

</div>

</div>

#### Extracting Wood Types From Multiple Columns

##### Recipe

```yaml
# Multi column input
wrangles:
  - extract.custom:
      input:
        - Part 1 of 2
        - Part 2 of 2
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Wood Types | Part 1 of 2 | Part 2 of 2 |
| --- | --- | --- |
| ['Acacia Wood', 'Imitation Wood'] | Dining Acacia Wood Table | Imitation Wood Table Chairs |

</div>

</div>

#### Using Multiple Extract Models

##### Recipe

```yaml
# Multiple Models
wrangles:
  - extract.custom:
      input:
        - Product
        - Product
      output:
        - Wood Types
        - Item Type
      model_id:
        - wood_Type_model_id
        - item_type_model_id
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Item Type | Wood Types |
| --- | --- | --- |
| Dining Oakwood Chair | Chair | Oakwood |
| Living Room Teakwood Frame Mirror | Mirror | Teakwood |

</div>

</div>

## Provenance

- [WranglesPY extract.custom implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.custom Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/custom.md)

## Registry metadata

- Registry ID: `e8e96b76-86bf-41dc-8d16-825dcff9688b`
- Namespace: `extract`
- Recipe key: `extract.custom`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.custom`
- Status: `active`
- Registry version: `0.1.0-pilot`
