---
schema_version: '0.1'
type: wrangle
id: c376f3ff-2283-4c4c-8d7f-70db6f53ed19
wrangle_name: uuid
namespace: create
title: UUID
description: Create column(s) with a UUID.
wrangle_key: create.uuid
aliases: []
slug: create/uuid
status: active
visibility: public
tags:
  - create
  - uuid
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.create.uuid
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
    title: WranglesPY create.uuid implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/uuid.md
    title: Existing create.uuid Markdown
---

# UUID

Create a column with a UUID (Universally Unique Identifier).

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
