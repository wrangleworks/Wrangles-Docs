---
schema_version: '0.2'
type: wrangle
id: 23bbdb86-fd13-4b78-8fff-a7a76769ab63
wrangle_name: properties
namespace: extract
title: Properties
description: Extract text properties from the input. Requires WrangleWorks Account.
wrangle_key: extract.properties
aliases: []
slug: extract/properties
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - extract
  - properties
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.properties
  contract_status: verified
access:
  ai_powered: false
  requires_account: true
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: input
    description: Name of the input column.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of the output columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
  - name: property_type
    description: The specific type of properties to extract.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - Colours
        - Materials
        - Shapes
        - Standards
  - name: return_data_type
    description: Legacy format option. Prefer output_format.
    required: false
    param_group: Formatting
    runtime_default: list
    schema:
      type: string
      enum:
        - list
        - string
  - name: first_element
    description: Get the first element from results.
    required: false
    param_group: Formatting
    runtime_default: false
    schema:
      type: boolean
  - name: output_format
    description: Format of the extract output.
    required: false
    param_group: Formatting
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - list
        - dictionary
        - columns
        - concatenate
  - name: char
    description: Character to use when output_format is concatenate.
    required: false
    param_group: Formatting
    runtime_default: ', '
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.properties implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/properties.md
    title: Existing extract.properties Markdown
---

# Properties

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
