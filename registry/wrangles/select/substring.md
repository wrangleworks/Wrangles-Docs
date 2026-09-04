---
schema_version: '0.1'
type: wrangle
id: 8befddf8-602e-4fa9-8f16-4c547210ebec
wrangle_name: substring
namespace: select
title: Substring
description: Return characters from the middle of text.
wrangle_key: select.substring
aliases: []
slug: select/substring
status: active
visibility: public
tags:
  - select
  - substring
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.substring
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
    description: Name of the column(s) to edit.
    required: true
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: start
    description: >-
      The position of the first character to select. If ommited will start from the beginning and
      length must be provided.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - integer
        - 'null'
      minimum: 1
  - name: length
    description: >-
      The length of the string to select. If ommited will select to the end of the string and start
      must be provided.
    required: false
    role: option
    runtime_default: null
    schema:
      type:
        - integer
        - 'null'
      minimum: 1
  - name: output
    description: Name of the output column(s).
    required: false
    role: column-output
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.substring implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/substring.md
    title: Existing select.substring Markdown
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

#### Selecting a Substring With Start Only

##### Recipe

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
      start: 2
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

#### Selecting a Substring With Length Only

##### Recipe

```yaml
wrangles:
  - select.substring:
      input: Column
      output: Result
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
