---
title: "Properties"
description: "Extract text properties from the input. Requires WrangleWorks Account."
sidebar_label: "Properties"
slug: "/extract/properties"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Properties <CopyableCode value="extract.properties" />

Extract categorical properties from unstructured text, such as colours or materials. Requires WrangleWorks Account.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Extract text properties from the input. Requires WrangleWorks Account.",
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output columns"
    },
    "property_type": {
      "type": "string",
      "description": "The specific type of properties to extract",
      "enum": [
        "Colours",
        "Materials",
        "Shapes",
        "Standards"
      ]
    },
    "return_data_type": {
      "type": "string",
      "description": "Legacy format option. Prefer output_format.",
      "enum": [
        "list",
        "string"
      ]
    },
    "first_element": {
      "type": "boolean",
      "description": "Get the first element from results"
    },
    "output_format": {
      "type": "string",
      "description": "Format of the extract output",
      "enum": [
        "list",
        "dictionary",
        "columns",
        "concatenate"
      ]
    },
    "char": {
      "type": "string",
      "description": "Character to use when output_format is concatenate"
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
  - extract.properties:
      input: water bottles
      output: properties
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products | Product Properties |
| --- | --- |
| Stainless Steel Blue Bottle | \{'Colours': ['Blue'], 'Materials': ['Stainless Steel']\} |
| Plastic Yellow Bottle | \{'Colours': ['Yellow'], 'Materials': ['Plastic']\} |

</div>

</div>





```yaml
wrangles:
  - extract.properties:
      input: water bottles
      output: properties
      property_type: Colours # Optional
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products | Product Colours |
| --- | --- |
| Stainless Steel Blue Bottle | ['Blue'] |
| Plastic Yellow Bottle | ['Yellow'] |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column | string, integer, array | — | Yes |
| `output` | Name of the output columns | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `property_type` | The specific type of properties to extract | string; one of:<ul className="ww-param-enum-values"><li>Colours</li><li>Materials</li><li>Shapes</li><li>Standards</li></ul> | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `return_data_type` | Legacy format option. Prefer output_format. | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>string</li></ul> | `"list"` | No |
| `first_element` | Get the first element from results | boolean | `false` | No |
| `output_format` | Format of the extract output | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>dictionary</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate | string | `", "` | No |
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
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `29` |
| Catalog key | `extract.properties` |
| Recipe key | `extract.properties` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.properties` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `23bbdb86-fd13-4b78-8fff-a7a76769ab63` |

**Sources**

- [WranglesPY extract.properties implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Archived extract.properties Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/properties.md)

</details>
