---
schema_version: '0.2'
type: 'wrangle'
id: '8befddf8-602e-4fa9-8f16-4c547210ebec'
wrangle_name: 'substring'
namespace: 'select'
title: 'Substring'
description: 'Return characters from the middle of text.'
wrangle_key: 'select.substring'
aliases: []
slug: 'select/substring'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'select'
  - 'substring'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.select.substring'
  contract_status: 'verified'
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
  - name: 'input'
    description: 'Name of the column(s) to edit'
    required: true
    param_group: 'I/O'
    schema:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name of the column(s) to edit'
    runtime_required: true
  - name: 'start'
    description: "The position of the first character to select.\nIf ommited will start from the beginning and length must \nbe provided.\n"
    required: true
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'integer'
      description: "The position of the first character to select.\nIf ommited will start from the beginning and length must \nbe provided.\n"
      minimum: 1
    runtime_required: false
  - name: 'length'
    description: "The length of the string to select. If ommited\nwill select to the end of the string and start must be provided.\n"
    required: true
    param_group: 'Options'
    runtime_default: null
    schema:
      type: 'integer'
      description: "The length of the string to select. If ommited\nwill select to the end of the string and start must be provided.\n"
      minimum: 1
    runtime_required: false
  - name: 'output'
    description: 'Name of the output column(s)'
    required: false
    param_group: 'I/O'
    runtime_default: null
    schema:
      type:
        - 'string'
        - 'array'
      description: 'Name of the output column(s)'
    runtime_required: false
examples: []
sources:
  - id: 'runtime'
    resource: 'https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py'
    title: 'WranglesPY select.substring implementation'
  - id: 'legacy-docs-archive'
    resource: 'https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/substring.md'
    title: 'Archived select.substring Markdown'
configuration_schema:
  type: 'object'
  description: 'Return characters from the middle of text.'
  additionalProperties: false
  required:
    - 'input'
    - 'start'
    - 'length'
  properties:
    input:
      type:
        - 'string'
        - 'integer'
        - 'array'
      description: 'Name of the column(s) to edit'
    output:
      type:
        - 'string'
        - 'array'
      description: 'Name of the output column(s)'
    start:
      type: 'integer'
      description: "The position of the first character to select.\nIf ommited will start from the beginning and length must \nbe provided.\n"
      minimum: 1
    length:
      type: 'integer'
      description: "The length of the string to select. If ommited\nwill select to the end of the string and start must be provided.\n"
      minimum: 1
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: 'upstream-docstring'
schema_adjustments: []
---

# Substring

Return characters from the middle of text.

## Migrated examples
#### Selecting a Substring With Start and Length

##### Recipe

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Result |
| --- |
| udd |

</div>

</div>

#### Selecting the Remainder of This Sample

Python allows `length` to be omitted, but the upstream schema requires it.
For this sample, explicitly request the remaining six characters.

##### Recipe

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
      length: 6
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Result |
| --- |
| udding |

</div>

</div>

#### Selecting a Substring From the Beginning

Supply `start: 1` explicitly to satisfy the upstream schema.

##### Recipe

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 1
      length: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| pudding |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Result |
| --- |
| pud |

</div>

</div>
