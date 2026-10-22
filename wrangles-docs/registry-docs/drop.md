---
title: "Drop"
description: "Drop (Delete) selected column(s)."
sidebar_label: "Drop"
slug: "/drop"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Drop <CopyableCode value="drop" />

Drop (Delete) selected column(s)

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Drop (Delete) selected column(s)",
  "additionalProperties": true,
  "required": [
    "columns"
  ],
  "properties": {
    "columns": {
      "type": [
        "array",
        "string"
      ],
      "description": "Name of the column(s) to drop"
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    }
  }
}
```

</details>

## Examples

```yaml
wrangles:
  - drop:
      columns:
        - Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `columns` | Name of the column(s) to drop | array, string | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |

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
| Catalog ID | `76` |
| Catalog key | `drop` |
| Recipe key | `drop` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.drop` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `363bffbf-397e-4975-8382-e9efa5e9eed6` |

**Sources**

- [WranglesPY drop implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived drop Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/drop.md)

</details>
