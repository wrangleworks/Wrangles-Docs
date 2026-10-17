---
schema_version: '0.2'
type: 'wrangle'
id: '9b4c15fa-2aaa-40c8-8834-6e835760bee5'
wrangle_name: 'brackets'
namespace: 'extract'
title: 'Brackets'
description: 'Extract text properties in brackets from the input.'
wrangle_key: 'extract.brackets'
aliases: []
slug: 'extract/brackets'
status: 'active'
visibility: 'public'
recipe_writer:
  eligible: true
tags:
  - 'extract'
  - 'brackets'
runtime:
  package: 'wrangles'
  symbol: 'wrangles.recipe_wrangles.extract.brackets'
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
  - name: 'find'
    description: '(Optional) The type of brackets to find (round ''()'', square ''[]'', curly ''{}'', angled ''<>''). Default is all brackets.'
    required: false
    param_group: 'Options'
    runtime_default: 'all'
    schema:
      type:
        - 'string'
        - 'array'
      description: '(Optional) The type of brackets to find (round ''()'', square ''[]'', curly ''{}'', angled ''<>''). Default is all brackets.'
    runtime_required: false
  - name: 'include_brackets'
    description: '(Optional) Include the brackets in the output'
    required: false
    param_group: 'Options'
    runtime_default: false
    schema:
      type: 'boolean'
      description: '(Optional) Include the brackets in the output'
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
    title: 'WranglesPY extract.brackets implementation'
  - id: 'legacy-docs-archive'
    resource: 'https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/extract/_sources/brackets.md'
    title: 'Archived extract.brackets Markdown'
configuration_schema:
  type: 'object'
  description: 'Extract text properties in brackets from the input'
  additionalProperties: false
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
    find:
      type:
        - 'string'
        - 'array'
      description: '(Optional) The type of brackets to find (round ''()'', square ''[]'', curly ''{}'', angled ''<>''). Default is all brackets.'
    include_brackets:
      type: 'boolean'
      description: '(Optional) Include the brackets in the output'
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

# Brackets

Extract text in brackets from the input.

## Migrated examples
#### Extracting Data Within Brackets

##### Recipe

```yaml
wrangles:
  - extract.brackets:
      input: Data
      output: Output
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Output |
| --- | --- |
| `{Hello}` | Hello |
| `[Wrangles]` | Wrangles |
| `(!)` | ! |
| `<!>` | ! |

</div>

</div>
