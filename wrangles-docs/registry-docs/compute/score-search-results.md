---
title: "Score Search Results"
description: "Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings."
sidebar_label: "Score Search Results"
slug: "/compute/score-search-results"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Score Search Results

Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of 3 to 5 columns -&gt; [results, suppliers, part_codes, mpns (optional), descriptions (optional)]. | array | — | Yes |
| `output` | Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column, pretty_strings_column]. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `must_match_part_code` | If true, filters out results that don't satisfy the allowed match types. | boolean | `true` | No |
| `allow_mpn_exact` | Treat exact MPN matches as valid part code matches. | boolean | `true` | No |
| `allow_mpn_partial` | Treat partial MPN matches as valid part code matches. | boolean | `true` | No |
| `allow_other_exact` | Treat exact other part code matches as valid part code matches. | boolean | `true` | No |
| `allow_other_partial` | Treat partial other part code matches as valid part code matches. | boolean | `true` | No |
| `blacklist_keywords` | Comma-separated list or array of keywords to filter out URLs containing them. | string | `""` | No |
| `mpn_exact_score` | Mpn Exact Score value accepted by the runtime. | number | `8` | No |
| `mpn_partial_base` | Mpn Partial Base value accepted by the runtime. | number | `4` | No |
| `part_code_exact_score` | Part Code Exact Score value accepted by the runtime. | number | `6` | No |
| `part_code_partial_base` | Part Code Partial Base value accepted by the runtime. | number | `2` | No |
| `supplier_exact_score` | Supplier Exact Score value accepted by the runtime. | number | `3` | No |
| `supplier_partial_base` | Supplier Partial Base value accepted by the runtime. | number | `1` | No |
| `context_match_base` | Context Match Base value accepted by the runtime. | number | `2` | No |
| `fuzzy_match_threshold` | Fuzzy Match Threshold value accepted by the runtime. | number | `0.8` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

This template scores search results using supplier and part-code context. The fields added to each result dictionary depend on the scoring configuration.



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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Search Results | Suppliers | Part Codes |
| --- | --- | --- |
| `[{"title": "SKF 6202 bearing", "link": "https://example.com/6202"}]` | `["SKF"]` | `["6202"]` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Scored Results |
| --- |
| Ranked result dictionaries |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

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
| Recipe key | `compute.score_search_results` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `compute` |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compute.score_search_results` |

**Sources**

- [WranglesPY compute.score_search_results implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py)
- [Existing compute.score_search_results Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/score-search-results.md)

</details>
