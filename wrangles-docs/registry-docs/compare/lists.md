---
title: "Lists"
description: "Compare multiple lists and return the intersection, difference, or union."
sidebar_label: "Lists"
slug: "/compare/lists"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Lists <CopyableCode value="compare.lists" />

Compare multiple lists and return the intersection, difference, or union.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns containing lists to compare | array | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | Type of comparison to perform | string; one of:<ul className="ww-param-enum-values"><li>intersection</li><li>difference</li><li>union</li></ul> | `"intersection"` | Yes |
| `remove_duplicates` | Remove duplicates from the result | boolean | `false` | No |
| `ignore_case` | Ignore case when comparing string items | boolean | `false` | No |
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
  "description": "Compare multiple lists and return the intersection, difference, or union",
  "required": [
    "input",
    "output",
    "method"
  ],
  "properties": {
    "input": {
      "type": "array",
      "description": "List of input columns containing lists to compare"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "method": {
      "type": "string",
      "description": "Type of comparison to perform",
      "enum": [
        "intersection",
        "difference",
        "union"
      ]
    },
    "remove_duplicates": {
      "type": "boolean",
      "description": "Remove duplicates from the result"
    },
    "ignore_case": {
      "type": "boolean",
      "description": "Ignore case when comparing string items"
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
  - compare.lists:
      input:
        - Col1
        - Col2
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
        - Col1
        - Col2
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
        - Col1
        - Col2
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
| Catalog ID | `1` |
| Catalog key | `compare.lists` |
| Recipe key | `compare.lists` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `compare` |
| Documentation group | `compare` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.compare.lists` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `a393225e-7ccf-4708-83f8-d5abd6ba9b1e` |

**Sources**

- [WranglesPY compare.lists implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compare.py)
- [Archived compare.lists Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compare/_sources/lists.md)

</details>
