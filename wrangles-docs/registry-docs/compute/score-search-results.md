---
title: "Score Search Results"
description: "Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings."
sidebar_label: "Score Search Results"
slug: "/compute/score-search-results"
---

# Score Search Results

Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | List of 3 to 5 columns -&gt; [results, suppliers, part_codes, mpns (optional), descriptions (optional)]. | — |
| `output` | Yes | string, array | Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column, pretty_strings_column]. | — |
| `must_match_part_code` | No | boolean | If true, filters out results that don't satisfy the allowed match types. | `true` |
| `allow_mpn_exact` | No | boolean | Treat exact MPN matches as valid part code matches. | `true` |
| `allow_mpn_partial` | No | boolean | Treat partial MPN matches as valid part code matches. | `true` |
| `allow_other_exact` | No | boolean | Treat exact other part code matches as valid part code matches. | `true` |
| `allow_other_partial` | No | boolean | Treat partial other part code matches as valid part code matches. | `true` |
| `blacklist_keywords` | No | string | Comma-separated list or array of keywords to filter out URLs containing them. | `""` |
| `mpn_exact_score` | No | number | Mpn Exact Score value accepted by the runtime. | `8` |
| `mpn_partial_base` | No | number | Mpn Partial Base value accepted by the runtime. | `4` |
| `part_code_exact_score` | No | number | Part Code Exact Score value accepted by the runtime. | `6` |
| `part_code_partial_base` | No | number | Part Code Partial Base value accepted by the runtime. | `2` |
| `supplier_exact_score` | No | number | Supplier Exact Score value accepted by the runtime. | `3` |
| `supplier_partial_base` | No | number | Supplier Partial Base value accepted by the runtime. | `1` |
| `context_match_base` | No | number | Context Match Base value accepted by the runtime. | `2` |
| `fuzzy_match_threshold` | No | number | Fuzzy Match Threshold value accepted by the runtime. | `0.8` |
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

Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings.

## Migrated examples
#### Rank Part Search Results

This template scores search results using supplier and part-code context. The fields added to each result dictionary depend on the scoring configuration.

##### Recipe

```yaml
wrangles:
  - compute.score_search_results:
      input:
        - Search Results
        - Suppliers
        - Part Codes
      output:
        - Scored Results
      allow_other_exact: true
      must_match_part_code: true
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Search Results | Suppliers | Part Codes |
| --- | --- | --- |
| `[{"title": "SKF 6202 bearing", "link": "https://example.com/6202"}]` | `["SKF"]` | `["6202"]` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Search Results | Suppliers | Part Codes | Scored Results |
| --- | --- | --- | --- |
| `[{"title": "SKF 6202 bearing", "link": "https://example.com/6202"}]` | `["SKF"]` | `["6202"]` | Ranked result dictionaries |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

## Provenance

- [WranglesPY compute.score_search_results implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py)
- [Existing compute.score_search_results Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/score-search-results.md)

## Registry metadata

- Registry ID: `313a8ec0-cf13-4956-8d3b-5362b8641d0f`
- Namespace: `compute`
- Recipe key: `compute.score_search_results`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.compute.score_search_results`
- Status: `active`
- Registry version: `0.1.0-pilot`
