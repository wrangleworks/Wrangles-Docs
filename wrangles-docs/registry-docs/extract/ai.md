---
title: "AI"
description: "Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id."
sidebar_label: "AI"
slug: "/extract/ai"
---

# AI

Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `api_key` | Yes | string | OpenAI API key used for this wrangle, normally supplied through a recipe variable. | — |
| `input` | No | array, null | Input column name, column index, or list of columns supplied together as DATA for each row. If omitted, all dataframe columns are supplied. | `null` |
| `output` | No | string, array, object, null | Desired extraction. Use an object keyed by output column name for structured fields, a string for one prompted value, or an array of field names/definitions. Each field may use the schema options below. | `null` |
| `model_id` | No | string, null | ID of a saved extract.ai definition. Use it instead of defining an output schema. When output is also supplied with model_id in a recipe, output names the destination column or columns for the saved fields. | `null` |
| `record_examples` | No | array, object, null | Whole-record examples. Each example has a separate input value or record and the complete expected output record. Optional name and notes provide model-visible context. Use &#123;name: ..., notes: ..., input: ..., output: ...&#125;. Omitted nullable output fields are completed with null. Required non-null nested properties must be supplied. This differs from examples nested under one output field, which teach only that field. | `null` |
| `output_format` | No | string, null; one of: dictionary, columns, concatenate | How extracted fields are written. columns writes one dataframe column per field (default); dictionary keeps one object; concatenate joins fields into one string using char. | `null` |
| `char` | No | string | Separator used only when output_format is concatenate. Defaults to comma-space. | `", "` |
| `web_search` | No | boolean | Enable OpenAI Responses web search; the model decides when searching helps. When true, every row also receives web_search_sources: a deduplicated list of &#123;title, url&#125; objects in source order, or an empty list when no source was used. This reserved column is automatic. Requires protocol responses. Defaults to false. | `false` |
| `instructions` | No | string, array, null | Additional guidance applied to every input row. Use this for decision rules, evidence priorities, normalization requirements, or other behavior that applies to the complete extraction. | `null` |
| `model` | No | string | OpenAI model ID for this call. If omitted, uses the configured extract.ai default; a saved model definition may supply its own model. | — |
| `threads` | No | integer | Maximum number of row-level requests sent in parallel. The configured default is 32. | — |
| `timeout` | No | number | Maximum seconds for one HTTP attempt. The configured default is 12; deadline can end the overall call sooner. | — |
| `retries` | No | integer | Number of additional attempts after a retryable failure. The configured default is 1. Backoff and request timeouts remain bounded by deadline. | — |
| `url` | No | string | Override the endpoint for the selected protocol. A chat/completions URL selects the legacy protocol only when protocol is omitted; new recipes should use the configured Responses endpoint. | — |
| `provider` | No | string; one of: openai | AI service provider. Currently only OpenAI is supported. | — |
| `protocol` | No | string; one of: responses, chat_completions | OpenAI API protocol. Responses is the configured default and is required for web_search; chat_completions remains available for legacy definitions. | — |
| `deadline` | No | number | Total seconds allowed for the entire wrangle call, including queued work, retries, and backoff. The configured default is 15. | — |
| `store` | No | boolean | Whether OpenAI may store Responses API results. Defaults to false. | — |
| `cache` | No | boolean | Reuse identical successful results from the bounded warm-instance cache. Defaults to true. Set false when fresh model or web results are required. | — |
| `cache_ttl` | No | number | Maximum age in seconds for a cached result used by this call. Applies to extracted values and web_search_sources together. | — |
| `strict` | No | boolean | Require OpenAI structured-output strict mode. Defaults to true. Definitions with dynamic dictionary keys automatically switch to non-strict provider mode and are still validated locally. | — |
| `reasoning` | No | object | Responses API reasoning controls. Set effort for reasoning-capable models. The configured default is none when that model supports it; otherwise the provider default applies. | — |
| `verbosity` | No | string; one of: low, medium, high | Responses API text verbosity for compatible models. Defaults to low when supported; ignored with a warning for incompatible models. | — |
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

Use AI to extract meaningful structured data. `extract.ai` can be used recipe-first, where the output schema is defined in the recipe, or model-first, where a saved extract.ai model is called by `model_id`.

:::info
For saved extract.ai models, this is the preferred calling pattern compared with using `extract.custom`.
:::

## Migrated examples
#### Making Use of Output Parameters

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      input: Product Specs
      output:
        Blade Diameter:
          type: number
          description: The diameter of the blade used, reported in inches.
          default: N/A
          examples:
            - 4.5"
            - 8 inch
        Max. RPM:
          type: number
          description: The maximum rotations per minute (rpm).
          default: 3600
          examples:
            - 3600 max. rpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>

#### Description Only

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      input: Product Specs
      output:
        Blade Diameter: The diameter of the blade used, reported in inches.
        Max. RPM: The maximum rotations per minute (rpm).
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>

#### Model Based Column Output by Name

##### Recipe

```yaml
wrangles:
  - extract.ai:
      api_key: Your OpenAI api key
      model_id: xxxx-xxxx-xxxxxxxx
      output:
        - Colors
        - Sizes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Items |
| --- |
| Large yellow square |
| Medium orange triangle |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Colors | Sizes |
| --- | --- |
| [yellow] | Large |
| [orange] | Medium |

</div>

</div>

## Provenance

- [WranglesPY extract.ai implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.ai Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/ai.md)

## Registry metadata

- Registry ID: `d9f89b00-fda3-4f4c-826c-6417b9390607`
- Namespace: `extract`
- Recipe key: `extract.ai`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.ai`
- Status: `active`
- Registry version: `0.1.0-pilot`
