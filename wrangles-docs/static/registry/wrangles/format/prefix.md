---
schema_version: '0.1'
type: wrangle
id: c12f99b9-2363-4da7-8405-7c73b87906e5
wrangle_name: prefix
namespace: format
title: Prefix
description: Add a prefix to a column.
wrangle_key: format.prefix
aliases: []
slug: format/prefix
status: active
visibility: public
tags:
  - format
  - prefix
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.format.prefix
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
  - name: value
    description: Prefix value to add.
    required: true
    role: option
    schema:
      type:
        - string
        - integer
        - number
  - name: output
    description: (Optional) Name of the output column.
    required: false
    role: column-output
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: skip_empty
    description: Whether to skip empty values.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py
    title: WranglesPY format.prefix implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/prefix.md
    title: Existing format.prefix Markdown
---

# Prefix

Add a prefix to a column.

## Migrated examples
#### Adding a Prefix to a String

##### Recipe

```yaml
wrangles:
  - format.prefix:
      input: Data
      output: Prefix
      value: anti
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Data |
| --- |
| freeze |
| dote |
| hero |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Prefix |
| --- | --- |
| freeze | antifreeze |
| dote | antidote |
| hero | antihero |

</div>

</div>
