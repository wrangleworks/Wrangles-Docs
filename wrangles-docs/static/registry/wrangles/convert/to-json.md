---
schema_version: '0.2'
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
recipe_writer:
  eligible: true
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
  - name: ensure_ascii
    description: If true, non-ASCII characters will be escaped. Default is false
    required: false
    param_group: Formatting
    runtime_default: false
    schema:
      type: boolean
      description: If true, non-ASCII characters will be escaped. Default is false
    runtime_required: false
  - name: indent
    description: >-
      If indent is a non-negative integer or string, then JSON array elements and object members
      will be pretty-printed  with that indent level. An indent level of 0, negative, or "" will
      only insert newlines. None (the default) selects the most  compact representation. Using a
      positive integer indent indents that many spaces per level. If indent is a string (such as
      '\t'),  that string is used to indent each level.
    required: false
    param_group: Formatting
    schema:
      type:
        - string
        - integer
      description: >-
        If indent is a non-negative integer or string, then JSON array elements and object members
        will be pretty-printed  with that indent level. An indent level of 0, negative, or "" will
        only insert newlines. None (the default) selects the most  compact representation. Using a
        positive integer indent indents that many spaces per level. If indent is a string (such as
        '\t'),  that string is used to indent each level.
    runtime_required: false
  - name: sort_keys
    description: >-
      If sort_keys is true (defaults to False), then the output of dictionaries will be sorted by
      key.
    required: false
    param_group: Formatting
    schema:
      type: boolean
      description: >-
        If sort_keys is true (defaults to False), then the output of dictionaries will be sorted by
        key.
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/convert.py
    title: WranglesPY convert.to_json implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/convert/_sources/to-json.md
    title: Archived convert.to_json Markdown
configuration_schema:
  type: object
  description: Convert an object to a JSON representation.
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
      type:
        - string
        - integer
      description: >-
        If indent is a non-negative integer or string, then JSON array elements and object members
        will be pretty-printed  with that indent level. An indent level of 0, negative, or "" will
        only insert newlines. None (the default) selects the most  compact representation. Using a
        positive integer indent indents that many spaces per level. If indent is a string (such as
        '\t'),  that string is used to indent each level.
    sort_keys:
      type: boolean
      description: >-
        If sort_keys is true (defaults to False), then the output of dictionaries will be sorted by
        key.
    ensure_ascii:
      type: boolean
      description: If true, non-ASCII characters will be escaped. Default is false
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
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
