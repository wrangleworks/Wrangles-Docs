---
schema_version: '0.1'
type: wrangle
id: b1c20004-5f80-41c2-84d2-2d4601a033b5
wrangle_name: from_yaml
namespace: convert
title: From YAML
description: Convert a YAML representation into an object.
wrangle_key: convert.from_yaml
aliases: []
slug: convert/from-yaml
status: active
visibility: public
tags:
  - convert
  - from-yaml
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.convert.from_yaml
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
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of the output column. If omitted, the input column will be overwritten.
    required: false
    role: column-output
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: default
    description: >-
      Value to return if the row is empty or fails to be parsed as YAML. If input is a list, default
      may also be a list - either a single value to apply to all columns, or one value per input
      column.
    required: false
    role: fallback-value
    runtime_default: null
    schema:
      type:
        - string
        - array
        - object
        - number
        - boolean
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py
    title: WranglesPY convert.from_yaml implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/from-yaml.md
    title: Existing convert.from_yaml Markdown
---

# From YAML

Convert a YAML representation into an object.

## Migrated examples
#### Convert YAML To An Object

##### Recipe

```yaml
wrangles:
  - convert.from_yaml:
      input: column 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

```yaml
Product Specs:
  length: 6 inch
  voltage: 24V
  weight: 3lb
```

</div>

<div className="ww-sample-panel">

##### Output Sample

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

</div>
