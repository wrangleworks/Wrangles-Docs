---
title: "Lists"
description: "Take lists in multiple columns and merge them to a single list."
sidebar_label: "Lists"
slug: "/merge/lists"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Lists <CopyableCode value="merge.lists" />

Take lists in multiple columns and merge them to a single list.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Take lists in multiple columns and merge them to a single list.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": "array",
      "description": "List of input columns"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "remove_duplicates": {
      "type": "boolean",
      "description": "Whether to remove duplicates from the created list"
    },
    "ignore_case": {
      "type": "boolean",
      "description": "Ignore case when removing duplicates"
    },
    "include_empty": {
      "type": "boolean",
      "description": "Whether to include empty values in the created list"
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
  - merge.lists:
      input:
        - Col1
        - Col2
      output: Combined Col
      remove_duplicates: false
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| ['A', 'B'] | ['D', 'E'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Combined Col |
| --- |
| ['A', 'B', 'D', 'E'] |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns | array | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `remove_duplicates` | Whether to remove duplicates from the created list | boolean | `false` | No |
| `ignore_case` | Ignore case when removing duplicates | boolean | `false` | No |
| `include_empty` | Whether to include empty values in the created list | boolean | `true` | No |
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
| Catalog ID | `44` |
| Catalog key | `merge.lists` |
| Recipe key | `merge.lists` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.lists` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `d9978f00-b3d4-4583-884e-a53b98a43e9a` |

**Sources**

- [WranglesPY merge.lists implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.lists Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/lists.md)

</details>
