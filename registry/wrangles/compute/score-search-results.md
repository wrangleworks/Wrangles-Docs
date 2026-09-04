---
schema_version: '0.1'
type: wrangle
id: 313a8ec0-cf13-4956-8d3b-5362b8641d0f
wrangle_name: score_search_results
namespace: compute
title: Score Search Results
description: >-
  Scores and filters search results based on progressive partial/exact matching. Can return
  dictionaries or a parallel list of formatted strings.
wrangle_key: compute.score_search_results
aliases: []
slug: compute/score-search-results
status: active
visibility: public
tags:
  - compute
  - score-search-results
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.compute.score_search_results
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
    description: >-
      List of 3 to 5 columns -> [results, suppliers, part_codes, mpns (optional), descriptions
      (optional)].
    required: true
    role: column-selector
    schema:
      type: array
  - name: output
    description: >-
      Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column,
      pretty_strings_column].
    required: true
    role: column-output
    schema:
      type:
        - string
        - array
  - name: must_match_part_code
    description: If true, filters out results that don't satisfy the allowed match types.
    required: false
    role: option
    runtime_default: true
    schema:
      type: boolean
  - name: allow_mpn_exact
    description: Treat exact MPN matches as valid part code matches.
    required: false
    role: option
    runtime_default: true
    schema:
      type: boolean
  - name: allow_mpn_partial
    description: Treat partial MPN matches as valid part code matches.
    required: false
    role: option
    runtime_default: true
    schema:
      type: boolean
  - name: allow_other_exact
    description: Treat exact other part code matches as valid part code matches.
    required: false
    role: option
    runtime_default: true
    schema:
      type: boolean
  - name: allow_other_partial
    description: Treat partial other part code matches as valid part code matches.
    required: false
    role: option
    runtime_default: true
    schema:
      type: boolean
  - name: blacklist_keywords
    description: Comma-separated list or array of keywords to filter out URLs containing them.
    required: false
    role: option
    runtime_default: ''
    schema:
      type: string
  - name: mpn_exact_score
    description: Mpn Exact Score value accepted by the runtime.
    required: false
    role: option
    runtime_default: 8
    schema:
      type: number
  - name: mpn_partial_base
    description: Mpn Partial Base value accepted by the runtime.
    required: false
    role: option
    runtime_default: 4
    schema:
      type: number
  - name: part_code_exact_score
    description: Part Code Exact Score value accepted by the runtime.
    required: false
    role: option
    runtime_default: 6
    schema:
      type: number
  - name: part_code_partial_base
    description: Part Code Partial Base value accepted by the runtime.
    required: false
    role: option
    runtime_default: 2
    schema:
      type: number
  - name: supplier_exact_score
    description: Supplier Exact Score value accepted by the runtime.
    required: false
    role: option
    runtime_default: 3
    schema:
      type: number
  - name: supplier_partial_base
    description: Supplier Partial Base value accepted by the runtime.
    required: false
    role: option
    runtime_default: 1
    schema:
      type: number
  - name: context_match_base
    description: Context Match Base value accepted by the runtime.
    required: false
    role: option
    runtime_default: 2
    schema:
      type: number
  - name: fuzzy_match_threshold
    description: Fuzzy Match Threshold value accepted by the runtime.
    required: false
    role: option
    runtime_default: 0.8
    schema:
      type: number
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py
    title: WranglesPY compute.score_search_results implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/score-search-results.md
    title: Existing compute.score_search_results Markdown
---

# Score Search Results

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
