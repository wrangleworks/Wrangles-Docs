---
title: "Ai"
description: "Generate structured AI output for each recipe row."
sidebar_label: "Ai"
slug: "/generate/ai"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Ai

Generate structured AI output for each recipe row.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Target schema; string/array shorthands are expanded automatically. | string, array, object | — | Yes |
| `input` | Column(s) to concatenate into the prompt (defaults to all columns). | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `messages` | Optional extra messages forwarded to the inner generate helper. | array, object, null | `null` | No |
| `web_search` | Enable DuckDuckGo context lookup per row. | boolean | `false` | No |
| `summary` | Request summary text to be merged into the output. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `threads` | Maximum concurrent requests (default 20). | integer | `20` | No |
| `timeout` | Per-request timeout in seconds. | integer | `90` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Number of retry attempts on failure. | integer | `0` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_key` | OpenAI-compatible API key. | string | — | Yes |
| `model` | Responses model name (e.g. gpt-5-mini). | string | `"gpt-5"` | No |
| `url` | Override for the OpenAI-compatible endpoint. | string | `"https://api.openai.com/v1/responses"` | No |
| `strict` | Enforce JSON-schema validation on the response. | boolean | `false` | No |
| `reasoning` | Responses API reasoning options (forwarded verbatim). | string, object | `{"effort":"low"}` | No |
| `previous_response` | Chain responses by reusing previous_response_id for field-by-field calls. | boolean | `false` | No |

</div>

## Examples

This template generates a category from a product description. AI-generated values can vary by model and request.



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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Description |
| --- |
| Stainless steel insulated water bottle, 750 ml |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Category |
| --- |
| Drinkware |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

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
| Recipe key | `generate.ai` |
| Lifecycle status | active |
| Namespace | `generate` |
| Documentation group | `generate` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.generate.ai` |

**Sources**

- [WranglesPY generate.ai implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/generate.py)
- [Existing generate.ai Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/ai/_sources/ai.md)

</details>
