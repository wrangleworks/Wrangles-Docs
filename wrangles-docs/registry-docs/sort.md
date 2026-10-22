---
title: "Sort"
description: "Sort the data."
sidebar_label: "Sort"
slug: "/sort"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Sort <CopyableCode value="sort" />

Sort the data

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Sort the data",
  "additionalProperties": true,
  "required": [
    "by"
  ],
  "properties": {
    "by": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of the column(s) to sort by"
    },
    "ascending": {
      "type": [
        "boolean",
        "array"
      ],
      "items": {
        "type": "boolean"
      },
      "description": "Sort ascending vs. descending. Specify a list to sort multiple columns in different orders. If this is a list of bools then it must match the length of the by."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where_special"
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
  - sort:
      by: Price
      ascending: true
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Item | Price |
| --- | --- |
| Hammer | 11.99 |
| Chisel | 4.99 |
| Drill | 29.99 |
| Wrench | 6.99 |
| Saw | 13.99 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Item | Price |
| --- | --- |
| Chisel | 4.99 |
| Wrench | 6.99 |
| Hammer | 11.99 |
| Saw | 13.99 |
| Drill | 29.99 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `by` | Name or list of the column(s) to sort by | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `ascending` | Sort ascending vs. descending. Specify a list to sort multiple columns in different orders. If this is a list of bools then it must match the length of the by. | boolean, array | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `ignore_index` | Ignore Index value accepted by the runtime. | Any JSON value (not constrained upstream) | `true` | No |
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
| Catalog ID | `93` |
| Catalog key | `sort` |
| Recipe key | `sort` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.sort` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `1dcf06ad-898a-4d83-862c-4774be37a687` |

**Sources**

- [WranglesPY sort implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived sort Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/sort.md)

</details>
