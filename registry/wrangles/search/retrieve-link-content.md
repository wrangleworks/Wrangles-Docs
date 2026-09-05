---
schema_version: '0.1'
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
  - name: output
    description: >-
      Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and
      the formatted text, provide a list of exactly two column names (e.g., [page_data, page_text]).
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: client
    description: The retrieval provider to use.
    required: false
    param_group: Details
    runtime_default: google_url_context
    schema:
      type: string
      enum:
        - google_url_context
  - name: api_key
    description: API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY).
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: prompt
    description: Optional custom system prompt to guide the extraction behavior and output format.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: model_id
    description: The specific model ID to use (default models/gemini-3-flash-preview).
    required: false
    param_group: Details
    runtime_default: models/gemini-3-flash-preview
    schema:
      type: string
  - name: output_format
    description: The desired format for the extracted content.
    required: false
    param_group: Formatting
    runtime_default: json
    schema:
      type: string
      enum:
        - markdown
        - json
  - name: threads
    description: Number of concurrent threads for parallel processing (default 10).
    required: false
    param_group: Execution
    runtime_default: 10
    schema:
      type: integer
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/search.py
    title: WranglesPY search.retrieve_link_content implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/search/_sources/retrieve-link-content.md
    title: Existing search.retrieve_link_content Markdown
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
