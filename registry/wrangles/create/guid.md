---
schema_version: '0.2'
type: wrangle
id: cf3aaab2-3d5b-4c9b-826e-7af7510521c9
wrangle_name: guid
namespace: create
title: GUID
description: Create column(s) with a GUID.
wrangle_key: create.guid
aliases: []
slug: create/guid
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - create
  - guid
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.create.guid
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
  - name: output
    description: Name or list of names of new columns.
    required: true
    param_group: I/O
    schema:
      type:
        - string
        - array
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py
    title: WranglesPY create.guid implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/guid.md
    title: Existing create.guid Markdown
---

# GUID

Create a column with a GUID (Globally Unique Identifier).

## Migrated examples
#### Creating a New GUID Column

##### Recipe

```yaml
wrangles:
  - create.guid:
      output: GUID Column

  # OR

  - create.uuid:
      output: GUID Column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| GUID Column |
| --- |
| 9a13b4dd-1993-4bd2-8974-3f9a0f006d86 |
| 1528d918-ecd7-457c-b44d-3d30705696d3 |

</div>

</div>
