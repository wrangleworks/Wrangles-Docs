---
schema_version: '0.2'
type: wrangle
id: 4cd6252f-ce47-4a9d-8272-3d87e875b72a
wrangle_name: to_yaml
namespace: convert
title: To YAML
description: Convert an object to a YAML representation.
wrangle_key: convert.to_yaml
aliases: []
slug: convert/to-yaml
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - convert
  - to-yaml
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.convert.to_yaml
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
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
      description: Name of the input column.
    runtime_required: true
  - name: output
    description: Name of the output column. If omitted, the input column will be overwritten
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: Name of the output column. If omitted, the input column will be overwritten
    runtime_required: false
  - name: sort_keys
    description: 'If sort_keys is true (default: False), then the output of dictionaries will be sorted by key.'
    required: false
    param_group: Formatting
    runtime_default: false
    schema:
      type: boolean
      description: >-
        If sort_keys is true (default: False), then the output of dictionaries will be sorted by
        key.
    runtime_required: false
  - name: allow_unicode
    description: Allow Unicode value accepted by the runtime.
    required: false
    param_group: Formatting
    runtime_default: true
    schema: {}
    runtime_required: false
  - name: indent
    description: Specify the number of spaces for indentation to  specify nested elements
    required: false
    param_group: Formatting
    schema:
      type: integer
      description: Specify the number of spaces for indentation to  specify nested elements
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py
    title: WranglesPY convert.to_yaml implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/convert/_sources/to-yaml.md
    title: Archived convert.to_yaml Markdown
configuration_schema:
  type: object
  description: Convert an object to a YAML representation.
  required:
    - input
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Name of the input column.
    output:
      type:
        - string
        - array
      description: Name of the output column. If omitted, the input column will be overwritten
    indent:
      type: integer
      description: Specify the number of spaces for indentation to  specify nested elements
    sort_keys:
      type: boolean
      description: >-
        If sort_keys is true (default: False), then the output of dictionaries will be sorted by
        key.
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# To YAML

Convert an object to a YAML representation.

## Migrated examples
#### Convert a Dictionary to YAML

##### Recipe

```yaml
wrangles:
  - convert.to_yaml:
      input: column 1
      indent: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

```python
{
  'Product Specs': {
    'length': '6 inch',
    'voltage': '24V',
    'weight': '3lb'
  }
}
```

</div>

<div className="ww-sample-panel">

##### Output Sample

```yaml
Product Specs:
  length: 6 inch
  voltage: 24V
  weight: 3lb
```

</div>

</div>
