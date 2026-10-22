---
title: "Compute Wrangles"
description: "Compute wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Compute"
slug: "/namespaces/compute"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Compute Wrangles

Compute wrangles, with recipe examples, parameters, and behavior.

## Case When <CopyableCode value="compute.case_when" /> {#case-when}

Assign values to a column based on conditional logic.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Assign values to a column based on conditional logic",
  "additionalProperties": false,
  "required": [
    "output",
    "cases"
  ],
  "properties": {
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "cases": {
      "type": "array",
      "description": "List of conditions and corresponding values",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": [
          "condition",
          "value"
        ],
        "properties": {
          "condition": {
            "type": "string",
            "description": "Condition to evaluate (e.g., \"Score > 0.84\")"
          },
          "value": {
            "type": [
              "string",
              "number",
              "integer",
              "boolean"
            ],
            "description": "Value to assign if condition is true"
          }
        }
      }
    },
    "default": {
      "type": [
        "string",
        "number",
        "integer",
        "boolean",
        "null"
      ],
      "description": "Value to assign if no conditions are met. Default None."
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

### Examples

```yaml
wrangles:
  - compute.case_when:
      output: Letter Grade
      cases:
        - condition: Grade > 89
          value: 'A'
        - condition: 90 > Grade > 79
          value: 'B'
        - condition: 80 > Grade > 69
          value: 'C'
        - condition: 70 > Grade
          value: 'F'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Student | Grade |
| --- | --- |
| Billy | 62 |
| Sarah | 91 |
| Timmy | 88 |
| Tammy | 74 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Letter Grade |
| --- |
| F |
| A |
| B |
| C |

</div>

</div>



Conditions can be combined so multiple criteria must be met before assigning a value.



```yaml
wrangles:
  - compute.case_when:
      output: Letter Grade
      cases:
        - condition: (Grade >= 90) & (Attendance == 'Good')
          value: 'A'
        - condition: (90 > Grade >= 80) & (Attendance == 'Good')
          value: 'B'
        - condition: (80 > Grade >= 70) & (Attendance == 'Good')
          value: 'C'
        - condition: (70 > Grade) or (Attendance == 'Poor')
          value: 'F'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Student | Grade | Attendance |
| --- | --- | --- |
| Billy | 62 | Poor |
| Sarah | 91 | Poor |
| Timmy | 88 | Good |
| Tammy | 74 | Good |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Letter Grade |
| --- |
| F |
| F |
| B |
| C |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `cases` | List of conditions and corresponding values | array | — | Yes |
| `default` | Value to assign if no conditions are met. Default None. | string, number, integer, boolean, null | `null` | No |
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
| Catalog ID | `3` |
| Catalog key | `compute.case_when` |
| Recipe key | `compute.case_when` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `compute` |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compute.case_when` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `9a9662e4-53d1-4932-8adf-bc3e7aa364ad` |

**Sources**

- [WranglesPY compute.case_when implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py)
- [Archived compute.case_when Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/case-when.md)

</details>


---

## Score Search Results <CopyableCode value="compute.score_search_results" /> {#score-search-results}

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

### Examples

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


---

## Math <CopyableCode value="math" /> {#math}

Apply mathematical calculations to columns. Also called as `maths`.

:::info
Spaces within column headers are replaced with underscores automatically. Account for this when writing expressions in `input`.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Apply a mathematical calculation.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "The mathematical expression using column names. e.g. column1 * column2\n+ column3.  Note: spaces within column names are replaced by underscores (_).\n"
    },
    "output": {
      "type": "string",
      "description": "The column to output the results to"
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

### Examples

```yaml
wrangles:
  - math:
      input: sqrt(Values)
      output: Square Root
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Values |
| --- |
| 4 |
| 9 |
| 16 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Square Root |
| --- |
| 2 |
| 3 |
| 4 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The mathematical expression using column names. e.g. column1 * column2<br />+ column3.  Note: spaces within column names are replaced by underscores (_).<br /> | string, integer | — | Yes |
| `output` | The column to output the results to | string | — | Yes |
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
| Catalog ID | `82` |
| Catalog key | `math` |
| Recipe key | `math` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.math` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `494b11ad-00c1-4748-8b93-6bec982f4fec` |

**Sources**

- [WranglesPY math implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived math Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/math.md)

</details>


---

## Python <CopyableCode value="python" /> {#python}

The Python wrangle executes simple Python commands inline within a recipe. Row values are referenced by column name and commands are evaluated once per row. Spaces within column names are replaced by underscores (`_`). All columns are also available as a dictionary named `kwargs`. For more complex Python, use custom functions.

:::caution
This wrangle evaluates the Python command. Be cautious when including variables from untrusted sources in the command string.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Apply a simple single-line python command. For more complex python use a custom function.\nNote, this evaluates the python command - be especially cautious including\nvariables from untrusted sources within the command string.\nThe python command will be evaluated once for each row and the result returned.\nReference column values by using their name.\nNon-alphanumeric characters within column names are replaced by underscores (_)\nAdditionally, all columns are available as a dict named kwargs.\nAdditional parameters set for the wrangle will also be available to the command.",
  "required": [
    "command",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input column(s) to filter the data available\nto the command. Useful in conjunction with kwargs to target\na variable range of columns.\nIf not specified, all columns will be available."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output column(s). To output multiple columns,\nreturn a list of the corresponding length."
    },
    "command": {
      "type": "string",
      "description": "Python command. This must return a value.\nNote: any non-alphanumeric characters in variable names\nare replaced by underscores (_)."
    },
    "except": {
      "type": [
        "string",
        "array",
        "number",
        "integer",
        "boolean",
        "object"
      ],
      "description": "Value to return for the row if an exception occurs during the evaluation.\nIf not provided, an exception will be raised as normal.\nIf multiple output columns are specified, this must match the length."
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

### Examples

```yaml
wrangles:
  - python:
      output: result
      command: My_Column.upper()
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| My Column |
| --- |
| example text |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| result |
| --- |
| EXAMPLE TEXT |

</div>

</div>



The Python wrangle supports parameters so values of unknown origin can be injected safely.



```yaml
wrangles:
  - python:
      output: sliced
      input: input_column
      command: input_column[:i]
      i: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| input_column |
| --- |
| Bearing |
| Hammer |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| sliced |
| --- |
| Bea |
| Ham |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of output column(s). To output multiple columns,<br />return a list of the corresponding length. | string, array | — | Yes |
| `input` | Name or list of input column(s) to filter the data available<br />to the command. Useful in conjunction with kwargs to target<br />a variable range of columns.<br />If not specified, all columns will be available. | string, integer, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `command` | Python command. This must return a value.<br />Note: any non-alphanumeric characters in variable names<br />are replaced by underscores (_). | string | — | Yes |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `except` | Value to return for the row if an exception occurs during the evaluation.<br />If not provided, an exception will be raised as normal.<br />If multiple output columns are specified, this must match the length. | string, array, number, integer, boolean, object | — | No |
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
| Catalog ID | `85` |
| Catalog key | `python` |
| Recipe key | `python` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.python` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `c0398a11-7731-4e47-8df0-b07eea0b1d6c` |

**Sources**

- [WranglesPY python implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived python Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/python.md)

</details>


---

## SQL <CopyableCode value="sql" /> {#sql}

Apply a SQL command to the current dataframe. Only `SELECT` statements are supported; the result becomes the output. The current table is called `df`.

:::info
SQL does not currently work with objects. If your table contains objects, use `convert.to_json` before using SQL. SQL is not compatible with `where` filtering.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output.",
  "additionalProperties": false,
  "required": [
    "command"
  ],
  "properties": {
    "command": {
      "type": "string",
      "description": "SQL Command. The table is called df. For specific SQL syntax, this uses the SQLite dialect."
    },
    "params": {
      "type": [
        "array",
        "object"
      ],
      "description": "Variables to use in conjunctions with query.\nThis allows the query to be parameterized.\nThis uses sqlite syntax (? or :name)"
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where_special"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    }
  }
}
```

</details>

### Examples

```yaml
wrangles:
  - sql:
      command: |
        SELECT header1, header2
        FROM df
        WHERE header1 >= 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| header1 | header2 | header3 |
| --- | --- | --- |
| 1 | a | x |
| 2 | b | y |
| 3 | c | z |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| header1 | header2 |
| --- | --- |
| 2 | b |
| 3 | c |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `command` | SQL Command. The table is called df. For specific SQL syntax, this uses the SQLite dialect. | string | — | Yes |
| `params` | Variables to use in conjunctions with query.<br />This allows the query to be parameterized.<br />This uses sqlite syntax (? or :name) | array, object | `null` | No |
| `preserve_data_types` | Preserve Data Types value accepted by the runtime. | Any JSON value (not constrained upstream) | `true` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `preserve_index` | Preserve Index value accepted by the runtime. | Any JSON value (not constrained upstream) | `false` | No |
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
| Catalog ID | `94` |
| Catalog key | `sql` |
| Recipe key | `sql` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.sql` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `467a06b1-a697-4d31-8061-7d83a719fd79` |

**Sources**

- [WranglesPY sql implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived sql Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/sql.md)

</details>


---

## Maths (Deprecated) <CopyableCode value="maths" /> {#maths}

:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use [`math`](/py/namespaces/compute#math) for new recipes.
:::

### Behavior

Deprecated alias for `math`; evaluate an expression and write its result to an output column.

This guidance was derived from the callable signature.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: deprecated-alias:math. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Apply a mathematical calculation.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "The mathematical expression using column names. e.g. column1 * column2\n+ column3.  Note: spaces within column names are replaced by underscores (_).\n"
    },
    "output": {
      "type": "string",
      "description": "The column to output the results to"
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



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The mathematical expression using column names. e.g. column1 * column2<br />+ column3.  Note: spaces within column names are replaced by underscores (_).<br /> | string, integer | — | Yes |
| `output` | The column to output the results to | string | — | Yes |
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
| Catalog ID | `83` |
| Catalog key | `maths` |
| Recipe key | `maths` |
| Catalog status | active |
| Lifecycle status | deprecated |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Deprecated compatibility key; use math. |
| Replaced by | [`math`](/py/namespaces/compute#math) |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.maths` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY maths implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)

</details>
