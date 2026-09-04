---
title: "Batch"
description: "Split the data into batches for executing a list of wrangles. Use this in situations such as where the intermediate data is too large to fit in memory."
sidebar_label: "Batch"
slug: "/batch"
---

# Batch

Split the data into batches for executing a list of wrangles. Use this in situations such as where the intermediate data is too large to fit in memory.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `wrangles` | Yes | array | The wrangles to execute on the data. Each series of wrangles will be run against the data in batches of the size defined by batch_size. | — |
| `batch_size` | No | integer | The number of rows to split each batch into. | `1000` |
| `threads` | No | integer | The number of threads to use for parallel processing. Default 1. | `1` |
| `on_error` | No | object, null | A dictionary of column_name: value to return if an error occurs while attempting to run a batch. | `null` |
| `timeout` | No | number, null | The number of seconds to wait for a batch to complete before raising an error. | `null` |
| `use_multiprocessing` | No | boolean | Use process-based workers instead of threads. This is an advanced runtime option. | `false` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

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

## Provenance

- [WranglesPY batch implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing batch Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/batch.md)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: root-level runtime key
- Recipe key: `batch`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.batch`
- Status: `active`
- Registry version: `0.1.0-pilot`
