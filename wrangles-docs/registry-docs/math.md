---
title: "Math"
description: "Apply a mathematical calculation."
sidebar_label: "Math"
slug: "/math"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Math <CopyableCode value="math" />

Apply a mathematical calculation.

Apply mathematical calculations to columns. Also called as `maths`.

:::info
Spaces within column headers are replaced with underscores automatically. Account for this when writing expressions in `input`.
:::

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The mathematical expression using column names. e.g. column1 * column2<br />+ column3.  Note: spaces within column names are replaced by underscores (_).<br /> | string, integer | — | Yes |
| `output` | The column to output the results to | string | — | Yes |
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
  "description": "Apply a mathematical calculation.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "The mathematical expression using column names. e.g. column1 * column2\n+ column3.  Note: spaces within column names are replaced by underscores (_).\n"
    },
    "output": {
      "type": "string",
      "description": "The column to output the results to"
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
  - math:
      input: sqrt(Values)
      output: Square Root
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Values |
| --- |
| 4 |
| 9 |
| 16 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Square Root |
| --- |
| 2 |
| 3 |
| 4 |

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
| Catalog ID | `82` |
| Catalog key | `math` |
| Recipe key | `math` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.math` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `494b11ad-00c1-4748-8b93-6bec982f4fec` |

**Sources**

- [WranglesPY math implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived math Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/math.md)

</details>
