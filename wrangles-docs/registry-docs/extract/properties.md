---
title: "Properties"
description: "Extract text properties from the input. Requires WrangleWorks Account."
sidebar_label: "Properties"
slug: "/extract/properties"
---

# Properties

Extract text properties from the input. Requires WrangleWorks Account.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the input column. | — |
| `output` | Yes | string, array | Name of the output columns. | — |
| `property_type` | No | string, null; one of: Colours, Materials, Shapes, Standards | The specific type of properties to extract. | `null` |
| `return_data_type` | No | string; one of: list, string | Legacy format option. Prefer output_format. | `"list"` |
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

Extract categorical properties from unstructured text, such as colours or materials. Requires WrangleWorks Account.

## Migrated examples
#### Extracting All Properties

##### Recipe

```yaml
wrangles:
  - extract.properties:
      input: water bottles
      output: properties
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Product Properties |
| --- | --- |
| Stainless Steel Blue Bottle | \{'Colours': ['Blue'], 'Materials': ['Stainless Steel']\} |
| Plastic Yellow Bottle | \{'Colours': ['Yellow'], 'Materials': ['Plastic']\} |

</div>

</div>

#### Extracting Colour

##### Recipe

```yaml
wrangles:
  - extract.properties:
      input: water bottles
      output: properties
      property_type: colours # Optional
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Product Colours |
| --- | --- |
| Stainless Steel Blue Bottle | ['Blue'] |
| Plastic Yellow Bottle | ['Yellow'] |

</div>

</div>

## Provenance

- [WranglesPY extract.properties implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.properties Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/properties.md)

## Registry metadata

- Registry ID: `23bbdb86-fd13-4b78-8fff-a7a76769ab63`
- Namespace: `extract`
- Recipe key: `extract.properties`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.extract.properties`
- Status: `active`
- Registry version: `0.1.0-pilot`
