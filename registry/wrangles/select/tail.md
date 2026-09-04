---
schema_version: '0.1'
type: wrangle
id: 60853759-c160-49a4-87eb-036516a9d823
wrangle_name: tail
namespace: select
title: Tail
description: Return the last n rows.
wrangle_key: select.tail
aliases: []
slug: select/tail
status: active
visibility: public
tags:
  - select
  - tail
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.tail
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
  - name: n
    description: Number of rows to return.
    required: true
    role: option
    schema:
      type: integer
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.tail implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/tail.md
    title: Existing select.tail Markdown
---

# Tail

Return the last n rows

## Migrated examples
#### Selecting The Last n Rows

##### Recipe

```yaml
wrangles:
  - select.tail:
      n: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Manufacturer |
| --- | --- |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

</div>
