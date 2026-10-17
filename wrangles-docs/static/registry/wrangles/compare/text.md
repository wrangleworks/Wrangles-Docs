---
schema_version: '0.2'
type: 'wrangle'
id: '31905b74-ce58-45cd-8add-821cc04ab946'
wrangle_name: 'text'
namespace: 'compare'
title: 'Text'
description: 'Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score.'
wrangle_key: 'compare.text'
aliases: []
slug: 'compare/text'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'compare'
  - 'text'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.compare.text'
  contract_status: 'verified'
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
  - name: 'input'
    description: 'the columns to compare. First column is the base column'
    required: true
    param_group: 'I/O'
    schema:
      type: 'array'
      description: 'the columns to compare. First column is the base column'
    runtime_required: true
  - name: 'output'
    description: 'The column to output the results to. Must be a list of two column names [mask_column, ratio_column] when method is overlap and include_ratio is true; otherwise a single column name.'
    required: true
    param_group: 'I/O'
    schema:
      type:
        - 'string'
        - 'array'
      description: 'The column to output the results to. Must be a list of two column names [mask_column, ratio_column] when method is overlap and include_ratio is true; otherwise a single column name.'
    runtime_required: true
  - name: 'method'
    description: 'The type of comparison to perform (difference, intersection, overlap, similarity)'
    required: true
    param_group: 'Options'
    runtime_default: 'difference'
    schema:
      type: 'string'
      description: 'The type of comparison to perform (difference, intersection, overlap, similarity)'
      enum:
        - 'difference'
        - 'intersection'
        - 'overlap'
        - 'similarity'
    runtime_required: false
  - name: 'char'
    description: '(Optional) The character to split the strings on. Default is a space'
    required: false
    param_group: 'Options'
    runtime_default: ' '
    schema:
      type: 'string'
      description: '(Optional) The character to split the strings on. Default is a space'
    runtime_required: false
  - name: 'non_match_char'
    description: '(Optional) Character to use for non-matching characters'
    required: false
    param_group: 'Formatting'
    runtime_default: '*'
    schema:
      type: 'string'
      description: '(Optional) Character to use for non-matching characters'
    runtime_required: false
  - name: 'include_ratio'
    description: '(Optional) Include the ratio of matching characters. This is the legacy difflib.SequenceMatcher score, not the similarity score from method: similarity. When true, output must be a list of two column names: [mask_column, ratio_column]'
    required: false
    param_group: 'Formatting'
    runtime_default: false
    schema:
      type: 'boolean'
      description: '(Optional) Include the ratio of matching characters. This is the legacy difflib.SequenceMatcher score, not the similarity score from method: similarity. When true, output must be a list of two column names: [mask_column, ratio_column]'
    runtime_required: false
  - name: 'decimal_places'
    description: '(Optional) Number of decimal places to round the score to. Default is 3'
    required: false
    param_group: 'Formatting'
    runtime_default: 3
    schema:
      type: 'integer'
      description: '(Optional) Number of decimal places to round the score to. Default is 3'
    runtime_required: false
  - name: 'exact_match'
    description: '(Optional) Value to use for exact matches'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'string'
      description: '(Optional) Value to use for exact matches'
    runtime_required: false
  - name: 'empty_a'
    description: '(Optional) Value to use for empty input a'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'string'
      description: '(Optional) Value to use for empty input a'
    runtime_required: false
  - name: 'empty_b'
    description: '(Optional) Value to use for empty input b'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'string'
      description: '(Optional) Value to use for empty input b'
    runtime_required: false
  - name: 'all_empty'
    description: '(Optional) Value to use for both inputs'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'string'
      description: '(Optional) Value to use for both inputs'
    runtime_required: false
  - name: 'case_sensitive'
    description: '(Optional) Whether the comparison is case sensitive. Default is False'
    required: false
    param_group: 'Options'
    runtime_default: false
    schema:
      type: 'boolean'
      description: '(Optional) Whether the comparison is case sensitive. Default is False'
    runtime_required: false
  - name: 'metric'
    description: '(Optional) The similarity metric to use. Default is token_sort'
    required: false
    param_group: 'Options'
    runtime_default: 'token_sort'
    schema:
      type: 'string'
      description: '(Optional) The similarity metric to use. Default is token_sort'
      oneOf:
        - const: 'token_sort'
          description: 'Ignores token order but keeps duplicate tokens, penalizing missing or extra content. Best general-purpose choice for comparing full descriptions where word order may differ.'
        - const: 'damerau_levenshtein'
          description: 'Sequential character-edit similarity that recognizes adjacent transpositions (e.g. smtih vs smith) as a single edit. Best for short, order-sensitive strings like part numbers or codes.'
        - const: 'token_set'
          description: 'Ignores token order and duplicate tokens. A shorter token set fully contained in a longer one can score 1.0. Best when one description is expected to be a subset of the other.'
    runtime_required: false
