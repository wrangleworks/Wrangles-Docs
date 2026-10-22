---
schema_version: '0.2'
type: wrangle
id: null
wrangle_name: ai_mode
namespace: search
title: Ai Mode
description: >-
  Retrieve Google AI Mode Markdown and metadata. Use standardize.clean and extract.ai afterwards for
  cleanup and structuring.
wrangle_key: search.ai_mode
aliases: []
slug: search/ai-mode
status: active
visibility: public
recipe_writer:
  eligible: false
  reason: Automatically documented from schema; execution eligibility requires review.
tags:
  - search
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.search.ai_mode
  contract_status: verified
access:
  ai_powered: null
  requires_account: null
  requires_subscription: null
  requires_external_api_key: null
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: queries
    description: Column containing one query string per row. Explode query lists before searching.
    param_group: Options
    schema:
      type: string
      description: Column containing one query string per row. Explode query lists before searching.
    runtime_required: true
    required: true
  - name: id
    description: Input row ID column, retained in metadata.input_row_id.
    param_group: Options
    schema:
      type: string
      description: Input row ID column, retained in metadata.input_row_id.
    runtime_required: true
    required: true
  - name: output
    description: |-
      Outputs are ordered [ai_mode_results, ai_mode_metadata]. The first is
      the untouched Markdown body; the optional second is the YAML frontmatter
      as a JSON-compatible dictionary, with query, query_index, input_row_id,
      search_id, status and error. Search requests output=md. It does not parse
      headings, select references, clean the body or extract prices. Blank
      queries have status Skipped. Missing/malformed metadata, provider errors
      and empty successful answers are explicit errors; non-success rows must
      not be passed to extraction. query_config and the previous three-output
      compact/complete/Markdown contract are no longer supported.
    param_group: I/O
    schema:
      oneOf:
        - type: string
          minLength: 1
        - type: array
          minItems: 1
          maxItems: 2
          uniqueItems: true
          items:
            type: string
            minLength: 1
      description: |-
        Outputs are ordered [ai_mode_results, ai_mode_metadata]. The first is
        the untouched Markdown body; the optional second is the YAML frontmatter
        as a JSON-compatible dictionary, with query, query_index, input_row_id,
        search_id, status and error. Search requests output=md. It does not parse
        headings, select references, clean the body or extract prices. Blank
        queries have status Skipped. Missing/malformed metadata, provider errors
        and empty successful answers are explicit errors; non-success rows must
        not be passed to extraction. query_config and the previous three-output
        compact/complete/Markdown contract are no longer supported.
    runtime_required: false
    required: true
    runtime_default: null
  - name: client
    description: The client parameter.
    param_group: Options
    schema:
      type: string
      enum:
        - serpapi
      default: serpapi
    runtime_required: false
    required: false
    runtime_default: serpapi
  - name: api_key
    description: Search key; defaults to SERPAPI_API_KEY.
    param_group: Options
    schema:
      type: string
      description: Search key; defaults to SERPAPI_API_KEY.
    runtime_required: false
    required: false
    runtime_default: null
  - name: threads
    description: The threads parameter.
    param_group: Options
    schema:
      type: integer
      minimum: 1
      default: 10
    runtime_required: false
    required: false
    runtime_default: 10
  - name: include_raw_response
    description: >-
      Retain the untouched Markdown response including frontmatter under metadata.raw_response for
      trial capture and replay.
    param_group: Options
    schema:
      type: boolean
      default: false
      description: >-
        Retain the untouched Markdown response including frontmatter under metadata.raw_response for
        trial capture and replay.
    runtime_required: false
    required: false
    runtime_default: false
  - name: country
    description: 'Optional country code. Alias: gl. Null or empty means omit.'
    param_group: Options
    schema:
      type:
        - string
        - 'null'
      description: 'Optional country code. Alias: gl. Null or empty means omit.'
    runtime_required: false
    required: false
  - name: gl
    description: Optional country code; omitted unless supplied.
    param_group: Options
    schema:
      type:
        - string
        - 'null'
      description: Optional country code; omitted unless supplied.
    runtime_required: false
    required: false
  - name: language
    description: 'Optional language code. Alias: hl. Null or empty means omit.'
    param_group: Options
    schema:
      type:
        - string
        - 'null'
      description: 'Optional language code. Alias: hl. Null or empty means omit.'
    runtime_required: false
    required: false
  - name: hl
    description: Optional language code; omitted unless supplied.
    param_group: Options
    schema:
      type:
        - string
        - 'null'
      description: Optional language code; omitted unless supplied.
    runtime_required: false
    required: false
  - name: location
    description: Optional city or geographic location; omitted unless supplied.
    param_group: Options
    schema:
      type:
        - string
        - 'null'
      description: Optional city or geographic location; omitted unless supplied.
    runtime_required: false
    required: false
  - name: device
    description: Optional device override.
    param_group: Options
    schema:
      type: string
      enum:
        - desktop
        - mobile
        - tablet
      description: Optional device override.
    runtime_required: false
    required: false
examples: []
sources:
  - id: schema
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/bd5f88fba479ec406b409cb2880689c54e72b298/wrangles/recipe_wrangles/search.py
    title: WranglesPY schema
configuration_schema:
  type: object
  description: >-
    Retrieve Google AI Mode Markdown and metadata. Use standardize.clean and extract.ai afterwards
    for cleanup and structuring.
  additionalProperties: false
  required:
    - queries
    - id
    - output
  properties:
    queries:
      type: string
      description: Column containing one query string per row. Explode query lists before searching.
    id:
      type: string
      description: Input row ID column, retained in metadata.input_row_id.
    output:
      oneOf:
        - type: string
          minLength: 1
        - type: array
          minItems: 1
          maxItems: 2
          uniqueItems: true
          items:
            type: string
            minLength: 1
      description: |-
        Outputs are ordered [ai_mode_results, ai_mode_metadata]. The first is
        the untouched Markdown body; the optional second is the YAML frontmatter
        as a JSON-compatible dictionary, with query, query_index, input_row_id,
        search_id, status and error. Search requests output=md. It does not parse
        headings, select references, clean the body or extract prices. Blank
        queries have status Skipped. Missing/malformed metadata, provider errors
        and empty successful answers are explicit errors; non-success rows must
        not be passed to extraction. query_config and the previous three-output
        compact/complete/Markdown contract are no longer supported.
    client:
      type: string
      enum:
        - serpapi
      default: serpapi
    api_key:
      type: string
      description: Search key; defaults to SERPAPI_API_KEY.
    threads:
      type: integer
      minimum: 1
      default: 10
    include_raw_response:
      type: boolean
      default: false
      description: >-
        Retain the untouched Markdown response including frontmatter under metadata.raw_response for
        trial capture and replay.
    country:
      type:
        - string
        - 'null'
      description: 'Optional country code. Alias: gl. Null or empty means omit.'
    gl:
      type:
        - string
        - 'null'
      description: Optional country code; omitted unless supplied.
    language:
      type:
        - string
        - 'null'
      description: 'Optional language code. Alias: hl. Null or empty means omit.'
    hl:
      type:
        - string
        - 'null'
      description: Optional language code; omitted unless supplied.
    location:
      type:
        - string
        - 'null'
      description: Optional city or geographic location; omitted unless supplied.
    device:
      type: string
      enum:
        - desktop
        - mobile
        - tablet
      description: Optional device override.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Ai Mode

Retrieve Google AI Mode Markdown and metadata. Use standardize.clean and extract.ai afterwards for cleanup and structuring.

Usage guidance and examples have not yet been reviewed.
