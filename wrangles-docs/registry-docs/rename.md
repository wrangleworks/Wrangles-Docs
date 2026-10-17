---
title: "Rename"
description: "Rename a column or list of columns."
sidebar_label: "Rename"
slug: "/rename"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Rename <CopyableCode value="rename" />

Rename a column or list of columns.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | `null` | No |
| `output` | Name or list of output columns. | string, array | `null` | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | Use wrangles to transform the column names.<br />The input is named 'columns' and the final result<br />must also include the column named 'columns'.<br />This can only be used instead of the standard rename. | array | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |

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
  "description": "Rename a column or list of columns.",
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input columns."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output columns."
    },
    "wrangles": {
      "type": "array",
      "description": "Use wrangles to transform the column names.\nThe input is named 'columns' and the final result\nmust also include the column named 'columns'.\nThis can only be used instead of the standard rename.",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    }
  }
}
```

</details>

## Examples

:::note
Rename is not compatible with `where` filtering.
:::





```yaml
wrangles:
  - rename:
      input:
        - Manufacturer Name
        - Manufacturer Part Number
      output:
        - Manufacturer
        - MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>





```yaml
wrangles:
  - rename:
      Manufacturer Name: Manufacturer
      Manufacturer Part Number: MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>





```yaml
wrangles:
  - rename:
      wrangles:
        - convert.case:
            input: columns
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| MANUFACTURER NAME | MANUFACTURER PART NUMBER |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

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
| Catalog ID | `89` |
| Catalog key | `rename` |
| Recipe key | `rename` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Structural rename steps are not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `transform` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.rename` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `ab06898f-faf7-42e7-8275-5e3034a4d727` |

**Sources**

- [WranglesPY rename implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived rename Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/rename.md)

</details>
