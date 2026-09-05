---
title: "Text"
description: "Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score."
sidebar_label: "Text"
slug: "/compare/text"
---

# Text

Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | The columns to compare. First column is the base column. | — |
| `output` | Yes | string, array | The column to output the results to. Must be a list of two column names [mask_column, ratio_column] when method is overlap and include_ratio is true; otherwise a single column name. | — |
| `method` | No | string; one of: difference, intersection, overlap, similarity | The type of comparison to perform (difference, intersection, overlap, similarity). | `"difference"` |
| `char` | No | string | Character to split strings on for difference and intersection. Defaults to a space. | `" "` |
| `non_match_char` | No | string | Character to use for non-matching characters when using overlap. | `"*"` |
| `include_ratio` | No | boolean | Include the ratio of matching characters when using overlap. | `false` |
| `decimal_places` | No | integer | Number of decimal places to round the overlap ratio to. | `3` |
| `exact_match` | No | string, null | Value to use for exact matches when using overlap. | `null` |
| `empty_a` | No | string, null | Value to use when input A is empty when using overlap. | `null` |
| `empty_b` | No | string, null | Value to use when input B is empty when using overlap. | `null` |
| `all_empty` | No | string, null | Value to use when both inputs are empty when using overlap. | `null` |
| `case_sensitive` | No | boolean | Whether the comparison is case sensitive. Defaults to true. | `false` |
| `metric` | No | string | Metric value accepted by the runtime. | `"token_sort"` |
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

Compare two strings and return the intersection or difference, or use overlap to find the matching characters between the two strings.

## Migrated examples
#### Comparing the difference between two columns of text

##### Recipe

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

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| Large Oak Wood White Marble Top Bookshelf | Large Pine Wood Black Marble Bottom Bookshelf |
| Medium Oak Wood White Marble Top Coffee Table | Medium Maple Wood Orange Steel Top Coffee Table |
| Small Oak Wood White Marble Top Console Table | Small Normal Wood Blue Plastic Top Console Table |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Difference |
| --- |
| Pine Black Bottom |
| Maple Orange Steel |
| Normal Blue Plastic |

</div>

</div>

#### Comparing the intersection of two columns of text

##### Recipe

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

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| Large Oak Wood White Marble Top Bookshelf | Large Pine Wood Black Marble Bottom Bookshelf |
| Medium Oak Wood White Marble Top Coffee Table | Medium Maple Wood Orange Steel Top Coffee Table |
| Small Oak Wood White Marble Top Console Table | Small Normal Wood Blue Plastic Top Console Table |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Intersection |
| --- |
| Large Wood Marble Bookshelf |
| Medium Wood Top Coffee Table |
| Small Wood Top Console Table |

</div>

</div>

#### Comparing the overlap of two columns of text

##### Recipe

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

<div className="ww-sample-panel">

##### Input Sample

| Part Code1 | Part Code2 |
| --- | --- |
| SKF6202 | TMKN6202 |
| X06-02-000 | X06-81-000 |
| 7100E15-V-230/3 | 7100E15-V-120/1 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Overlap |
| --- |
| ****6202 |
| X06-**-000 |
| 7100E15-V-\**0/\* |

</div>

</div>

## Provenance

- [WranglesPY compare.text implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py)
- [Existing compare.text Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/text.md)

## Registry metadata

- Registry ID: `31905b74-ce58-45cd-8add-821cc04ab946`
- Namespace: `compare`
- Recipe key: `compare.text`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.compare.text`
- Status: `active`
- Registry version: `0.1.0-pilot`
