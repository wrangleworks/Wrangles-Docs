---
title: "Bins"
description: "Create a column that groups data into bins."
sidebar_label: "Bins"
slug: "/create/bins"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Bins <CopyableCode value="create.bins" />

Create a column that groups data into bins.

Creates a column that segments and sorts data values into bins. `bins` can be an integer or a list. When `bins` is an integer, the input data is split equally into that number of bins. When `bins` is a list, the input data is split based on the list boundaries.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of input column | array | — | Yes |
| `output` | Name of new column | array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `bins` | Defines the number of equal-width bins in the range | integer, array | — | Yes |
| `labels` | Labels for the returned bins | string, array | `null` | No |
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
  "description": "Create a column that groups data into bins",
  "additionalProperties": false,
  "required": [
    "input",
    "output",
    "bins"
  ],
  "properties": {
    "input": {
      "type": [
        "array"
      ],
      "description": "Name of input column"
    },
    "output": {
      "type": [
        "array"
      ],
      "description": "Name of new column"
    },
    "bins": {
      "type": [
        "integer",
        "array"
      ],
      "description": "Defines the number of equal-width bins in the range"
    },
    "labels": {
      "type": [
        "string",
        "array"
      ],
      "description": "Labels for the returned bins"
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
  - create.bins:
      input: [Data]
      output: [Category]
      bins: 3
      labels:
        - Bad
        - Medium
        - Good
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Data |
| --- |
| 1 |
| 7 |
| 5 |
| 4 |
| 6 |
| 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Category |
| --- |
| Bad |
| Good |
| Medium |
| Medium |
| Good |
| Bad |

</div>

</div>





```yaml
wrangles:
  - create.bins:
      input: [Grades]
      output: [Letter Grade]
      bins:
        - 0
        - 60
        - 70
        - 80
        - 90
        - 100
      labels:
        - F
        - D
        - C
        - B
        - A
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Grade | Student |
| --- | --- |
| 64 | Charles |
| 92 | Sabrina |
| 76 | Edward |
| 84 | Wendy |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Letter Grade |
| --- |
| D |
| A |
| C |
| B |

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
| Catalog ID | `12` |
| Catalog key | `create.bins` |
| Recipe key | `create.bins` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.bins` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `232e3ba0-4735-4934-88aa-0163181abb3f` |

**Sources**

- [WranglesPY create.bins implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.bins Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/bins.md)

</details>
