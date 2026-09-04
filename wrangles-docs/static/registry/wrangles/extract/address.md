---
schema_version: '0.1'
type: wrangle
id: 44153f95-4581-4cee-898e-b3b4714045fd
wrangle_name: address
namespace: extract
title: Address
description: Extract parts of addresses. Requires WrangleWorks Account.
wrangle_key: extract.address
aliases: []
slug: extract/address
status: active
visibility: public
tags:
  - extract
  - address
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.address
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
  - name: dataType
    description: Specific part of the address to extract.
    required: true
    role: option
    schema:
      type: string
      enum:
        - streets
        - cities
        - regions
        - countries
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
    title: WranglesPY extract.address implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/address.md
    title: Existing extract.address Markdown
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
