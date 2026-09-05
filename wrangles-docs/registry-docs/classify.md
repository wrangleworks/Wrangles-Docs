---
title: "Classify"
description: "Run classify wrangles on the specified columns. Requires WrangleWorks Account and Subscription."
sidebar_label: "Classify"
slug: "/classify"
---

# Classify

Run classify wrangles on the specified columns. Requires WrangleWorks Account and Subscription.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | Yes | string, array | Name of the output column. | — |
| `model_id` | Yes | string | ID of the classification model to be used. | — |
| `include_confidence` | No | boolean | For models that support it, include the confidence level in the output. | — |
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

Run a custom classification wrangle on the specified column or columns. A classification wrangle must be trained first.

## Migrated examples
#### Food Type Example

##### Recipe

```yaml
wrangles:
  - classify:
      input: Products
      output: Category
      model_id: ${model_id}
      where: Products = Milk
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| Rice |
| Milk |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Category |
| --- | --- |
| Rice |  |
| Milk | Dairy |

</div>

</div>

## Provenance

- [WranglesPY classify implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing classify Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/ai/_sources/classify.md)

## Registry metadata

- Registry ID: `06669ef8-cdd1-42f7-8078-98e0b7a42c30`
- Namespace: root-level runtime key
- Recipe key: `classify`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.classify`
- Status: `active`
- Registry version: `0.1.0-pilot`
