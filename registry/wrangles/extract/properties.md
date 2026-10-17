---
schema_version: '0.2'
type: 'wrangle'
id: '23bbdb86-fd13-4b78-8fff-a7a76769ab63'
wrangle_name: 'properties'
namespace: 'extract'
title: 'Properties'
description: 'Extract text properties from the input. Requires WrangleWorks Account.'
wrangle_key: 'extract.properties'
aliases: []
slug: 'extract/properties'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'extract'
  - 'properties'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.extract.properties'
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
    description: 'Name of the input column'
    required: true
    param_group: 'I/O'
    schema:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name of the input column'
    runtime_required: true
  - name: 'output'
    description: 'Name of the output columns'
    required: true
    param_group: 'I/O'
    schema:
      type:
        - 'string'
        - 'array'
      description: 'Name of the output columns'
    runtime_required: true
  - name: 'property_type'
    description: 'The specific type of properties to extract'
    required: false
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'string'
      description: 'The specific type of properties to extract'
      enum:
        - 'Colours'
        - 'Materials'
        - 'Shapes'
        - 'Standards'
    runtime_required: false
  - name: 'return_data_type'
    description: 'Legacy format option. Prefer output_format.'
    required: false
    param_group: 'Formatting'
    runtime_default: 'list'
    schema:
      type: 'string'
      description: 'Legacy format option. Prefer output_format.'
      enum:
        - 'list'
        - 'string'
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
    title: 'WranglesPY extract.properties implementation'
  - id: 'legacy-docs-archive'
    resource: 'https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/properties.md'
    title: 'Archived extract.properties Markdown'
configuration_schema:
  type: 'object'
  description: 'Extract text properties from the input. Requires WrangleWorks Account.'
  required:
    - 'input'
    - 'output'
  properties:
    input:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name of the input column'
    output:
      type:
        - 'string'
        - 'array'
      description: 'Name of the output columns'
    property_type:
      type: 'string'
      description: 'The specific type of properties to extract'
      enum:
        - 'Colours'
        - 'Materials'
        - 'Shapes'
        - 'Standards'
    return_data_type:
      type: 'string'
      description: 'Legacy format option. Prefer output_format.'
      enum:
        - 'list'
        - 'string'
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
schema_origin: 'upstream-docstring'
schema_adjustments: []
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
      property_type: Colours # Optional
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
