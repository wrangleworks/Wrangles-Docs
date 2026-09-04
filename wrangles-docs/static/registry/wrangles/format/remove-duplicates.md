---
schema_version: '0.1'
type: wrangle
id: 283b9e78-b2b2-43d0-844f-9842c33120aa
wrangle_name: remove_duplicates
namespace: format
title: Remove Duplicates
description: Remove duplicates from a list. Preserves input order.
wrangle_key: format.remove_duplicates
aliases: []
slug: format/remove-duplicates
status: active
visibility: public
tags:
  - format
  - remove-duplicates
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.format.remove_duplicates
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
    description: Name of the output column.
    required: false
    role: column-output
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: ignore_case
    description: Ignore case when removing duplicates.
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
    title: WranglesPY format.remove_duplicates implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/remove-duplicates.md
    title: Existing format.remove_duplicates Markdown
---

# Remove Duplicates

Remove duplicate values in a list.

## Migrated examples
#### Removing Duplicates From a List

##### Recipe

```yaml
wrangles:
    - format.remove_duplicates:
        input: Attack of the Clones
        output: Commander
        where: Rank = Commander
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Rank | Attack of the Clones |
| --- | --- |
| Commander | ['Cody', 'Cody', 'Cody'] |
| Captain | ['Rex', 'Rex', 'Rex'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Rank | Commander | Attack of the Clones |
| --- | --- | --- |
| Commander | ['Cody'] | ['Cody', 'Cody', 'Cody'] |
| Captain |  | ['Rex', 'Rex', 'Rex'] |

</div>

</div>
