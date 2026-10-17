---
title: "Clean Whitespaces"
description: "Condense multiple spaces to a single space and convert special space characters to a standard space."
sidebar_label: "Clean Whitespaces"
slug: "/clean-whitespaces"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Clean Whitespaces <CopyableCode value="clean_whitespaces" />

Condense multiple spaces to a single space and convert special space characters to a standard space.



## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `trim` | Whether to trim leading and trailing spaces. Default True. | boolean | `true` | No |
| `remove_literals` | Whether to remove special space characters such as new lines etc. Default True. | boolean | `true` | No |
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
  "description": "Condense multiple spaces to a single space and convert special space characters to a standard space.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
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
    "trim": {
      "type": "boolean",
      "description": "Whether to trim leading and trailing spaces. Default True."
    },
    "remove_literals": {
      "type": "boolean",
      "description": "Whether to remove special space characters such as new lines etc. Default True."
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
  - clean_whitespaces:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products |
| --- |
| `Hello     world!` |
| `Hello     universe!` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products |
| --- |
| Hello world! |
| Hello universe! |

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
| Catalog ID | `72` |
| Catalog key | `clean_whitespaces` |
| Recipe key | `clean_whitespaces` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.clean_whitespaces` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `e36e15c4-f0ad-43f8-8555-ef683a8ab892` |

**Sources**

- [WranglesPY clean_whitespaces implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived clean_whitespaces Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/clean-whitespaces.md)

</details>
