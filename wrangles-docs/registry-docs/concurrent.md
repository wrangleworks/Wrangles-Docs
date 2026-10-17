---
title: "Concurrent"
description: "Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles."
sidebar_label: "Concurrent"
slug: "/concurrent"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Concurrent <CopyableCode value="concurrent" />

Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles.

Run multiple wrangles concurrently instead of sequentially. Concurrent wrangles must declare output columns, may finish in any order, and should not update overlapping columns.

See the [Concurrent connector](/py/connectors/concurrent) for the connector equivalent.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | The wrangles section of a recipe to execute for each combination of variables | array | — | Yes |
| `max_concurrency` | The maximum number of wrangles to execute in parallel | integer | `10` | No |
| `use_multiprocessing` | Use process-based workers instead of threads. This is an advanced runtime option. | Any JSON value (not constrained upstream) | `false` | No |
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
  "description": "Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles.",
  "additionalProperties": false,
  "required": [
    "wrangles"
  ],
  "properties": {
    "wrangles": {
      "type": "array",
      "description": "The wrangles section of a recipe to execute for each combination of variables",
      "minItems": 1,
      "items": [
        {
          "$ref": "#/$defs/wrangles/items"
        }
      ]
    },
    "max_concurrency": {
      "type": "integer",
      "description": "The maximum number of wrangles to execute in parallel",
      "minimum": 1
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

```yaml
wrangles:
  - concurrent:
      wrangles:
        - extract.codes:
            input: Products
            output: Part Codes
        - extract.attributes:
            input: Products
            output: Attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products |
| --- |
| SKF ball brg 2" od 6202 |
| brg seal 1" id 5493 |
| 3lb hammer 87102 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Part Codes | Attributes |
| --- | --- |
| 6202 | `{"length":["2in"]}` |
| 5493 | `{"length":["1in"]}` |
| 87102 | `{"weight":["3lb"]}` |

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
| Catalog ID | `73` |
| Catalog key | `concurrent` |
| Recipe key | `concurrent` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Concurrent orchestration is not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.concurrent` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY concurrent implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived concurrent Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/concurrent.md)

</details>
