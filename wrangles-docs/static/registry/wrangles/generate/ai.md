---
schema_version: '0.1'
type: wrangle
id: 12c31c6c-cade-484d-84ba-7f302bf6af52
wrangle_name: ai
namespace: generate
title: Ai
description: Generate structured AI output for each recipe row.
wrangle_key: generate.ai
aliases: []
slug: generate/ai
status: active
visibility: public
tags:
  - ai
  - generate
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.generate.ai
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: api_key
    description: OpenAI-compatible API key.
    required: true
    param_group: Details
    schema:
      type: string
  - name: output
    description: Target schema; string/array shorthands are expanded automatically.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
        - object
  - name: input
    description: Column(s) to concatenate into the prompt (defaults to all columns).
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: model
    description: Responses model name (e.g. gpt-5-mini).
    required: false
    param_group: Details
    runtime_default: gpt-5
    schema:
      type: string
  - name: threads
    description: Maximum concurrent requests (default 20).
    required: false
    param_group: Execution
    runtime_default: 20
    schema:
      type: integer
  - name: timeout
    description: Per-request timeout in seconds.
    required: false
    param_group: Execution
    runtime_default: 90
    schema:
      type: integer
  - name: retries
    description: Number of retry attempts on failure.
    required: false
    param_group: Errors
    runtime_default: 0
    schema:
      type: integer
  - name: messages
    description: Optional extra messages forwarded to the inner generate helper.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - array
        - object
        - 'null'
  - name: url
    description: Override for the OpenAI-compatible endpoint.
    required: false
    param_group: Details
    runtime_default: https://api.openai.com/v1/responses
    schema:
      type: string
  - name: strict
    description: Enforce JSON-schema validation on the response.
    required: false
    param_group: Details
    runtime_default: false
    schema:
      type: boolean
  - name: web_search
    description: Enable DuckDuckGo context lookup per row.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: reasoning
    description: Responses API reasoning options (forwarded verbatim).
    required: false
    param_group: Details
    runtime_default:
      effort: low
    schema:
      type:
        - string
        - object
  - name: previous_response
    description: Chain responses by reusing previous_response_id for field-by-field calls.
    required: false
    param_group: Details
    runtime_default: false
    schema:
      type: boolean
  - name: summary
    description: Request summary text to be merged into the output.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/generate.py
    title: WranglesPY generate.ai implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/ai/_sources/ai.md
    title: Existing generate.ai Markdown
---

# Ai

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
