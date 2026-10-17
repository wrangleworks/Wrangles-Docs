---
title: "Ai"
description: "Generate structured AI output for each recipe row."
sidebar_label: "Ai"
slug: "/generate/ai"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Ai <CopyableCode value="generate.ai" />

Generate structured AI output for each recipe row.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Target schema; string/array shorthands are expanded automatically. | string, object, array | — | Yes |
| `input` | Column(s) to concatenate into the prompt (defaults to all columns). | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `messages` | The first message's content overrides the generation instructions. | array | `null` | No |
| `web_search` | Enable DuckDuckGo context lookup per row. | boolean | `false` | No |
| `summary` | Request summary text to be merged into the output. | boolean | `false` | No |
| `examples` | Few-shot examples with input, output, and optional notes. | array | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `threads` | Maximum concurrent requests; defaults to the AI configuration. | integer | `null` | No |
| `timeout` | Per-request timeout in seconds. | integer | `null` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Number of retry attempts on failure. | integer | `null` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_key` | OpenAI-compatible API key. | string | — | Yes |
| `model` | Responses model name. Defaults to the generate.ai role in the AI configuration. | string | `null` | No |
| `url` | Override for the OpenAI-compatible endpoint. | string | `null` | No |
| `strict` | Enforce JSON-schema validation on the response. | boolean | `null` | No |
| `reasoning` | Responses API reasoning options, checked against configured model capabilities. | object | `null` | No |
| `previous_response` | Chain responses by reusing previous_response_id for field-by-field calls. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Generate structured AI output for each recipe row.",
  "additionalProperties": false,
  "required": [
    "api_key",
    "output"
  ],
  "properties": {
    "api_key": {
      "type": "string",
      "description": "OpenAI-compatible API key."
    },
    "input": {
      "type": [
        "string",
        "array"
      ],
      "description": "Column(s) to concatenate into the prompt (defaults to all columns)."
    },
    "output": {
      "type": [
        "string",
        "object",
        "array"
      ],
      "description": "Target schema; string/array shorthands are expanded automatically."
    },
    "model": {
      "type": "string",
      "description": "Responses model name. Defaults to the generate.ai role in the AI configuration."
    },
    "threads": {
      "type": "integer",
      "description": "Maximum concurrent requests; defaults to the AI configuration."
    },
    "timeout": {
      "type": "integer",
      "description": "Per-request timeout in seconds."
    },
    "retries": {
      "type": "integer",
      "description": "Number of retry attempts on failure."
    },
    "messages": {
      "type": "array",
      "description": "The first message's content overrides the generation instructions."
    },
    "url": {
      "type": "string",
      "description": "Override for the OpenAI-compatible endpoint."
    },
    "strict": {
      "type": "boolean",
      "description": "Enforce JSON-schema validation on the response."
    },
    "web_search": {
      "type": "boolean",
      "description": "Enable DuckDuckGo context lookup per row."
    },
    "reasoning": {
      "type": "object",
      "description": "Responses API reasoning options, checked against configured model capabilities."
    },
    "examples": {
      "type": "array",
      "description": "Few-shot examples with input, output, and optional notes."
    },
    "previous_response": {
      "type": "boolean",
      "description": "Chain responses by reusing previous_response_id for field-by-field calls."
    },
    "summary": {
      "type": "boolean",
      "description": "Request summary text to be merged into the output."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    }
  }
}
```

</details>

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
| Catalog ID | `39` |
| Catalog key | `generate.ai` |
| Recipe key | `generate.ai` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `generate` |
| Documentation group | `generate` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.generate.ai` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `12c31c6c-cade-484d-84ba-7f302bf6af52` |

**Sources**

- [WranglesPY generate.ai implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/generate.py)
- [Archived generate.ai Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/ai/_sources/ai.md)

</details>
