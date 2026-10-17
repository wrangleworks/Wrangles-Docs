---
schema_version: '0.2'
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
recipe_writer:
  eligible: true
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
      description: OpenAI-compatible API key.
    runtime_required: true
  - name: output
    description: Target schema; string/array shorthands are expanded automatically.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - object
        - array
      description: Target schema; string/array shorthands are expanded automatically.
    runtime_required: true
  - name: input
    description: Column(s) to concatenate into the prompt (defaults to all columns).
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: Column(s) to concatenate into the prompt (defaults to all columns).
    runtime_required: false
  - name: model
    description: Responses model name. Defaults to the generate.ai role in the AI configuration.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: string
      description: Responses model name. Defaults to the generate.ai role in the AI configuration.
    runtime_required: false
  - name: threads
    description: Maximum concurrent requests; defaults to the AI configuration.
    required: false
    param_group: Execution
    runtime_default: null
    schema:
      type: integer
      description: Maximum concurrent requests; defaults to the AI configuration.
    runtime_required: false
  - name: timeout
    description: Per-request timeout in seconds.
    required: false
    param_group: Execution
    runtime_default: null
    schema:
      type: integer
      description: Per-request timeout in seconds.
    runtime_required: false
  - name: retries
    description: Number of retry attempts on failure.
    required: false
    param_group: Errors
    runtime_default: null
    schema:
      type: integer
      description: Number of retry attempts on failure.
    runtime_required: false
  - name: messages
    description: The first message's content overrides the generation instructions.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type: array
      description: The first message's content overrides the generation instructions.
    runtime_required: false
  - name: url
    description: Override for the OpenAI-compatible endpoint.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: string
      description: Override for the OpenAI-compatible endpoint.
    runtime_required: false
  - name: strict
    description: Enforce JSON-schema validation on the response.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: boolean
      description: Enforce JSON-schema validation on the response.
    runtime_required: false
  - name: web_search
    description: Enable DuckDuckGo context lookup per row.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
      description: Enable DuckDuckGo context lookup per row.
    runtime_required: false
  - name: reasoning
    description: Responses API reasoning options, checked against configured model capabilities.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: object
      description: Responses API reasoning options, checked against configured model capabilities.
    runtime_required: false
  - name: previous_response
    description: Chain responses by reusing previous_response_id for field-by-field calls.
    required: false
    param_group: Details
    runtime_default: false
    schema:
      type: boolean
      description: Chain responses by reusing previous_response_id for field-by-field calls.
    runtime_required: false
  - name: summary
    description: Request summary text to be merged into the output.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
      description: Request summary text to be merged into the output.
    runtime_required: false
  - name: examples
    description: Few-shot examples with input, output, and optional notes.
    param_group: Options
    schema:
      type: array
      description: Few-shot examples with input, output, and optional notes.
    required: false
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/generate.py
    title: WranglesPY generate.ai implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/ai/_sources/ai.md
    title: Archived generate.ai Markdown
configuration_schema:
  type: object
  description: Generate structured AI output for each recipe row.
  additionalProperties: false
  required:
    - api_key
    - output
  properties:
    api_key:
      type: string
      description: OpenAI-compatible API key.
    input:
      type:
        - string
        - array
      description: Column(s) to concatenate into the prompt (defaults to all columns).
    output:
      type:
        - string
        - object
        - array
      description: Target schema; string/array shorthands are expanded automatically.
    model:
      type: string
      description: Responses model name. Defaults to the generate.ai role in the AI configuration.
    threads:
      type: integer
      description: Maximum concurrent requests; defaults to the AI configuration.
    timeout:
      type: integer
      description: Per-request timeout in seconds.
    retries:
      type: integer
      description: Number of retry attempts on failure.
    messages:
      type: array
      description: The first message's content overrides the generation instructions.
    url:
      type: string
      description: Override for the OpenAI-compatible endpoint.
    strict:
      type: boolean
      description: Enforce JSON-schema validation on the response.
    web_search:
      type: boolean
      description: Enable DuckDuckGo context lookup per row.
    reasoning:
      type: object
      description: Responses API reasoning options, checked against configured model capabilities.
    examples:
      type: array
      description: Few-shot examples with input, output, and optional notes.
    previous_response:
      type: boolean
      description: Chain responses by reusing previous_response_id for field-by-field calls.
    summary:
      type: boolean
      description: Request summary text to be merged into the output.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
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
