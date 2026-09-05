---
title: "Text"
description: "Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score."
sidebar_label: "Text"
slug: "/compare/text"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Text

Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score.

Compare two strings and return the intersection or difference, or use overlap to find the matching characters between the two strings.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The columns to compare. First column is the base column. | array | — | Yes |
| `output` | The column to output the results to. Must be a list of two column names [mask_column, ratio_column] when method is overlap and include_ratio is true; otherwise a single column name. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The type of comparison to perform (difference, intersection, overlap, similarity). | string; one of:<ul className="ww-param-enum-values"><li>difference</li><li>intersection</li><li>overlap</li><li>similarity</li></ul> | `"difference"` | No |
| `char` | Character to split strings on for difference and intersection. Defaults to a space. | string | `" "` | No |
| `exact_match` | Value to use for exact matches when using overlap. | string, null | `null` | No |
| `empty_a` | Value to use when input A is empty when using overlap. | string, null | `null` | No |
| `empty_b` | Value to use when input B is empty when using overlap. | string, null | `null` | No |
| `all_empty` | Value to use when both inputs are empty when using overlap. | string, null | `null` | No |
| `case_sensitive` | Whether the comparison is case sensitive. Defaults to true. | boolean | `false` | No |
| `metric` | Metric value accepted by the runtime. | string | `"token_sort"` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `non_match_char` | Character to use for non-matching characters when using overlap. | string | `"*"` | No |
| `include_ratio` | Include the ratio of matching characters when using overlap. | boolean | `false` | No |
| `decimal_places` | Number of decimal places to round the overlap ratio to. | integer | `3` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - compare.text:
      input:
        - col1
        - col2
      output: Difference
      method: difference
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| Large Oak Wood White Marble Top Bookshelf | Large Pine Wood Black Marble Bottom Bookshelf |
| Medium Oak Wood White Marble Top Coffee Table | Medium Maple Wood Orange Steel Top Coffee Table |
| Small Oak Wood White Marble Top Console Table | Small Normal Wood Blue Plastic Top Console Table |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Difference |
| --- |
| Pine Black Bottom |
| Maple Orange Steel |
| Normal Blue Plastic |

</div>

</div>





```yaml
wrangles:
  - compare.text:
      input:
        - col1
        - col2
      output: Intersection
      method: intersection
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| Large Oak Wood White Marble Top Bookshelf | Large Pine Wood Black Marble Bottom Bookshelf |
| Medium Oak Wood White Marble Top Coffee Table | Medium Maple Wood Orange Steel Top Coffee Table |
| Small Oak Wood White Marble Top Console Table | Small Normal Wood Blue Plastic Top Console Table |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Intersection |
| --- |
| Large Wood Marble Bookshelf |
| Medium Wood Top Coffee Table |
| Small Wood Top Console Table |

</div>

</div>





```yaml
wrangles:
  - compare.text:
      input:
        - Part Code1
        - Part Code2
      output: Overlap
      method: overlap
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part Code1 | Part Code2 |
| --- | --- |
| SKF6202 | TMKN6202 |
| X06-02-000 | X06-81-000 |
| 7100E15-V-230/3 | 7100E15-V-120/1 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Overlap |
| --- |
| ****6202 |
| X06-**-000 |
| 7100E15-V-\**0/\* |

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
| Recipe key | `compare.text` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `compare` |
| Documentation group | `compare` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compare.text` |

**Sources**

- [WranglesPY compare.text implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py)
- [Existing compare.text Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/text.md)

</details>
