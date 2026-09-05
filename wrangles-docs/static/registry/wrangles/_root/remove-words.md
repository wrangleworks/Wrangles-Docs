---
schema_version: '0.1'
type: wrangle
id: 543b96c3-f354-48be-8046-bf0cb9fbaf56
wrangle_name: remove_words
namespace: null
title: Remove Words
description: Remove all the elements that occur in one list from another.
wrangle_key: remove_words
aliases: []
slug: remove-words
status: active
visibility: public
tags:
  - format
  - remove-words
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.remove_words
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
    description: Name of column to remove words from.
    required: true
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: to_remove
    description: Column or list of columns with a list of words to be removed.
    required: true
    role: option
    schema:
      type: string
  - name: output
    description: Name of the output columns.
    required: false
    role: column-output
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: tokenize_to_remove
    description: Tokenize all to_remove inputs.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
  - name: ignore_case
    description: Ignore input and to_remove case.
    required: false
    role: option
    runtime_default: true
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY remove_words implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/remove-words.md
    title: Existing remove_words Markdown
---

# Remove Words

Remove all the elements that occur in one list from another.

## Migrated examples
#### Removing Words From a Column

##### Recipe

```yaml
wrangles:
   - remove_words:
        input: Description
        to_remove: # To Remove columns must be list
          - Materials
          - Colours
        output: Product
        tokenize_to_remove: True
        ignore_case: False
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Colours | Materials | Description |
| --- | --- | --- |
| ['Blue'] | ['Steel'] | Steel Blue Bottle |
| ['Blue'] | ['Steel'] | ['Steel', 'Blue', 'Bottle'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product |
| --- |
| Bottle |
| Bottle |

</div>

</div>
