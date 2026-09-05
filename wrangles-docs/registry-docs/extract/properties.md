---
title: "Properties"
description: "Extract text properties from the input. Requires WrangleWorks Account."
sidebar_label: "Properties"
slug: "/extract/properties"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Properties

Extract text properties from the input. Requires WrangleWorks Account.

Extract categorical properties from unstructured text, such as colours or materials. Requires WrangleWorks Account.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output columns. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `property_type` | The specific type of properties to extract. | string, null; one of:<ul className="ww-param-enum-values"><li>Colours</li><li>Materials</li><li>Shapes</li><li>Standards</li></ul> | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `return_data_type` | Legacy format option. Prefer output_format. | string; one of:<ul className="ww-param-enum-values"><li>list</li><li>string</li></ul> | `"list"` | No |
| `first_element` | Get the first element from results. | boolean | `false` | No |
| `output_format` | Format of the extract output. | string, null; one of:<ul className="ww-param-enum-values"><li>list</li><li>dictionary</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate. | string | `", "` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

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
      property_type: colours # Optional
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
| Recipe key | `extract.properties` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.properties` |

**Sources**

- [WranglesPY extract.properties implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.properties Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/properties.md)

</details>
