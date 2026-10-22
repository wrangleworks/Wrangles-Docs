---
title: "Index"
description: "Create column(s) with an incremental index. e.g. 1,2,3..."
sidebar_label: "Index"
slug: "/create/index"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Index <CopyableCode value="create.index" />

Create a new incremental index.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create column(s) with an incremental index. e.g. 1,2,3...",
  "additionalProperties": false,
  "required": [
    "output"
  ],
  "properties": {
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of names of new columns"
    },
    "start": {
      "type": "integer",
      "description": "(Optional; default 1) Starting number for the index"
    },
    "step": {
      "type": "integer",
      "description": "(Optional; default 1) Step between successive rows"
    },
    "by": {
      "type": [
        "string",
        "array"
      ],
      "description": "Optional. Cluster the created indexes by one or more columns"
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
  - create.index:
      output: New Index
      start: 1    # optional
      step: 1     # optional
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| Hammer |
| Drill |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Index |
| --- |
| 1 |
| 2 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns | string, array | — | Yes |
| `by` | Optional. Cluster the created indexes by one or more columns | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `start` | (Optional; default 1) Starting number for the index | integer | `1` | No |
| `step` | (Optional; default 1) Step between successive rows | integer | `1` | No |
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
| Catalog ID | `17` |
| Catalog key | `create.index` |
| Recipe key | `create.index` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.index` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `0a4909ca-6e14-4da7-8a70-a7fd106d6944` |

**Sources**

- [WranglesPY create.index implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.index Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/index.md)

</details>
