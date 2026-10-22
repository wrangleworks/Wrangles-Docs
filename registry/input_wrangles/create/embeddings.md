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
      type:
        - string
        - integer
        - array
      description: The column of text to create the embeddings for.
    runtime_required: true
  - name: api_key
    description: The API key.
    required: true
    param_group: Details
    schema:
      type: string
      description: The API key.
    runtime_required: true
  - name: output
    description: The output column the embeddings will be saved as.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: The output column the embeddings will be saved as.
    runtime_required: false
  - name: batch_size
    description: The number of rows to submit per individual request.
    required: false
    param_group: Execution
    runtime_default: null
    schema:
      type: integer
      description: The number of rows to submit per individual request.
    runtime_required: false
  - name: threads
    description: >-
      The number of requests to submit in parallel. Each request contains the number of rows set as
      batch_size.
    required: false
    param_group: Execution
    runtime_default: null
    schema:
      type: integer
      description: >-
        The number of requests to submit in parallel. Each request contains the number of rows set
        as batch_size.
    runtime_required: false
  - name: output_type
    description: Output the embeddings as a numpy array or a python list Default - python list.
    required: false
    param_group: Formatting
    runtime_default: python list
    schema:
      type: string
      description: Output the embeddings as a numpy array or a python list Default - python list.
      enum:
        - numpy array
        - python list
    runtime_required: false
  - name: model
    description: >-
      The embedding model. Defaults to the AI configuration for the resolved provider. Jina requires
      an explicit model unless a default is configured.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: string
      description: >-
        The embedding model. Defaults to the AI configuration for the resolved provider. Jina
        requires an explicit model unless a default is configured.
    runtime_required: false
  - name: retries
    description: >-
      Additional attempts after transient transport or HTTP errors. Defaults to the AI
      configuration. Retries use exponential backoff and respect Retry-After. Permanent errors fail
      immediately.
    required: false
    param_group: Errors
    runtime_default: null
    schema:
      type: integer
      minimum: 0
      description: >-
        Additional attempts after transient transport or HTTP errors. Defaults to the AI
        configuration. Retries use exponential backoff and respect Retry-After. Permanent errors
        fail immediately.
    runtime_required: false
  - name: url
    description: >-
      The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved
      provider. Setting a Jina URL without an explicit provider will automatically use Jina's
      request/response format.
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: string
      description: >-
        The endpoint to send embedding requests to. Defaults to the standard endpoint for the
        resolved provider. Setting a Jina URL without an explicit provider will automatically use
        Jina's request/response format.
    runtime_required: false
  - name: precision
    description: >-
      The precision of the embeddings. Defaults to the AI configuration. This should be used with
      output_type numpy array.
    required: false
    param_group: Formatting
    runtime_default: null
    schema:
      type: string
      description: >-
        The precision of the embeddings. Defaults to the AI configuration. This should be used with
        output_type numpy array.
      enum:
        - float16
        - float32
    runtime_required: false
  - name: provider
    description: >-
      Controls the request/response format for the embedding API. When omitted, inferred from an
      explicit url (jina.ai → jina, otherwise openai), or the AI configuration when no url is
      supplied. Setting provider also sets the default url for that provider, so you only need one
      of provider or url for standard endpoints. Use both together only when pointing to a custom
      endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy).
    required: false
    param_group: Details
    runtime_default: null
    schema:
      type: string
      description: >-
        Controls the request/response format for the embedding API. When omitted, inferred from an
        explicit url (jina.ai → jina, otherwise openai), or the AI configuration when no url is
        supplied. Setting provider also sets the default url for that provider, so you only need one
        of provider or url for standard endpoints. Use both together only when pointing to a custom
        endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy).
      enum:
        - openai
        - jina
    runtime_required: false
  - name: task
    description: >-
      The task type for the embedding model. Only applicable for the Jina provider. Selects the
      appropriate task-specific adapter. Defaults and allowed values come from the selected model's
      AI configuration. Jina v5 supports retrieval.query, retrieval.passage, text-matching,
      classification, and clustering. Legacy models without a configured task enum also support
      retrieval.query, retrieval.passage, text-matching, and classification, but use separation for
      clustering.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type: string
      description: >-
        The task type for the embedding model. Only applicable for the Jina provider. Selects the
        appropriate task-specific adapter. Defaults and allowed values come from the selected
        model's AI configuration. Jina v5 supports retrieval.query, retrieval.passage,
        text-matching, classification, and clustering. Legacy models without a configured task enum
        also support retrieval.query, retrieval.passage, text-matching, and classification, but use
        separation for clustering.
    runtime_required: false
  - name: timeout
    description: >-
      Request timeout in seconds for each attempt. Defaults to the AI configuration. Each retry
      receives the full timeout; this is not a total batch deadline.
    param_group: Options
    schema:
      type: number
      exclusiveMinimum: 0
      description: >-
        Request timeout in seconds for each attempt. Defaults to the AI configuration. Each retry
        receives the full timeout; this is not a total batch deadline.
    required: false
    runtime_default: null
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py
    title: WranglesPY create.embeddings implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/embeddings.md
    title: Archived create.embeddings Markdown
configuration_schema:
  type: object
  description: Create an embedding based on text input.
  required:
    - input
    - api_key
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: The column of text to create the embeddings for.
    output:
      type:
        - string
        - array
      description: The output column the embeddings will be saved as.
    api_key:
      type: string
      description: The API key.
    model:
      type: string
      description: >-
        The embedding model. Defaults to the AI configuration for the resolved provider. Jina
        requires an explicit model unless a default is configured.
    batch_size:
      type: integer
      description: The number of rows to submit per individual request.
    threads:
      type: integer
      description: >-
        The number of requests to submit in parallel. Each request contains the number of rows set
        as batch_size.
    output_type:
      type: string
      description: Output the embeddings as a numpy array or a python list Default - python list.
      enum:
        - numpy array
        - python list
    retries:
      type: integer
      minimum: 0
      description: >-
        Additional attempts after transient transport or HTTP errors. Defaults to the AI
        configuration. Retries use exponential backoff and respect Retry-After. Permanent errors
        fail immediately.
    timeout:
      type: number
      exclusiveMinimum: 0
      description: >-
        Request timeout in seconds for each attempt. Defaults to the AI configuration. Each retry
        receives the full timeout; this is not a total batch deadline.
    provider:
      type: string
      description: >-
        Controls the request/response format for the embedding API. When omitted, inferred from an
        explicit url (jina.ai → jina, otherwise openai), or the AI configuration when no url is
        supplied. Setting provider also sets the default url for that provider, so you only need one
        of provider or url for standard endpoints. Use both together only when pointing to a custom
        endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy).
      enum:
        - openai
        - jina
    url:
      type: string
      description: >-
        The endpoint to send embedding requests to. Defaults to the standard endpoint for the
        resolved provider. Setting a Jina URL without an explicit provider will automatically use
        Jina's request/response format.
    precision:
      type: string
      description: >-
        The precision of the embeddings. Defaults to the AI configuration. This should be used with
        output_type numpy array.
      enum:
        - float16
        - float32
    task:
      type: string
      description: >-
        The task type for the embedding model. Only applicable for the Jina provider. Selects the
        appropriate task-specific adapter. Defaults and allowed values come from the selected
        model's AI configuration. Jina v5 supports retrieval.query, retrieval.passage,
        text-matching, classification, and clustering. Legacy models without a configured task enum
        also support retrieval.query, retrieval.passage, text-matching, and classification, but use
        separation for clustering.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
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
