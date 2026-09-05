---
title: "Batch"
description: "Split the data into batches for executing a list of wrangles. Use this in situations such as where the intermediate data is too large to fit in memory."
sidebar_label: "Batch"
slug: "/batch"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Batch

Split the data into batches for executing a list of wrangles. Use this in situations such as where the intermediate data is too large to fit in memory.

Execute a series of wrangles in batches. Batches can run in parallel with `threads` and can provide fallback output when an error occurs.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | The wrangles to execute on the data. Each series of wrangles will be run against the data in batches of the size defined by batch_size. | array | — | Yes |
| `batch_size` | The number of rows to split each batch into. | integer | `1000` | No |
| `threads` | The number of threads to use for parallel processing. Default 1. | integer | `1` | No |
| `timeout` | The number of seconds to wait for a batch to complete before raising an error. | number, null | `null` | No |
| `use_multiprocessing` | Use process-based workers instead of threads. This is an advanced runtime option. | boolean | `false` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `on_error` | A dictionary of column_name: value to return if an error occurs while attempting to run a batch. | object, null | `null` | No |

</div>

## Examples

This example processes product descriptions in batches of two rows.



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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Description |
| --- |
| Sleep better with our Memory Foam Pillow, designed to contour to your head and neck. |
| Stay comfortable and stylish with our Organic Cotton T-Shirt, made from soft, breathable fabric. |
| Keep drinks hot or cold with our Stainless Steel Water Bottle, featuring durable insulation. |
| Enjoy crisp sound and long battery life with our Wireless Bluetooth Earbuds. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Title |
| --- |
| Memory Foam Pillow |
| Organic Cotton T-Shirt |
| Stainless Steel Water Bottle |
| Wireless Bluetooth Earbuds |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | `batch` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.batch` |

**Sources**

- [WranglesPY batch implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing batch Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/batch.md)

</details>
