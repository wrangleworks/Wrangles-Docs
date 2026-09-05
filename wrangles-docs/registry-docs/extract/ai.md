---
title: "AI"
description: "Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id."
sidebar_label: "AI"
slug: "/extract/ai"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# AI

Extract structured data from each input row using an AI model. Define the desired fields with output, or reuse a saved definition with model_id.

Use AI to extract meaningful structured data. `extract.ai` can be used recipe-first, where the output schema is defined in the recipe, or model-first, where a saved extract.ai model is called by `model_id`.

:::info
For saved extract.ai models, this is the preferred calling pattern compared with using `extract.custom`.
:::

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Input column name, column index, or list of columns supplied together as DATA for each row. If omitted, all dataframe columns are supplied. | array, null | `null` | No |
| `output` | Desired extraction. Use an object keyed by output column name for structured fields, a string for one prompted value, or an array of field names/definitions. Each field may use the schema options below. | string, array, object, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `record_examples` | Whole-record examples. Each example has a separate input value or record and the complete expected output record. Optional name and notes provide model-visible context. Use &#123;name: ..., notes: ..., input: ..., output: ...&#125;. Omitted nullable output fields are completed with null. Required non-null nested properties must be supplied. This differs from examples nested under one output field, which teach only that field. | array, object, null | `null` | No |
| `web_search` | Enable OpenAI Responses web search; the model decides when searching helps. When true, every row also receives web_search_sources: a deduplicated list of &#123;title, url&#125; objects in source order, or an empty list when no source was used. This reserved column is automatic. Requires protocol responses. Defaults to false. | boolean | `false` | No |
| `instructions` | Additional guidance applied to every input row. Use this for decision rules, evidence priorities, normalization requirements, or other behavior that applies to the complete extraction. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | How extracted fields are written. columns writes one dataframe column per field (default); dictionary keeps one object; concatenate joins fields into one string using char. | string, null; one of:<ul className="ww-param-enum-values"><li>dictionary</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Separator used only when output_format is concatenate. Defaults to comma-space. | string | `", "` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `threads` | Maximum number of row-level requests sent in parallel. The configured default is 32. | integer | — | No |
| `timeout` | Maximum seconds for one HTTP attempt. The configured default is 12; deadline can end the overall call sooner. | number | — | No |
| `deadline` | Total seconds allowed for the entire wrangle call, including queued work, retries, and backoff. The configured default is 15. | number | — | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Number of additional attempts after a retryable failure. The configured default is 1. Backoff and request timeouts remain bounded by deadline. | integer | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_key` | OpenAI API key used for this wrangle, normally supplied through a recipe variable. | string | — | Yes |
| `model_id` | ID of a saved extract.ai definition. Use it instead of defining an output schema. When output is also supplied with model_id in a recipe, output names the destination column or columns for the saved fields. | string, null | `null` | No |
| `model` | OpenAI model ID for this call. If omitted, uses the configured extract.ai default; a saved model definition may supply its own model. | string | — | No |
| `url` | Override the endpoint for the selected protocol. A chat/completions URL selects the legacy protocol only when protocol is omitted; new recipes should use the configured Responses endpoint. | string | — | No |
| `provider` | AI service provider. Currently only OpenAI is supported. | string; one of:<ul className="ww-param-enum-values"><li>openai</li></ul> | — | No |
| `protocol` | OpenAI API protocol. Responses is the configured default and is required for web_search; chat_completions remains available for legacy definitions. | string; one of:<ul className="ww-param-enum-values"><li>responses</li><li>chat_completions</li></ul> | — | No |
| `store` | Whether OpenAI may store Responses API results. Defaults to false. | boolean | — | No |
| `cache` | Reuse identical successful results from the bounded warm-instance cache. Defaults to true. Set false when fresh model or web results are required. | boolean | — | No |
| `cache_ttl` | Maximum age in seconds for a cached result used by this call. Applies to extracted values and web_search_sources together. | number | — | No |
| `strict` | Require OpenAI structured-output strict mode. Defaults to true. Definitions with dynamic dictionary keys automatically switch to non-strict provider mode and are still validated locally. | boolean | — | No |
| `reasoning` | Responses API reasoning controls. Set effort for reasoning-capable models. The configured default is none when that model supports it; otherwise the provider default applies. | object | — | No |
| `verbosity` | Responses API text verbosity for compatible models. Defaults to low when supported; ignored with a warning for incompatible models. | string; one of:<ul className="ww-param-enum-values"><li>low</li><li>medium</li><li>high</li></ul> | — | No |

</div>

## Examples

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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>





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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Specs |
| --- |
| 18V Cordless 4.5in angle grinder |
| 120V 12in chop saw 3600 max. rpm |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Blade Diameter | Max. RPM |
| --- | --- |
| 4.5 inches |  |
| 12 inches | 3600 |

</div>

</div>





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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Items |
| --- |
| Large yellow square |
| Medium orange triangle |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Colors | Sizes |
| --- | --- |
| [yellow] | Large |
| [orange] | Medium |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | `extract.ai` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.ai` |

**Sources**

- [WranglesPY extract.ai implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.ai Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/ai.md)

</details>
