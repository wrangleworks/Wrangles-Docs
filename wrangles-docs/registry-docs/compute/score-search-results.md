---
title: "Score Search Results"
description: "Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings."
sidebar_label: "Score Search Results"
slug: "/compute/score-search-results"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Score Search Results <CopyableCode value="compute.score_search_results" />

Scores and filters search results based on progressive partial/exact matching. Can return dictionaries or a parallel list of formatted strings.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Deduplicates and ranks structured search results using part-number, supplier text, context, original-rank, query-order, supplier-domain, and product-URL signals. Unfiltered results come first; filtered results are retained at the end, with each group sorted by descending score. Each result contains summary, scoring_details, pricing, metadata, reduced part_code_matches, and part_code_match_count before evidence reduction. Numeric part-match categories use broad normalized containment and can differ from the exact, stripped, and partial diagnostic evidence levels. Does not search again or visit result pages. See docs/search_result_scoring.md for the full contract.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
        "type": "string"
      },
      "description": "Three to five ordered column names: results, suppliers, part_codes, optional MPNs, optional descriptions. Results cells contain lists of payloads with search_metadata and search_results. Text-input cells accept scalar values or lists. To use descriptions without an MPN, provide five inputs and leave the fourth column's values blank."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "minItems": 1,
      "maxItems": 2,
      "items": {
        "type": "string"
      },
      "description": "One name or a one-element list receives scored dictionaries. Two names receive parallel dictionary and formatted-summary lists in that order. Each row retains its result lists; results are not expanded into rows. Part-code evidence and counts remain nested in each dictionary, not in a third output column. Empty or non-list results cells produce empty lists."
    },
    "must_match_part_code": {
      "type": "boolean",
      "default": true,
      "description": "If true, mark results filtered when their scoring match category is not allowed. If false, keep such results eligible, while part_code_found still reports category eligibility. Blacklisting applies in both cases. Filtered dictionaries remain in the output with their scores and reasons."
    },
    "allow_mpn_exact": {
      "type": "boolean",
      "default": true,
      "description": "Allow the mpn_exact scoring category. Containment of an MPN with at least four normalized characters can receive this category even when its diagnostic evidence is partial. Does not change scores or evidence."
    },
    "allow_mpn_partial": {
      "type": "boolean",
      "default": true,
      "description": "Allow the mpn_partial scoring category, not every partial diagnostic evidence record. MPN categories take precedence over other-code categories."
    },
    "allow_other_exact": {
      "type": "boolean",
      "default": true,
      "description": "Allow other_code_exact when no positive MPN match is recognized. Normalized containment can receive exact points. Disallowing an MPN category does not fall back to this category."
    },
    "allow_other_partial": {
      "type": "boolean",
      "default": true,
      "description": "Allow other_code_partial when no positive MPN match is recognized. Applies to the scoring category, not the diagnostic match_level."
    },
    "blacklist_keywords": {
      "type": [
        "string",
        "array"
      ],
      "items": {
        "type": "string"
      },
      "default": "",
      "description": "Literal substrings of the full lowercased URL to mark as filtered. A comma-separated string is trimmed and lowercased; list entries are used as supplied, so provide trimmed lowercase strings. Does not match titles or snippets and applies even when must_match_part_code is false."
    },
    "mpn_exact_score": {
      "type": "number",
      "default": 8,
      "description": "Exact-score MPN points, including normalized containment for inputs of at least four characters. Only the higher MPN or other-code contribution is added; a tie prefers the MPN explanation. Keep exact weights positive."
    },
    "mpn_partial_base": {
      "type": "number",
      "default": 4,
      "description": "Base points for partial/variant MPN scoring. Ordinary normalized containment already receives exact points; this is not a weight for every partial diagnostic evidence record."
    },
    "part_code_exact_score": {
      "type": "number",
      "default": 6,
      "description": "Exact-score other-code points, including normalized containment for inputs of at least four characters. Not added on top of the MPN score."
    },
    "part_code_partial_base": {
      "type": "number",
      "default": 2,
      "description": "Base points for partial/variant other-code scoring. Does not change diagnostic levels; containment can already receive exact points."
    },
    "supplier_exact_score": {
      "type": "number",
      "default": 3,
      "description": "Points when a normalized supplier name equals a complete title, snippet, or URL field. An embedded name instead uses supplier_partial_base."
    },
    "supplier_partial_base": {
      "type": "number",
      "default": 1,
      "description": "Base for embedded supplier text; reverse containment uses 95 percent of the base, and fuzzy matches at the fixed 0.8 cutoff use their similarity times the base. Only the strongest text match contributes."
    },
    "context_match_base": {
      "type": "number",
      "default": 2,
      "description": "Points when all normalized unique input context terms match. Terms include suppliers, codes, MPNs, full descriptions, and description words longer than two characters. The matched fraction times this base is rounded to one decimal place; repeated occurrences do not add points."
    },
    "fuzzy_match_threshold": {
      "type": "number",
      "default": 0.8,
      "description": "Similarity cutoff for context terms and supplier-text recognition in brand_found. Does not change the fixed supplier fuzzy-scoring cutoff, part-code evidence levels, or allowed scoring categories. Domain evidence can set brand_found independently of this threshold."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    }
  }
}
```

</details>

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
  - select.element:
      input: Scored Results[0]['summary']['score']
      output: Score
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Search Results | Suppliers | Part Codes |
| --- | --- | --- |
| `[{"search_results": [{"title": "SKF 6202 bearing", "link": "https://example.com/6202", "snippet": "SKF 6202 bearing"}]}]` | `["SKF"]` | `["6202"]` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Score |
| --- |
| 12.0 |

</div>

</div>

The input contains search-response objects, each with a `search_results` list, not a flat list of results. This local example scores supplied data without visiting the URL. The final step selects the first result's score for a compact output table; the full result remains in `Scored Results`.

Example verified with the pinned WranglesPY runtime. Include a string `snippet`: the pinned runtime's result formatter raises an error when it is missing or null.

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Three to five ordered column names: results, suppliers, part_codes, optional MPNs, optional descriptions. Results cells contain lists of payloads with search_metadata and search_results. Text-input cells accept scalar values or lists. To use descriptions without an MPN, provide five inputs and leave the fourth column's values blank. | array | — | Yes |
| `output` | One name or a one-element list receives scored dictionaries. Two names receive parallel dictionary and formatted-summary lists in that order. Each row retains its result lists; results are not expanded into rows. Part-code evidence and counts remain nested in each dictionary, not in a third output column. Empty or non-list results cells produce empty lists. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `must_match_part_code` | If true, mark results filtered when their scoring match category is not allowed. If false, keep such results eligible, while part_code_found still reports category eligibility. Blacklisting applies in both cases. Filtered dictionaries remain in the output with their scores and reasons. | boolean | `true` | No |
| `allow_mpn_exact` | Allow the mpn_exact scoring category. Containment of an MPN with at least four normalized characters can receive this category even when its diagnostic evidence is partial. Does not change scores or evidence. | boolean | `true` | No |
| `allow_mpn_partial` | Allow the mpn_partial scoring category, not every partial diagnostic evidence record. MPN categories take precedence over other-code categories. | boolean | `true` | No |
| `allow_other_exact` | Allow other_code_exact when no positive MPN match is recognized. Normalized containment can receive exact points. Disallowing an MPN category does not fall back to this category. | boolean | `true` | No |
| `allow_other_partial` | Allow other_code_partial when no positive MPN match is recognized. Applies to the scoring category, not the diagnostic match_level. | boolean | `true` | No |
| `blacklist_keywords` | Literal substrings of the full lowercased URL to mark as filtered. A comma-separated string is trimmed and lowercased; list entries are used as supplied, so provide trimmed lowercase strings. Does not match titles or snippets and applies even when must_match_part_code is false. | string, array | `""` | No |
| `mpn_exact_score` | Exact-score MPN points, including normalized containment for inputs of at least four characters. Only the higher MPN or other-code contribution is added; a tie prefers the MPN explanation. Keep exact weights positive. | number | `8` | No |
| `mpn_partial_base` | Base points for partial/variant MPN scoring. Ordinary normalized containment already receives exact points; this is not a weight for every partial diagnostic evidence record. | number | `4` | No |
| `part_code_exact_score` | Exact-score other-code points, including normalized containment for inputs of at least four characters. Not added on top of the MPN score. | number | `6` | No |
| `part_code_partial_base` | Base points for partial/variant other-code scoring. Does not change diagnostic levels; containment can already receive exact points. | number | `2` | No |
| `supplier_exact_score` | Points when a normalized supplier name equals a complete title, snippet, or URL field. An embedded name instead uses supplier_partial_base. | number | `3` | No |
| `supplier_partial_base` | Base for embedded supplier text; reverse containment uses 95 percent of the base, and fuzzy matches at the fixed 0.8 cutoff use their similarity times the base. Only the strongest text match contributes. | number | `1` | No |
| `context_match_base` | Points when all normalized unique input context terms match. Terms include suppliers, codes, MPNs, full descriptions, and description words longer than two characters. The matched fraction times this base is rounded to one decimal place; repeated occurrences do not add points. | number | `2` | No |
| `fuzzy_match_threshold` | Similarity cutoff for context terms and supplier-text recognition in brand_found. Does not change the fixed supplier fuzzy-scoring cutoff, part-code evidence levels, or allowed scoring categories. Domain evidence can set brand_found independently of this threshold. | number | `0.8` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

</details>

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
| Catalog ID | `4` |
| Catalog key | `compute.score_search_results` |
| Recipe key | `compute.score_search_results` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `compute` |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compute.score_search_results` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `313a8ec0-cf13-4956-8d3b-5362b8641d0f` |

**Sources**

- [WranglesPY compute.score_search_results implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py)
- [Archived compute.score_search_results Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/score-search-results.md)

</details>
