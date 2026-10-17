---
schema_version: '0.2'
type: wrangle
id: ae12cf20-4934-428f-84a9-a6898cb7ffe0
wrangle_name: huggingface
namespace: null
title: Huggingface
description: Use a model from huggingface.
wrangle_key: huggingface
aliases: []
slug: huggingface
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - ai
  - huggingface
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.huggingface
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
    description: Name of the input column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Name of the input column.
    runtime_required: true
  - name: api_token
    description: Huggingface API Token
    required: true
    param_group: Details
    schema:
      type: string
      description: Huggingface API Token
    runtime_required: true
  - name: model
    description: Name of the model to use. e.g. facebook/bart-large-cnn
    required: true
    param_group: Details
    schema:
      type: string
      description: Name of the model to use. e.g. facebook/bart-large-cnn
    runtime_required: true
  - name: output
    description: |
      Name of the output column. If not provided, will overwrite the input column
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: |
        Name of the output column. If not provided, will overwrite the input column
    runtime_required: false
  - name: parameters
    description: Optionally, provide additional parameters to define the model behaviour
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type: object
      description: Optionally, provide additional parameters to define the model behaviour
    runtime_required: false
  - name: timeout
    description: Request timeout in seconds; defaults to the AI configuration.
    param_group: Options
    schema:
      type: number
      exclusiveMinimum: 0
      description: Request timeout in seconds; defaults to the AI configuration.
    required: false
    runtime_default: null
    runtime_required: false
  - name: retries
    description: Additional attempts after transient failures; defaults to the AI configuration.
    param_group: Options
    schema:
      type: integer
      minimum: 0
      description: Additional attempts after transient failures; defaults to the AI configuration.
    required: false
    runtime_default: null
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY huggingface implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/ai/_sources/huggingface.md
    title: Archived huggingface Markdown
configuration_schema:
  type: object
  description: Use a model from huggingface
  required:
    - input
    - api_token
    - model
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name of the input column.
    output:
      type:
        - string
        - array
      description: |
        Name of the output column. If not provided, will overwrite the input column
    model:
      type: string
      description: Name of the model to use. e.g. facebook/bart-large-cnn
    api_token:
      type: string
      description: Huggingface API Token
    parameters:
      type: object
      description: Optionally, provide additional parameters to define the model behaviour
    timeout:
      type: number
      exclusiveMinimum: 0
      description: Request timeout in seconds; defaults to the AI configuration.
    retries:
      type: integer
      minimum: 0
      description: Additional attempts after transient failures; defaults to the AI configuration.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Huggingface

Use a model from huggingface

## Migrated examples
#### Summarize Product Descriptions

This template uses a Hugging Face summarization model. The exact response shape and text depend on the selected model.

##### Recipe

```yaml
wrangles:
  - huggingface:
      input:
        - Product Description
      output:
        - Summary
      api_token: Your Hugging Face API token
      model: facebook/bart-large-cnn
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Description |
| --- |
| A cordless drill with two batteries, a charger, and a compact carrying case. |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Description | Summary |
| --- | --- |
| A cordless drill with two batteries, a charger, and a compact carrying case. | Cordless drill kit with batteries, charger, and case. |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._
