---
schema_version: '0.2'
type: 'wrangle'
id: '03ccedef-c938-41f1-8980-280f1a91542e'
wrangle_name: 'attributes'
namespace: 'extract'
title: 'Attributes'
description: 'Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account.'
wrangle_key: 'extract.attributes'
aliases: []
slug: 'extract/attributes'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'extract'
  - 'attributes'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.extract.attributes'
  contract_status: 'verified'
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
  - name: 'input'
    description: 'Name of the input column.'
    required: true
    param_group: 'I/O'
    schema:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name of the input column.'
    runtime_required: true
  - name: 'output'
    description: 'Name of the output column.'
    required: true
    param_group: 'I/O'
    schema:
      type:
        - 'string'
        - 'array'
      description: 'Name of the output column.'
    runtime_required: true
  - name: 'responseContent'
    description: 'span - returns the text found. object - returns an object with the value and unit'
    required: false
    param_group: 'Options'
    runtime_default: 'span'
    schema:
      type: 'string'
      description: 'span - returns the text found. object - returns an object with the value and unit'
      enum:
        - 'span'
        - 'object'
    runtime_required: false
  - name: 'attribute_type'
    description: 'Request only a specific type of attribute'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'string'
      description: 'Request only a specific type of attribute'
      enum:
        - 'angle'
        - 'area'
        - 'capacitance'
        - 'charge'
        - 'current'
        - 'data transfer rate'
        - 'electrical conductance'
        - 'electrical resistance'
        - 'energy'
        - 'force'
        - 'frequency'
        - 'inductance'
        - 'instance frequency'
        - 'length'
        - 'luminous flux'
        - 'weight'
        - 'power'
        - 'pressure'
        - 'speed'
        - 'velocity'
        - 'temperature'
        - 'time'
        - 'voltage'
        - 'volume'
        - 'volumetric flow'
    runtime_required: false
  - name: 'desired_unit'
    description: 'Convert the extracted unit to the desired unit'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'string'
      description: 'Convert the extracted unit to the desired unit'
    runtime_required: false
  - name: 'bound'
    description: 'When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min, mid or max. Default mid.'
    required: false
    param_group: 'Options'
    runtime_default: 'mid'
    schema:
      type: 'string'
      description: 'When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min, mid or max. Default mid.'
      enum:
        - 'min'
        - 'mid'
        - 'max'
    runtime_required: false
  - name: 'first_element'
    description: 'Get the first element from results'
    required: false
    param_group: 'Formatting'
    runtime_default: false
    schema:
      type: 'boolean'
      description: 'Get the first element from results'
    runtime_required: false
  - name: 'output_format'
    description: 'Format of the extract output'
    required: false
    param_group: 'Formatting'
    runtime_default: null
    schema:
      type: 'string'
      description: 'Format of the extract output'
      enum:
        - 'list'
        - 'dictionary'
        - 'columns'
        - 'concatenate'
    runtime_required: false
  - name: 'char'
    description: 'Character to use when output_format is concatenate'
    required: false
    param_group: 'Formatting'
    runtime_default: ', '
    schema:
      type: 'string'
      description: 'Character to use when output_format is concatenate'
    runtime_required: false
examples: []
sources:
  - id: 'runtime'
    resource: 'https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py'
    title: 'WranglesPY extract.attributes implementation'
  - id: 'legacy-docs-archive'
    resource: 'https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/attributes.md'
    title: 'Archived extract.attributes Markdown'
configuration_schema:
  type: 'object'
  description: 'Extract numeric attributes from the input such as weights or lengths. Requires WrangleWorks Account.'
  required:
    - 'input'
    - 'output'
  properties:
    input:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name of the input column.'
    output:
      type:
        - 'string'
        - 'array'
      description: 'Name of the output column.'
    attribute_type:
      type: 'string'
      description: 'Request only a specific type of attribute'
      enum:
        - 'angle'
        - 'area'
        - 'capacitance'
        - 'charge'
        - 'current'
        - 'data transfer rate'
        - 'electrical conductance'
        - 'electrical resistance'
        - 'energy'
        - 'force'
        - 'frequency'
        - 'inductance'
        - 'instance frequency'
        - 'length'
        - 'luminous flux'
        - 'weight'
        - 'power'
        - 'pressure'
        - 'speed'
        - 'velocity'
        - 'temperature'
        - 'time'
        - 'voltage'
        - 'volume'
        - 'volumetric flow'
    responseContent:
      type: 'string'
      description: 'span - returns the text found. object - returns an object with the value and unit'
      enum:
        - 'span'
        - 'object'
    bound:
      type: 'string'
      description: 'When returning an object, if the input is a range (e.g. 10-20mm) set the value to return. min, mid or max. Default mid.'
      enum:
        - 'min'
        - 'mid'
        - 'max'
    desired_unit:
      type: 'string'
      description: 'Convert the extracted unit to the desired unit'
    first_element:
      type: 'boolean'
      description: 'Get the first element from results'
    output_format:
      type: 'string'
      description: 'Format of the extract output'
      enum:
        - 'list'
        - 'dictionary'
        - 'columns'
        - 'concatenate'
    char:
      type: 'string'
      description: 'Character to use when output_format is concatenate'
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
  $ref: '#/$defs/misc/unit_entity_map'
schema_origin: 'upstream-docstring'
schema_adjustments: []
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

| tools | attributes |
| --- | --- |
| hammer 5kg, 0.5m | \{'length': ['0.5m'], 'weight': ['5kg']\} |

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

| tools | attributes |
| --- | --- |
| hammer 5kg, 0.5m | \{'length': [\{'span': '0.5m', 'standard': '0.5 m', 'symbol': 'm', 'unit': 'metre', 'value': 0.5\}], 'weight': [\{'span': '5kg', 'standard': '5 kg', 'symbol': 'kg', 'unit': 'kilogram', 'value': 5.0\}]\} |

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
      attribute_type: weight    # Specific attributes
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
