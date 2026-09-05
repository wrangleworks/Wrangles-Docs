---
schema_version: '0.1'
type: wrangle
id: 9b4c15fa-2aaa-40c8-8834-6e835760bee5
wrangle_name: brackets
namespace: extract
title: Brackets
description: Extract text properties in brackets from the input.
wrangle_key: extract.brackets
aliases: []
slug: extract/brackets
status: active
visibility: public
tags:
  - extract
  - brackets
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.brackets
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
  - name: output
    description: Name of the output columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
  - name: find
    description: >-
      (Optional) The type of brackets to find (round '()', square '[]', curly '{}', angled '<>').
      Default is all brackets.
    required: false
    param_group: Options
    runtime_default: all
    schema:
      type:
        - string
        - array
  - name: include_brackets
    description: (Optional) Include the brackets in the output.
    required: false
    param_group: Options
    runtime_default: false
    schema:
      type: boolean
  - name: output_format
    description: Format of the extract output.
    required: false
    param_group: Formatting
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
    param_group: Formatting
    runtime_default: ', '
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.brackets implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/brackets.md
    title: Existing extract.brackets Markdown
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
