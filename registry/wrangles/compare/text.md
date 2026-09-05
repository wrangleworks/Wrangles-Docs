---
schema_version: '0.2'
type: wrangle
id: 31905b74-ce58-45cd-8add-821cc04ab946
wrangle_name: text
namespace: compare
title: Text
description: >-
  Compare two strings and return the intersection or difference, use overlap to find the matching
  characters between the two strings, or use similarity to get a numeric similarity score.
wrangle_key: compare.text
aliases: []
slug: compare/text
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - compare
  - text
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.compare.text
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
    description: The columns to compare. First column is the base column.
    required: true
    param_group: I/O
    schema:
      type: array
  - name: output
    description: >-
      The column to output the results to. Must be a list of two column names [mask_column,
      ratio_column] when method is overlap and include_ratio is true; otherwise a single column
      name.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
  - name: method
    description: The type of comparison to perform (difference, intersection, overlap, similarity).
    required: false
    param_group: Options
    runtime_default: difference
    schema:
      type: string
      enum:
        - difference
        - intersection
        - overlap
        - similarity
  - name: char
    description: Character to split strings on for difference and intersection. Defaults to a space.
    required: false
    param_group: Options
    runtime_default: ' '
    schema:
      type: string
  - name: non_match_char
    description: Character to use for non-matching characters when using overlap.
    required: false
    param_group: Formatting
    runtime_default: '*'
    schema:
      type: string
  - name: include_ratio
    description: Include the ratio of matching characters when using overlap.
    required: false
    param_group: Formatting
    runtime_default: false
    schema:
      type: boolean
  - name: decimal_places
    description: Number of decimal places to round the overlap ratio to.
    required: false
    param_group: Formatting
    runtime_default: 3
    schema:
      type: integer
  - name: exact_match
    description: Value to use for exact matches when using overlap.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: empty_a
    description: Value to use when input A is empty when using overlap.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: empty_b
    description: Value to use when input B is empty when using overlap.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: all_empty
    description: Value to use when both inputs are empty when using overlap.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: case_sensitive
    description: Whether the comparison is case sensitive. Defaults to true.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: metric
    description: Metric value accepted by the runtime.
    required: false
    param_group: Options
    runtime_default: token_sort
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py
    title: WranglesPY compare.text implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/text.md
    title: Existing compare.text Markdown
---

# Text

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
