---
title: "Attributes"
description: "Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account."
sidebar_label: "Attributes"
slug: "/extract/attributes"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Attributes

Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account.

Extract numeric attributes from unstructured text such as lengths, voltages, weights, or temperatures. Requires WrangleWorks Account.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `responseContent` | Span - returns the text found. object - returns an object with the value and unit. | string; one of:<ul className="ww-param-enum-values"><li>span</li><li>object</li></ul> | `"span"` | No |
| `attribute_type` | Request only a specific type of attribute. | string, null; one of:<ul className="ww-param-enum-values"><li>angle</li><li>area</li><li>capacitance</li><li>charge</li><li>current</li><li>data transfer rate</li><li>electrical conductance</li><li>electrical resistance</li><li>energy</li><li>force</li><li>frequency</li><li>inductance</li><li>instance frequency</li><li>length</li><li>luminous flux</li><li>weight</li><li>power</li><li>pressure</li><li>speed</li><li>velocity</li><li>temperature</li><li>time</li><li>voltage</li><li>volume</li><li>volumetric flow</li></ul> | `null` | No |
| `desired_unit` | Convert the extracted unit to the desired unit. | string, null | `null` | No |
| `bound` | When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min, mid or max. Default mid. | string; one of:<ul className="ww-param-enum-values"><li>min</li><li>mid</li><li>max</li></ul> | `"mid"` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
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
  - extract.attributes:
      input: tools
      output: attributes
      responseContent: span
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Tools (input) |
| --- |
| hammer 5kg, 0.5m |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Attributes (span )(output) |
| --- |
| \{'length': ['0.5m'], 'mass': ['5kg']\} |

</div>

</div>





```yaml
wrangles:
  - extract.attributes:
      input: tools
      output: attributes
      responseContent: object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Tools (input) |
| --- |
| hammer 5kg, 0.5m |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Attributes (Object) (output) |
| --- |
| \{'length': [\{'unit': 'metre', 'value': 0.5\}], 'mass': [\{'unit': 'kilogram', 'value': 5.0\}]\} |

</div>

</div>





```yaml
wrangles:
  - extract.attributes:
      input: Tools
      output: attributes
      responseContent: span
      attribute_type: mass      # Specific attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_No sample available._

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
| Recipe key | `extract.attributes` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.attributes` |

**Sources**

- [WranglesPY extract.attributes implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.attributes Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/attributes.md)

</details>
