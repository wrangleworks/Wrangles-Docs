---
schema_version: '0.2'
type: wrangle
id: e3518afd-a819-40ec-8b49-eb25690220c1
wrangle_name: embeddings
namespace: create
title: Embeddings
description: Create an embedding based on text input.
wrangle_key: create.embeddings
aliases: []
slug: create/embeddings
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - create
  - embeddings
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.create.embeddings
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
    description: The column of text to create the embeddings for.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: api_key
    description: The API key.
    required: true
    param_group: Details
    schema:
      type: string
  - name: output
    description: The output column the embeddings will be saved as.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: batch_size
    description: The number of rows to submit per individual request.
    required: false
    param_group: Execution
    runtime_default: 100
    schema:
      type: integer
  - name: threads
    description: >-
      The number of requests to submit in parallel. Each request contains the number of rows set as
      batch_size.
    required: false
    param_group: Execution
    runtime_default: 10
    schema:
      type: integer
  - name: output_type
    description: Output the embeddings as a numpy array or a python list Default - python list.
    required: false
    param_group: Formatting
    runtime_default: python list
    schema:
      type: string
      enum:
        - numpy array
        - python list
  - name: model
    description: The specific model to use to generate the embeddings.
    required: false
    param_group: Details
    runtime_default: text-embedding-3-small
    schema:
      type: string
  - name: retries
    description: >-
      The number of times to retry if the request fails. This will apply exponential backoff to help
      with rate limiting.
    required: false
    param_group: Errors
    runtime_default: 0
    schema:
      type: integer
  - name: url
    description: >-
      The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved
      provider. Setting a Jina URL without an explicit provider will automatically use Jina's
      request/response format.
    required: false
    param_group: Details
    runtime_default: https://api.openai.com/v1/embeddings
    schema:
      type: string
  - name: precision
    description: >-
      The precision of the embeddings. Default is float32. This should be used with output_type
      numpy array.
    required: false
    param_group: Formatting
    runtime_default: float32
    schema:
      type: string
      enum:
        - float16
        - float32
  - name: provider
    description: >-
      Controls the request/response format for the embedding API. When omitted, inferred from url
      (jina.ai → jina, otherwise openai). Setting provider also sets the default url for that
      provider, so you only need one of provider or url for standard endpoints. Use both together
      only when pointing to a custom endpoint that uses a non-default provider's API format (e.g. a
      Jina-compatible proxy).
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - openai
        - jina
  - name: task
    description: >-
      The task type for the embedding model. Only applicable for the Jina provider. Selects the
      appropriate task-specific adapter.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - retrieval.query
        - retrieval.passage
        - text-matching
        - classification
        - separation
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py
    title: WranglesPY create.embeddings implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/embeddings.md
    title: Existing create.embeddings Markdown
---

# Embeddings

Create an embedding based on text input.

## Migrated examples
#### Creating Embeddings

##### Recipe

```yaml
wrangles:
  - create.embeddings:
      input: my_column
      api_key: ${my_key}
      output: embeddings
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| my_column |
| --- |
| angle grinder |
| jig saw |

</div>

<div className="ww-sample-panel">

##### Output Sample

| my_column | embeddings |
| --- | --- |
| angle grinder | [0.010793785, -0.010007165, 0.0028609, -0.0139...] |
| jig saw | [-0.008975127, 0.009314879, -0.024150735, -0.0...] |

</div>

</div>
