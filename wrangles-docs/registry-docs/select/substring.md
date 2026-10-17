---
title: "Substring"
description: "Return characters from the middle of text."
sidebar_label: "Substring"
slug: "/select/substring"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Substring <CopyableCode value="select.substring" />

Return characters from the middle of text.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to edit | string, integer, array | — | Yes |
| `output` | Name of the output column(s) | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `start` | The position of the first character to select.<br />If ommited will start from the beginning and length must <br />be provided.<br /> | integer | `null` | Yes |
| `length` | The length of the string to select. If ommited<br />will select to the end of the string and start must be provided.<br /> | integer | `null` | Yes |
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
  "description": "Return characters from the middle of text.",
  "additionalProperties": false,
  "required": [
    "input",
    "start",
    "length"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the column(s) to edit"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column(s)"
    },
    "start": {
      "type": "integer",
      "description": "The position of the first character to select.\nIf ommited will start from the beginning and length must \nbe provided.\n",
      "minimum": 1
    },
    "length": {
      "type": "integer",
      "description": "The length of the string to select. If ommited\nwill select to the end of the string and start must be provided.\n",
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
  - select.substring:
      input: Column
      output: Result
      start: 2
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| udd |

</div>

</div>



Python allows `length` to be omitted, but the upstream schema requires it.
For this sample, explicitly request the remaining six characters.



```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
      length: 6
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| udding |

</div>

</div>



Supply `start: 1` explicitly to satisfy the upstream schema.



```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 1
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Result |
| --- |
| pud |

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
| Catalog ID | `60` |
| Catalog key | `select.substring` |
| Recipe key | `select.substring` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `select` |
| Documentation group | `select` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.select.substring` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `8befddf8-602e-4fa9-8f16-4c547210ebec` |

**Sources**

- [WranglesPY select.substring implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py)
- [Archived select.substring Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/substring.md)

</details>
