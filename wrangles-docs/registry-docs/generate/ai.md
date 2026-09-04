---
title: "Ai"
description: "Generate structured AI output for each recipe row."
sidebar_label: "Ai"
slug: "/generate/ai"
---

# Ai

Generate structured AI output for each recipe row.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `api_key` | Yes | string | OpenAI-compatible API key. | — |
| `output` | Yes | string, array, object | Target schema; string/array shorthands are expanded automatically. | — |
| `input` | No | string, array, null | Column(s) to concatenate into the prompt (defaults to all columns). | `null` |
| `model` | No | string | Responses model name (e.g. gpt-5-mini). | `"gpt-5"` |
| `threads` | No | integer | Maximum concurrent requests (default 20). | `20` |
| `timeout` | No | integer | Per-request timeout in seconds. | `90` |
| `retries` | No | integer | Number of retry attempts on failure. | `0` |
| `messages` | No | array, object, null | Optional extra messages forwarded to the inner generate helper. | `null` |
| `url` | No | string | Override for the OpenAI-compatible endpoint. | `"https://api.openai.com/v1/responses"` |
| `strict` | No | boolean | Enforce JSON-schema validation on the response. | `false` |
| `web_search` | No | boolean | Enable DuckDuckGo context lookup per row. | `false` |
| `reasoning` | No | string, object | Responses API reasoning options (forwarded verbatim). | `{"effort":"low"}` |
| `previous_response` | No | boolean | Chain responses by reusing previous_response_id for field-by-field calls. | `false` |
| `summary` | No | boolean | Request summary text to be merged into the output. | `false` |
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

Generate structured AI output for each recipe row.

## Migrated examples
#### Generate Structured Product Data

This template generates a category from a product description. AI-generated values can vary by model and request.

##### Recipe

```yaml
wrangles:
  - generate.ai:
      input:
        - Product Description
      output:
        Category:
          type: string
          description: Broad product category
      api_key: Your OpenAI-compatible API key
      model: gpt-5-mini
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Description |
| --- |
| Stainless steel insulated water bottle, 750 ml |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Description | Category |
| --- | --- |
| Stainless steel insulated water bottle, 750 ml | Drinkware |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

## Provenance

- [WranglesPY generate.ai implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/generate.py)
- [Existing generate.ai Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/ai/_sources/ai.md)

## Registry metadata

- Registry ID: `12c31c6c-cade-484d-84ba-7f302bf6af52`
- Namespace: `generate`
- Recipe key: `generate.ai`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.generate.ai`
- Status: `active`
- Registry version: `0.1.0-pilot`
