---
title: "Concurrent"
description: "Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles."
sidebar_label: "Concurrent"
slug: "/concurrent"
---

# Concurrent

Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `wrangles` | Yes | array | The wrangles section of a recipe to execute for each combination of variables. | — |
| `max_concurrency` | No | integer | The maximum number of wrangles to execute in parallel. | `10` |
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

Run multiple wrangles concurrently instead of sequentially. Concurrent wrangles must declare output columns, may finish in any order, and should not update overlapping columns.

See the [Concurrent connector](/python/connectors/concurrent) for the connector equivalent.

## Migrated examples
#### Run Extraction Wrangles Concurrently

##### Recipe

```yaml
wrangles:
  - concurrent:
      wrangles:
        - extract.codes:
            input: Products
            output: Part Codes
        - extract.attributes:
            input: Products
            output: Attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| SKF ball brg 2" od 6202 |
| brg seal 1" id 5493 |
| 3lb hammer 87102 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Part Codes | Attributes |
| --- | --- | --- |
| SKF ball brg 2" od 6202 | 6202 | `{"length":["2in"]}` |
| brg seal 1" id 5493 | 5493 | `{"length":["1in"]}` |
| 3lb hammer 87102 | 87102 | `{"weight":["3lb"]}` |

</div>

</div>

## Provenance

- [WranglesPY concurrent implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing concurrent Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/concurrent.md)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: root-level runtime key
- Recipe key: `concurrent`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.concurrent`
- Status: `active`
- Registry version: `0.1.0-pilot`
