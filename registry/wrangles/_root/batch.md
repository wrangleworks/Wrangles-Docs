---
schema_version: '0.1'
type: wrangle
id: null
wrangle_name: batch
namespace: null
title: Batch
description: >-
  Split the data into batches for executing a list of wrangles. Use this in situations such as where
  the intermediate data is too large to fit in memory.
wrangle_key: batch
aliases: []
slug: batch
status: active
visibility: public
tags:
  - utility
  - batch
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.batch
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
  - name: wrangles
    description: >-
      The wrangles to execute on the data. Each series of wrangles will be run against the data in
      batches of the size defined by batch_size.
    required: true
    role: nested-wrangles
    schema:
      type: array
      minItems: 1
      items:
        $ref: '#/$defs/wrangles/items'
  - name: batch_size
    description: The number of rows to split each batch into.
    required: false
    role: option
    runtime_default: 1000
    schema:
      type: integer
  - name: threads
    description: The number of threads to use for parallel processing. Default 1.
    required: false
    role: option
    runtime_default: 1
    schema:
      type: integer
  - name: on_error
    description: >-
      A dictionary of column_name: value to return if an error occurs while attempting to run a
      batch.
    required: false
    role: fallback-value
    runtime_default: null
    schema:
      type:
        - object
        - 'null'
  - name: timeout
    description: The number of seconds to wait for a batch to complete before raising an error.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - number
        - 'null'
  - name: use_multiprocessing
    description: Use process-based workers instead of threads. This is an advanced runtime option.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY batch implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/batch.md
    title: Existing batch Markdown
---

# Batch

Execute a series of wrangles in batches. Batches can run in parallel with `threads` and can provide fallback output when an error occurs.

## Migrated examples
#### Batch an Extract AI Wrangle

This example processes product descriptions in batches of two rows.

##### Recipe

```yaml
wrangles:
  - batch:
      batch_size: 2
      threads: 1
      wrangles:
        - extract.ai:
            api_key: Your OpenAI API key
            input: Product Description
            output:
              Title:
                type: string
                description: Title of the product
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Description |
| --- |
| Sleep better with our Memory Foam Pillow, designed to contour to your head and neck. |
| Stay comfortable and stylish with our Organic Cotton T-Shirt, made from soft, breathable fabric. |
| Keep drinks hot or cold with our Stainless Steel Water Bottle, featuring durable insulation. |
| Enjoy crisp sound and long battery life with our Wireless Bluetooth Earbuds. |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Description | Title |
| --- | --- |
| Sleep better with our Memory Foam Pillow, designed to contour to your head and neck. | Memory Foam Pillow |
| Stay comfortable and stylish with our Organic Cotton T-Shirt, made from soft, breathable fabric. | Organic Cotton T-Shirt |
| Keep drinks hot or cold with our Stainless Steel Water Bottle, featuring durable insulation. | Stainless Steel Water Bottle |
| Enjoy crisp sound and long battery life with our Wireless Bluetooth Earbuds. | Wireless Bluetooth Earbuds |

</div>

</div>
