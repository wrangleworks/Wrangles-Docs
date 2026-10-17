---
title: "Text"
description: "Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score."
sidebar_label: "Text"
slug: "/compare/text"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Text <CopyableCode value="compare.text" />

Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score.

Compare two strings and return the intersection or difference, or use overlap to find the matching characters between the two strings.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | the columns to compare. First column is the base column | array | — | Yes |
| `output` | The column to output the results to. Must be a list of two column names [mask_column, ratio_column] when method is overlap and include_ratio is true; otherwise a single column name. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The type of comparison to perform (difference, intersection, overlap, similarity) | string; one of:<ul className="ww-param-enum-values"><li>difference</li><li>intersection</li><li>overlap</li><li>similarity</li></ul> | `"difference"` | Yes |
| `char` | (Optional) The character to split the strings on. Default is a space | string | `" "` | No |
| `exact_match` | (Optional) Value to use for exact matches | string | `null` | No |
| `empty_a` | (Optional) Value to use for empty input a | string | `null` | No |
| `empty_b` | (Optional) Value to use for empty input b | string | `null` | No |
| `all_empty` | (Optional) Value to use for both inputs | string | `null` | No |
| `case_sensitive` | (Optional) Whether the comparison is case sensitive. Default is False | boolean | `false` | No |
| `metric` | (Optional) The similarity metric to use. Default is token_sort |  | `"token_sort"` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `non_match_char` | (Optional) Character to use for non-matching characters | string | `"*"` | No |
| `include_ratio` | (Optional) Include the ratio of matching characters. This is the legacy difflib.SequenceMatcher score, not the similarity score from method: similarity. When true, output must be a list of two column names: [mask_column, ratio_column] | boolean | `false` | No |
| `decimal_places` | (Optional) Number of decimal places to round the score to. Default is 3 | integer | `3` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Compare two strings and return the intersection or difference, use overlap to find the matching characters between the two strings, or use similarity to get a numeric similarity score.",
  "required": [
    "input",
    "output",
    "method"
  ],
  "properties": {
    "input": {
      "type": "array",
      "description": "the columns to compare. First column is the base column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "The column to output the results to. Must be a list of two column names [mask_column, ratio_column] when method is overlap and include_ratio is true; otherwise a single column name."
    },
    "method": {
      "type": "string",
      "description": "The type of comparison to perform (difference, intersection, overlap, similarity)",
      "enum": [
        "difference",
        "intersection",
        "overlap",
        "similarity"
      ]
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
  },
  "allOf": [
    {
      "if": {
        "properties": {
          "method": {
            "const": "difference"
          }
        }
      },
      "then": {
        "properties": {
          "char": {
            "type": "string",
            "description": "(Optional) The character to split the strings on. Default is a space"
          },
          "case_sensitive": {
            "type": "boolean",
            "description": "(Optional) Whether the comparison is case sensitive. Default is False"
          }
        }
      }
    },
    {
      "if": {
        "properties": {
          "method": {
            "const": "intersection"
          }
        }
      },
      "then": {
        "properties": {
          "char": {
            "type": "string",
            "description": "(Optional) The character to split the strings on. Default is a space"
          },
          "case_sensitive": {
            "type": "boolean",
            "description": "(Optional) Whether the comparison is case sensitive. Default is False"
          }
        }
      }
    },
    {
      "if": {
        "properties": {
          "method": {
            "const": "overlap"
          }
        }
      },
      "then": {
        "properties": {
          "non_match_char": {
            "type": "string",
            "description": "(Optional) Character to use for non-matching characters"
          },
          "include_ratio": {
            "type": "boolean",
            "description": "(Optional) Include the ratio of matching characters. This is the legacy difflib.SequenceMatcher score, not the similarity score from method: similarity. When true, output must be a list of two column names: [mask_column, ratio_column]"
          },
          "decimal_places": {
            "type": "integer",
            "description": "(Optional) Number of decimal places to round the ratio to"
          },
          "exact_match": {
            "type": "string",
            "description": "(Optional) Value to use for exact matches"
          },
          "empty_a": {
            "type": "string",
            "description": "(Optional) Value to use for empty input a"
          },
          "empty_b": {
            "type": "string",
            "description": "(Optional) Value to use for empty input b"
          },
          "all_empty": {
            "type": "string",
            "description": "(Optional) Value to use for both inputs"
          },
          "case_sensitive": {
            "type": "boolean",
            "description": "(Optional) Whether the comparison is case sensitive. Default is False"
          }
        }
      }
    },
    {
      "if": {
        "properties": {
          "method": {
            "const": "similarity"
          }
        }
      },
      "then": {
        "properties": {
          "metric": {
            "type": "string",
            "description": "(Optional) The similarity metric to use. Default is token_sort",
            "oneOf": [
              {
                "const": "token_sort",
                "description": "Ignores token order but keeps duplicate tokens, penalizing missing or extra content. Best general-purpose choice for comparing full descriptions where word order may differ."
              },
              {
                "const": "damerau_levenshtein",
                "description": "Sequential character-edit similarity that recognizes adjacent transpositions (e.g. smtih vs smith) as a single edit. Best for short, order-sensitive strings like part numbers or codes."
              },
              {
                "const": "token_set",
                "description": "Ignores token order and duplicate tokens. A shorter token set fully contained in a longer one can score 1.0. Best when one description is expected to be a subset of the other."
              }
            ]
          },
          "decimal_places": {
            "type": "integer",
            "description": "(Optional) Number of decimal places to round the score to. Default is 3"
          }
        }
      }
    }
  ]
}
```

</details>

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
| Catalog ID | `2` |
| Catalog key | `compare.text` |
| Recipe key | `compare.text` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `compare` |
| Documentation group | `compare` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compare.text` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `31905b74-ce58-45cd-8add-821cc04ab946` |

**Sources**

- [WranglesPY compare.text implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py)
- [Archived compare.text Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compare/_sources/text.md)

</details>
