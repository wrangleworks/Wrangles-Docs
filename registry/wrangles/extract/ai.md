---
schema_version: '0.2'
type: wrangle
id: d9f89b00-fda3-4f4c-826c-6417b9390607
wrangle_name: ai
namespace: extract
title: AI
description: >-
  Extract structured data from each input row using an AI model. Define the desired fields with
  output, or reuse a saved definition with model_id.
wrangle_key: extract.ai
aliases: []
slug: extract/ai
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - ai
  - extract
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.ai
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
    description: OpenAI API key used for this wrangle, normally supplied through a recipe variable.
    required: true
    param_group: Details
    schema:
      type: string
  - name: input
    description: >-
      Input column name, column index, or list of columns supplied together as DATA for each row. If
      omitted, all dataframe columns are supplied.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - array
        - 'null'
      items:
        type:
          - string
          - integer
  - name: output
    description: >-
      Desired extraction. Use an object keyed by output column name for structured fields, a string
      for one prompted value, or an array of field names/definitions. Each field may use the schema
      options below.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - object
        - 'null'
      patternProperties:
        ^[a-zA-Z0-9 _-]+$:
          type:
            - object
            - string
          properties:
            type:
              type: string
              description: >-
                JSON data type required for this field. If omitted, common scalar types are
                accepted. Fields allow null by default.
              enum:
                - string
                - number
                - integer
                - boolean
                - 'null'
                - object
                - array
            enum:
              type: array
            examples:
              type:
                - array
                - object
                - string
                - number
                - integer
                - boolean
                - 'null'
              properties:
                name:
                  type: string
                notes:
                  type: string
                input: {}
                output: {}
              items:
                anyOf:
                  - type: object
                    required:
                      - input
                      - output
                    properties:
                      name:
                        type: string
                      notes:
                        type: string
                      input: {}
                      output: {}
                  - {}
            properties:
              type:
                - object
                - array
                - string
            required:
              type:
                - array
                - string
            additionalProperties:
              type:
                - boolean
                - object
            items:
              type: object
            nullable:
              type: boolean
  - name: model_id
    description: >-
      ID of a saved extract.ai definition. Use it instead of defining an output schema. When output
      is also supplied with model_id in a recipe, output names the destination column or columns for
      the saved fields.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: record_examples
    description: >-
      Whole-record examples. Each example has a separate input value or record and the complete
      expected output record. Optional name and notes provide model-visible context. Use {name: ...,
      notes: ..., input: ..., output: ...}. Omitted nullable output fields are completed with null.
      Required non-null nested properties must be supplied. This differs from examples nested under
      one output field, which teach only that field.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - array
        - object
        - 'null'
      required:
        - input
        - output
      properties:
        name:
          type: string
        notes:
          type: string
        input: {}
        output: {}
      items:
        type: object
        required:
          - input
          - output
        properties:
          name:
            type: string
          notes:
            type: string
          input: {}
          output: {}
  - name: output_format
    description: >-
      How extracted fields are written. columns writes one dataframe column per field (default);
      dictionary keeps one object; concatenate joins fields into one string using char.
    required: false
    param_group: Formatting
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - dictionary
        - columns
        - concatenate
  - name: char
    description: Separator used only when output_format is concatenate. Defaults to comma-space.
    required: false
    param_group: Formatting
    runtime_default: ', '
    schema:
      type: string
  - name: web_search
    description: >-
      Enable OpenAI Responses web search; the model decides when searching helps. When true, every
      row also receives web_search_sources: a deduplicated list of {title, url} objects in source
      order, or an empty list when no source was used. This reserved column is automatic. Requires
      protocol responses. Defaults to false.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: instructions
    description: >-
      Additional guidance applied to every input row. Use this for decision rules, evidence
      priorities, normalization requirements, or other behavior that applies to the complete
      extraction.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
      items:
        type: string
  - name: model
    description: >-
      OpenAI model ID for this call. If omitted, uses the configured extract.ai default; a saved
      model definition may supply its own model.
    required: false
    param_group: Details
    schema:
      type: string
  - name: threads
    description: Maximum number of row-level requests sent in parallel. The configured default is 32.
    required: false
    param_group: Execution
    schema:
      type: integer
      minimum: 1
  - name: timeout
    description: >-
      Maximum seconds for one HTTP attempt. The configured default is 12; deadline can end the
      overall call sooner.
    required: false
    param_group: Execution
    schema:
      type: number
      exclusiveMinimum: 0
  - name: retries
    description: >-
      Number of additional attempts after a retryable failure. The configured default is 1. Backoff
      and request timeouts remain bounded by deadline.
    required: false
    param_group: Errors
    schema:
      type: integer
      minimum: 0
  - name: url
    description: >-
      Override the endpoint for the selected protocol. A chat/completions URL selects the legacy
      protocol only when protocol is omitted; new recipes should use the configured Responses
      endpoint.
    required: false
    param_group: Details
    schema:
      type: string
  - name: provider
    description: AI service provider. Currently only OpenAI is supported.
    required: false
    param_group: Details
    schema:
      type: string
      enum:
        - openai
  - name: protocol
    description: >-
      OpenAI API protocol. Responses is the configured default and is required for web_search;
      chat_completions remains available for legacy definitions.
    required: false
    param_group: Details
    schema:
      type: string
      enum:
        - responses
        - chat_completions
  - name: deadline
    description: >-
      Total seconds allowed for the entire wrangle call, including queued work, retries, and
      backoff. The configured default is 15.
    required: false
    param_group: Execution
    schema:
      type: number
      exclusiveMinimum: 0
  - name: store
    description: Whether OpenAI may store Responses API results. Defaults to false.
    required: false
    param_group: Details
    schema:
      type: boolean
  - name: cache
    description: >-
      Reuse identical successful results from the bounded warm-instance cache. Defaults to true. Set
      false when fresh model or web results are required.
    required: false
    param_group: Details
    schema:
      type: boolean
  - name: cache_ttl
    description: >-
      Maximum age in seconds for a cached result used by this call. Applies to extracted values and
      web_search_sources together.
    required: false
    param_group: Details
    schema:
      type: number
      exclusiveMinimum: 0
  - name: strict
    description: >-
      Require OpenAI structured-output strict mode. Defaults to true. Definitions with dynamic
      dictionary keys automatically switch to non-strict provider mode and are still validated
      locally.
    required: false
    param_group: Details
    schema:
      type: boolean
  - name: reasoning
    description: >-
      Responses API reasoning controls. Set effort for reasoning-capable models. The configured
      default is none when that model supports it; otherwise the provider default applies.
    required: false
    param_group: Details
    schema:
      type: object
      properties:
        effort:
          type: string
          enum:
            - none
            - minimal
            - low
            - medium
            - high
            - xhigh
  - name: verbosity
    description: >-
      Responses API text verbosity for compatible models. Defaults to low when supported; ignored
      with a warning for incompatible models.
    required: false
    param_group: Details
    schema:
      type: string
      enum:
        - low
        - medium
        - high
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.ai implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/ai.md
    title: Existing extract.ai Markdown
---

# AI

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
