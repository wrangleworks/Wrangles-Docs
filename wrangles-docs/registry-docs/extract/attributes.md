---
title: "Attributes"
description: "Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account."
sidebar_label: "Attributes"
slug: "/extract/attributes"
---

# Attributes

Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | Yes | string, array | Name of the output column. | — |
| `responseContent` | No | string; one of: span, object | Span - returns the text found. object - returns an object with the value and unit. | `"span"` |
| `attribute_type` | No | string, null; one of: angle, area, capacitance, charge, current, data transfer rate, electrical conductance, electrical resistance, energy, force, frequency, inductance, instance frequency, length, luminous flux, weight, power, pressure, speed, velocity, temperature, time, voltage, volume, volumetric flow | Request only a specific type of attribute. | `null` |
| `desired_unit` | No | string, null | Convert the extracted unit to the desired unit. | `null` |
| `bound` | No | string; one of: min, mid, max | When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min, mid or max. Default mid. | `"mid"` |
| `first_element` | No | boolean | Get the first element from results. | `false` |
| `output_format` | No | string, null; one of: list, dictionary, columns, concatenate | Format of the extract output. | `null` |
| `char` | No | string | Character to use when output_format is concatenate. | `", "` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | Yes |
| requires subscription | No |
| requires external api key | No |

## Guidance

Extract numeric attributes from unstructured text such as lengths, voltages, weights, or temperatures. Requires WrangleWorks Account.

## Migrated examples
#### Extracting All Attributes

##### Recipe

```yaml
wrangles:
  - extract.attributes:
      input: tools
      output: attributes
      responseContent: span
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Tools (input) | Attributes (span )(output) |
| --- | --- |
| hammer 5kg, 0.5m | \{'length': ['0.5m'], 'mass': ['5kg']\} |

</div>

</div>

#### Extracting All Attributes

##### Recipe

```yaml
wrangles:
  - extract.attributes:
      input: tools
      output: attributes
      responseContent: object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Tools (input) | Attributes (Object) (output) |
| --- | --- |
| hammer 5kg, 0.5m | \{'length': [\{'unit': 'metre', 'value': 0.5\}], 'mass': [\{'unit': 'kilogram', 'value': 5.0\}]\} |

</div>

</div>

#### Extracting Specific Attributes

##### Recipe

```yaml
wrangles:
  - extract.attributes:
      input: Tools
      output: attributes
      responseContent: span
      attribute_type: mass      # Specific attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

_No sample available._

</div>

</div>

## Provenance

- [WranglesPY extract.attributes implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.attributes Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/attributes.md)

## Registry metadata

- Registry ID: `03ccedef-c938-41f1-8980-280f1a91542e`
- Namespace: `extract`
- Recipe key: `extract.attributes`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.attributes`
- Status: `active`
- Registry version: `0.1.0-pilot`
