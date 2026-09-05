---
schema_version: '0.1'
type: wrangle
id: 94e54eb7-2b8c-4047-89d0-fb5d16baf396
wrangle_name: to_json
namespace: convert
title: To JSON
description: Convert an object to a JSON representation.
wrangle_key: convert.to_json
aliases: []
slug: convert/to-json
status: active
visibility: public
tags:
  - convert
  - to-json
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.convert.to_json
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
  - name: ensure_ascii
    description: If true, non-ASCII characters will be escaped. Default is false.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
  - name: indent
    description: >-
      If indent is a non-negative integer or string, then JSON array elements and object members
      will be pretty-printed with that indent level. An indent level of 0, negative, or "" will only
      insert newlines. None (the default) selects the most compact representation. Using a positive
      integer indent indents that many spaces per level. If indent is a string (such as '\t'), that
      string is used to indent each level.
    required: false
    role: option
    schema:
      type:
        - string
        - integer
  - name: sort_keys
    description: >-
      If sort_keys is true (defaults to False), then the output of dictionaries will be sorted by
      key.
    required: false
    role: option
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py
    title: WranglesPY convert.to_json implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/convert/_sources/to-json.md
    title: Existing convert.to_json Markdown
---

# To JSON

Convert an object to a JSON representation.

## Migrated examples
#### Convert Text to JSON

##### Recipe

```yaml
wrangles:
  - convert.to_json:
      input: column
      output: new column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| `['a', 'python', 'list']` |
| `{'python': 'dict'}` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| new column |
| --- |
| `["a","python","list"]` |
| `{"python":"dict"}` |

</div>

</div>