examples: []
sources:
  - id: 'runtime'
    resource: 'https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py'
    title: 'WranglesPY compare.text implementation'
  - id: 'legacy-docs-archive'
    resource: 'https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compare/_sources/text.md'
    title: 'Archived compare.text Markdown'
configuration_schema:
  type: 'object'
  description: 'Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score.'
  required:
    - 'input'
    - 'output'
    - 'method'
  properties:
    input:
      type: 'array'
      description: 'the columns to compare. First column is the base column'
    output:
      type:
        - 'string'
        - 'array'
      description: 'The column to output the results to. Must be a list of two column names [mask_column, ratio_column] when method is overlap and include_ratio is true; otherwise a single column name.'
    method:
      type: 'string'
      description: 'The type of comparison to perform (difference, intersection, overlap, similarity)'
      enum:
        - 'difference'
        - 'intersection'
        - 'overlap'
        - 'similarity'
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
  allOf:
    - if:
        properties:
          method:
            const: 'difference'
      then:
        properties:
          char:
            type: 'string'
            description: '(Optional) The character to split the strings on. Default is a space'
          case_sensitive:
            type: 'boolean'
            description: '(Optional) Whether the comparison is case sensitive. Default is False'
    - if:
        properties:
          method:
            const: 'intersection'
      then:
        properties:
          char:
            type: 'string'
            description: '(Optional) The character to split the strings on. Default is a space'
          case_sensitive:
            type: 'boolean'
            description: '(Optional) Whether the comparison is case sensitive. Default is False'
    - if:
        properties:
          method:
            const: 'overlap'
      then:
        properties:
          non_match_char:
            type: 'string'
            description: '(Optional) Character to use for non-matching characters'
          include_ratio:
            type: 'boolean'
            description: '(Optional) Include the ratio of matching characters. This is the legacy difflib.SequenceMatcher score, not the similarity score from method: similarity. When true, output must be a list of two column names: [mask_column, ratio_column]'
          decimal_places:
            type: 'integer'
            description: '(Optional) Number of decimal places to round the ratio to'
          exact_match:
            type: 'string'
            description: '(Optional) Value to use for exact matches'
          empty_a:
            type: 'string'
            description: '(Optional) Value to use for empty input a'
          empty_b:
            type: 'string'
            description: '(Optional) Value to use for empty input b'
          all_empty:
            type: 'string'
            description: '(Optional) Value to use for both inputs'
          case_sensitive:
            type: 'boolean'
            description: '(Optional) Whether the comparison is case sensitive. Default is False'
    - if:
        properties:
          method:
            const: 'similarity'
      then:
        properties:
          metric:
            type: 'string'
            description: '(Optional) The similarity metric to use. Default is token_sort'
            oneOf:
              - const: 'token_sort'
                description: 'Ignores token order but keeps duplicate tokens, penalizing missing or extra content. Best general-purpose choice for comparing full descriptions where word order may differ.'
              - const: 'damerau_levenshtein'
                description: 'Sequential character-edit similarity that recognizes adjacent transpositions (e.g. smtih vs smith) as a single edit. Best for short, order-sensitive strings like part numbers or codes.'
              - const: 'token_set'
                description: 'Ignores token order and duplicate tokens. A shorter token set fully contained in a longer one can score 1.0. Best when one description is expected to be a subset of the other.'
          decimal_places:
            type: 'integer'
            description: '(Optional) Number of decimal places to round the score to. Default is 3'
schema_origin: 'upstream-docstring'
schema_adjustments: []
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
