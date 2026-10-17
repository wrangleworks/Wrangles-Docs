---
schema_version: '0.2'
type: wrangle
id: 3d5faa87-9e96-48c0-8226-5ae566e8d76c
wrangle_name: retrieve_link_content
namespace: search
title: Retrieve Link Content
description: >-
  Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second
  column containing a clean, human-readable text summary of the retrieved data.
wrangle_key: search.retrieve_link_content
aliases: []
slug: search/retrieve-link-content
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - search
  - retrieve-link-content
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.search.retrieve_link_content
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
  - name: input
    description: Name or list of input columns containing URLs or Scored Search Result dictionaries.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
      description: Name or list of input columns containing URLs or Scored Search Result dictionaries.
    runtime_required: true
  - name: output
    description: >-
      Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and
      the formatted text, provide a list of exactly two column names (e.g., [page_data, page_text]).
    required: true
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: >-
        Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and
        the formatted text, provide a list of exactly two column names (e.g., [page_data,
        page_text]).
    runtime_required: false
  - name: client
    description: The retrieval provider to use.
    required: false
    param_group: Details
    runtime_default: google_url_context
    schema:
      type: string
      description: The retrieval provider to use.
      enum:
        - google_url_context
      default: google_url_context
    runtime_required: false
  - name: api_key
    description: API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY).
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: string
      description: API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY).
    runtime_required: false
  - name: prompt
    description: >-
      Optional custom system prompt. Use {{ column_name }} to insert values from the full input row,
      including columns not selected by input. Replace spaces and punctuation in column names with
      underscores; aliases must be ASCII identifiers. Dictionaries and lists are inserted as finite
      JSON text. Substitution is literal and single-pass, without expressions or filters. Missing or
      ambiguous references fail before retrieval. Omit to use the default prompt.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type: string
      description: >-
        Optional custom system prompt. Use {{ column_name }} to insert values from the full input
        row, including columns not selected by input. Replace spaces and punctuation in column names
        with underscores; aliases must be ASCII identifiers. Dictionaries and lists are inserted as
        finite JSON text. Substitution is literal and single-pass, without expressions or filters.
        Missing or ambiguous references fail before retrieval. Omit to use the default prompt.
    runtime_required: false
  - name: model_id
    description: The specific model ID to use. Defaults to the AI configuration.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: string
      description: The specific model ID to use. Defaults to the AI configuration.
    runtime_required: false
  - name: output_format
    description: The desired format for the extracted content.
    required: false
    param_group: Formatting
    runtime_default: json
    schema:
      type: string
      description: The desired format for the extracted content.
      enum:
        - markdown
        - json
      default: json
    runtime_required: false
  - name: threads
    description: Number of concurrent threads for parallel processing. Defaults to the AI configuration.
    required: false
    param_group: Execution
    runtime_default: null
    schema:
      type: integer
      description: Number of concurrent threads for parallel processing. Defaults to the AI configuration.
    runtime_required: false
  - name: thinking_level
    description: >-
      Gemini thinking level. Defaults to the configured value, packaged as minimal. Supported levels
      depend on the selected model.
    param_group: Options
    schema:
      type: string
      enum:
        - minimal
        - low
        - medium
        - high
      description: >-
        Gemini thinking level. Defaults to the configured value, packaged as minimal. Supported
        levels depend on the selected model.
    required: false
    runtime_default: null
    runtime_required: false
  - name: request_timeout_seconds
    description: >-
      Total deadline in seconds for each URL, including retries. Defaults to the configured value,
      packaged as 10 seconds. A batch may take longer when URLs run in several waves.
    param_group: Options
    schema:
      type: number
      exclusiveMinimum: 0
      description: >-
        Total deadline in seconds for each URL, including retries. Defaults to the configured value,
        packaged as 10 seconds. A batch may take longer when URLs run in several waves.
    required: false
    runtime_default: null
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py
    title: WranglesPY search.retrieve_link_content implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/search/_sources/retrieve-link-content.md
    title: Archived search.retrieve_link_content Markdown
configuration_schema:
  type: object
  description: >-
    Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a
    second column containing a clean, human-readable text summary of the retrieved data. Additional
    options are passed to Gemini GenerateContentConfig.
  additionalProperties: true
  required:
    - input
    - output
  properties:
    input:
      type:
        - string
        - array
      description: Name or list of input columns containing URLs or Scored Search Result dictionaries.
    output:
      type:
        - string
        - array
      description: >-
        Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and
        the formatted text, provide a list of exactly two column names (e.g., [page_data,
        page_text]).
    client:
      type: string
      description: The retrieval provider to use.
      enum:
        - google_url_context
      default: google_url_context
    api_key:
      type: string
      description: API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY).
    prompt:
      type: string
      description: >-
        Optional custom system prompt. Use {{ column_name }} to insert values from the full input
        row, including columns not selected by input. Replace spaces and punctuation in column names
        with underscores; aliases must be ASCII identifiers. Dictionaries and lists are inserted as
        finite JSON text. Substitution is literal and single-pass, without expressions or filters.
        Missing or ambiguous references fail before retrieval. Omit to use the default prompt.
    model_id:
      type: string
      description: The specific model ID to use. Defaults to the AI configuration.
    output_format:
      type: string
      description: The desired format for the extracted content.
      enum:
        - markdown
        - json
      default: json
    threads:
      type: integer
      description: Number of concurrent threads for parallel processing. Defaults to the AI configuration.
    thinking_level:
      type: string
      enum:
        - minimal
        - low
        - medium
        - high
      description: >-
        Gemini thinking level. Defaults to the configured value, packaged as minimal. Supported
        levels depend on the selected model.
    request_timeout_seconds:
      type: number
      exclusiveMinimum: 0
      description: >-
        Total deadline in seconds for each URL, including retries. Defaults to the configured value,
        packaged as 10 seconds. A batch may take longer when URLs run in several waves.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Retrieve Link Content

Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data.

## Migrated examples
#### Retrieve Structured Page Content

This template extracts JSON content from a URL. Returned fields depend on the page, prompt, and retrieval model.

##### Recipe

```yaml
wrangles:
  - search.retrieve_link_content:
      input:
        - Product URL
      output:
        - Page Data
      api_key: Your Google API key
      client: google_url_context
      output_format: json
      prompt: Extract the product title and manufacturer.
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product URL |
| --- |
| https://example.com/products/6202 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product URL | Page Data |
| --- | --- |
| https://example.com/products/6202 | `{"title": "6202 Bearing", "manufacturer": "SKF"}` |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._
