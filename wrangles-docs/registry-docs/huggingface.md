---
title: "Huggingface"
description: "Use a model from huggingface."
sidebar_label: "Huggingface"
slug: "/huggingface"
---

# Huggingface

Use a model from huggingface.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `api_token` | Yes | string | Huggingface API Token. | — |
| `model` | Yes | string | Name of the model to use. e.g. facebook/bart-large-cnn. | — |
| `output` | No | string, array, null | Name of the output column. If not provided, will overwrite the input column. | `null` |
| `parameters` | No | object, null | Optionally, provide additional parameters to define the model behaviour. | `null` |
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

Use a model from huggingface

## Migrated examples
#### Summarize Product Descriptions

This template uses a Hugging Face summarization model. The exact response shape and text depend on the selected model.

##### Recipe

```yaml
wrangles:
  - huggingface:
      input:
        - Product Description
      output:
        - Summary
      api_token: Your Hugging Face API token
      model: facebook/bart-large-cnn
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Description |
| --- |
| A cordless drill with two batteries, a charger, and a compact carrying case. |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Description | Summary |
| --- | --- |
| A cordless drill with two batteries, a charger, and a compact carrying case. | Cordless drill kit with batteries, charger, and case. |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

## Provenance

- [WranglesPY huggingface implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing huggingface Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/ai/_sources/huggingface.md)

## Registry metadata

- Registry ID: `ae12cf20-4934-428f-84a9-a6898cb7ffe0`
- Namespace: root-level runtime key
- Recipe key: `huggingface`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.huggingface`
- Status: `active`
- Registry version: `0.1.0-pilot`
