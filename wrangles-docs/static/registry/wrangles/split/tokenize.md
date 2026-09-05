---
schema_version: '0.1'
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
    description: Column(s) to be split into tokens.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: output
    description: Name of the output column.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
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
        - type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py
    title: WranglesPY split.tokenize implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/tokenize.md
    title: Existing split.tokenize Markdown
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
