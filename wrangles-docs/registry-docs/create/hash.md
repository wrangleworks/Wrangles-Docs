---
title: "Hash"
description: "Create a hash of a column."
sidebar_label: "Hash"
slug: "/create/hash"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Hash <CopyableCode value="create.hash" />

Create a hash of a column.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create a hash of a column",
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
      "description": "Name of input column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of new column"
    },
    "method": {
      "type": "string",
      "description": "The method to use to hash the input (Default: md5)",
      "enum": [
        "md5",
        "sha1",
        "sha256",
        "sha512"
      ]
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
  - create.hash:
      input: Description
      output: hash
      method: md5
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Description |
| --- |
| The wrench is blue |
| The hammer is yellow |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| hash |
| --- |
| 512612f9ed5f71c9c13bd63eb140783a |
| 65820c4addbaaef6a067cdcf5c856706 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of input column | string, integer, array | — | Yes |
| `output` | Name of new column | string, array | — | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The method to use to hash the input (Default: md5) | string; one of:<ul className="ww-param-enum-values"><li>md5</li><li>sha1</li><li>sha256</li><li>sha512</li></ul> | `"md5"` | No |
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
| Catalog ID | `16` |
| Catalog key | `create.hash` |
| Recipe key | `create.hash` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.hash` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `11e8fc13-00d2-4779-8d87-6288b07de7e7` |

**Sources**

- [WranglesPY create.hash implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.hash Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/hash.md)

</details>
