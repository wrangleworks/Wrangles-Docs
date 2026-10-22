---
schema_version: '0.2'
type: 'wrangle'
id: '44153f95-4581-4cee-898e-b3b4714045fd'
wrangle_name: 'address'
namespace: 'extract'
title: 'Address'
description: 'Extract parts of addresses. Requires WrangleWorks Account.'
wrangle_key: 'extract.address'
aliases: []
slug: 'extract/address'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'extract'
  - 'address'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.extract.address'
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
  - name: 'dataType'
    description: 'Specific part of the address to extract'
    required: false
    param_group: 'Options'
    schema:
      type: 'string'
      description: 'Specific part of the address to extract'
      enum:
        - 'streets'
        - 'cities'
        - 'regions'
        - 'countries'
    runtime_required: true
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
    title: 'WranglesPY extract.address implementation'
  - id: 'legacy-docs-archive'
    resource: 'https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/address.md'
    title: 'Archived extract.address Markdown'
configuration_schema:
  type: 'object'
  description: 'Extract parts of addresses. Requires WrangleWorks Account.'
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
    dataType:
      type: 'string'
      description: 'Specific part of the address to extract'
      enum:
        - 'streets'
        - 'cities'
        - 'regions'
        - 'countries'
    output_format:
      type: 'string'
      description: 'Format of the extract output'
      enum:
        - 'list'
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

# Address

Extract geographical information from unstructured text such as streets, cities, or countries. Requires WrangleWorks Account.

## Migrated examples
#### Extracting Street Name

##### Recipe

```yaml
wrangles:
  - extract.address:
      input: Location
      output: Street
      dataType: streets
      where: SUBSTRING(Location, 1, 3) = '221'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Street | Location |
| --- | --- |
| ['221 B Baker St.'] | 221 B Baker St., London, England, United Kingdom |
|  | London SW1A 1AA, London, England, United Kingdom |

</div>

</div>
