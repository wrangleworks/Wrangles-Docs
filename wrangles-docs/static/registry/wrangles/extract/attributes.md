---
schema_version: '0.1'
type: wrangle
id: 03ccedef-c938-41f1-8980-280f1a91542e
wrangle_name: attributes
namespace: extract
title: Attributes
description: >-
  Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks
  Account.
wrangle_key: extract.attributes
aliases: []
slug: extract/attributes
status: active
visibility: public
tags:
  - extract
  - attributes
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.attributes
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
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of the output column.
    required: true
    role: column-output
    schema:
      type:
        - string
        - array
  - name: responseContent
    description: Span - returns the text found. object - returns an object with the value and unit.
    required: false
    role: option
    runtime_default: span
    schema:
      type: string
      enum:
        - span
        - object
  - name: attribute_type
    description: Request only a specific type of attribute.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - angle
        - area
        - capacitance
        - charge
        - current
        - data transfer rate
        - electrical conductance
        - electrical resistance
        - energy
        - force
        - frequency
        - inductance
        - instance frequency
        - length
        - luminous flux
        - weight
        - power
        - pressure
        - speed
        - velocity
        - temperature
        - time
        - voltage
        - volume
        - volumetric flow
  - name: desired_unit
    description: Convert the extracted unit to the desired unit.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
  - name: bound
    description: >-
      When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min,
      mid or max. Default mid.
    required: false
    role: option
    runtime_default: mid
    schema:
      type: string
      enum:
        - min
        - mid
        - max
  - name: first_element
    description: Get the first element from results.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
  - name: output_format
    description: Format of the extract output.
    required: false
    role: column-output
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
    role: option
    runtime_default: ', '
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.attributes implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/attributes.md
    title: Existing extract.attributes Markdown
---

# Attributes

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
