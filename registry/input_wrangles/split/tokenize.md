---
schema_version: '0.2'
type: wrangle
id: 6cc88418-ae0c-43f6-84ee-31e0d5f838c3
wrangle_name: tokenize
namespace: split
title: Tokenize
description: >-
  Split text into tokens. A variety of methods are available. The default method is to split on
  spaces.
wrangle_key: split.tokenize
aliases: []
slug: split/tokenize
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - split
  - tokenize
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.split.tokenize
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
    description: Column(s) to be split into tokens
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
      description: Column(s) to be split into tokens
    runtime_required: true
  - name: output
    description: Name of the output column
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
      description: Name of the output column
    runtime_required: false
  - name: method
    description: >-
      Method to split the list. Options include `space`, `boundary`, `boundary_ignore_space`, custom
      functions as `custom.<function>`, or regex patterns as `regex:<pattern>`.
    required: false
    param_group: Options
    runtime_default: space
    schema:
      anyOf:
        - type: string
          enum:
            - space
            - boundary
            - boundary_ignore_space
          description: >-
            Method to split the list. Options: space, boundary, boundary_ignore_space or use a
            custom function with custom.<function> or use a regex pattern with regex:<pattern>
        - type: string
          description: >-
            Method to split the list. Options: space, boundary, boundary_ignore_space or use a
            custom function with custom.<function> or use a regex pattern with regex:<pattern>
    runtime_required: false
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py
    title: WranglesPY split.tokenize implementation
  - id: legacy-docs-archive
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/tokenize.md
    title: Archived split.tokenize Markdown
configuration_schema:
  type: object
  description: >-
    Split text into tokens. A variety of methods are available. The default method is to split on
    spaces.
  additionalProperties: false
  required:
    - input
  properties:
    input:
      type:
        - string
        - integer
        - array
      description: Column(s) to be split into tokens
    output:
      type:
        - string
        - array
      description: Name of the output column
    method:
      anyOf:
        - type: string
          enum:
            - space
            - boundary
            - boundary_ignore_space
          description: >-
            Method to split the list. Options: space, boundary, boundary_ignore_space or use a
            custom function with custom.<function> or use a regex pattern with regex:<pattern>
        - type: string
          description: >-
            Method to split the list. Options: space, boundary, boundary_ignore_space or use a
            custom function with custom.<function> or use a regex pattern with regex:<pattern>
    if:
      $ref: '#/$defs/wrangles/commonProperties/if'
    where:
      $ref: '#/$defs/wrangles/commonProperties/where'
    where_params:
      $ref: '#/$defs/wrangles/commonProperties/where_params'
schema_origin: upstream-docstring
schema_adjustments: []
---

# Tokenize

Tokenize elements in a list or string into individual tokens.

## Migrated examples
#### Tokenizing a String

##### Recipe

```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Materials |
| --- |
| Stainless Steel Oak Wood |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

</div>

</div>


#### Tokenizing a List

##### Recipe

```yaml
wrangles:
  - split.tokenize:
      input: Materials
      output: Tokenized List
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Materials |
| --- |
| ['Stainless Steel', 'Oak Wood'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Tokenized List |
| --- |
| ['Stainless', 'Steel', 'Oak', 'Wood'] |

</div>

</div>
