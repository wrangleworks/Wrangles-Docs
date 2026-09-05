---
title: "Compare Wrangles"
description: "Compare wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Compare"
slug: "/namespaces/compare"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Compare Wrangles

Compare wrangles, with recipe examples, parameters, and behavior.

## Lists {#lists}

Compare multiple lists and return the intersection, difference, or union.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns containing lists to compare. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | Type of comparison to perform. | string; one of:<ul className="ww-param-enum-values"><li>intersection</li><li>difference</li><li>union</li></ul> | `"intersection"` | No |
| `remove_duplicates` | Remove duplicates from the result. | boolean | `false` | No |
| `ignore_case` | Ignore case when comparing string items. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - compare.lists:
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
| [A, B, C] | [C, D, E] |
| [H, I, J, K] | [H, I, J] |
| [X, Y, Z] | [1, 2, 3] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Difference |
| --- |
| [A, B] |
| [K] |
| [X, Y, Z] |

</div>

</div>





```yaml
wrangles:
  - compare.lists:
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
| [A, B, C] | [C, D, E] |
| [H, I, J, K] | [H, I, J] |
| [X, Y, Z] | [1, 2, 3] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Intersection |
| --- |
| [C] |
| [H, I, J] |
| [] |

</div>

</div>





```yaml
wrangles:
  - compare.lists:
      input:
        - col1
        - col2
      output: Union
      method: union
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| [A, B, C] | [C, D, E] |
| [H, I, J, K] | [H, I, J] |
| [X, Y, Z] | [1, 2, 3] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Union |
| --- |
| [A, B, C, D, E] |
| [H, I, J, K] |
| [X, Y, Z, 1, 2, 3] |

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
| Recipe key | `compare.lists` |
| Lifecycle status | active |
| Namespace | `compare` |
| Documentation group | `compare` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compare.lists` |

**Sources**

- [WranglesPY compare.lists implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py)
- [Existing compare.lists Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/lists.md)

</details>


---

## Text {#text}

Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score.

Compare two strings and return the intersection or difference, or use overlap to find the matching characters between the two strings.

### Parameters

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

### Examples

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
| Namespace | `compare` |
| Documentation group | `compare` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compare.text` |

**Sources**

- [WranglesPY compare.text implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py)
- [Existing compare.text Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/text.md)

</details>


---

## Similarity {#similarity}

Calculate the cosine similarity of two vectors.

Calculate the similarity of two vectors.

:::info
Similarity only works on vectors. To produce vectors from a column of strings, use `create.embeddings` first.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Two columns of vectors to compare the similarity of. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The type of similarity to calculate (cosine or euclidean). Adjusted cosine adjusts the default cosine calculation to cover a range of 0-1 for typical comparisons. | string; one of:<ul className="ww-param-enum-values"><li>cosine</li><li>adjusted cosine</li><li>euclidean</li></ul> | `"cosine"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - create.embeddings:
      input: col1
      api_key: ${my_key}
      output: col1 embeddings

  - create.embeddings:
      input: col2
      api_key: ${my_key}
      output: col2 embeddings

  - similarity:
      input:
        - col1 embeddings
        - col2 embeddings
      output: similarity
      method: adjusted cosine
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| col1 | col2 |
| --- | --- |
| SKF | Timken |
| Ball Bearing | Roller Bearing |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| col1 embeddings | col2 embeddings | similarity |
| --- | --- | --- |
| [1, 2, 3, 4] | [4, 3, 2, 1] | 0.158931 |
| [5, 6, 7, 8] | [5, 6, 7, 9] | 0.942437 |

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
| Recipe key | `similarity` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `compare` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.similarity` |

**Sources**

- [WranglesPY similarity implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing similarity Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compare/_sources/similarity.md)

</details>
