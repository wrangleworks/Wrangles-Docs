---
schema_version: '0.1'
type: wrangle
id: 363bffbf-397e-4975-8382-e9efa5e9eed6
wrangle_name: drop
namespace: null
title: Drop
description: Drop (Delete) selected column(s).
wrangle_key: drop
aliases: []
slug: drop
status: active
visibility: public
tags:
  - select
  - drop
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.pandas.drop
  contract_status: verified
access:
  ai_powered: false
  requires_account: false
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: false
  where_params: false
parameters:
  - name: columns
    description: Name of the column(s) to drop.
    required: true
    role: option
    schema:
      type:
        - string
        - array
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py
    title: WranglesPY drop implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/drop.md
    title: Existing drop Markdown
---

# Drop

Drop (Delete) selected column(s)

## Migrated examples
#### Dropping a Column

##### Recipe

```yaml
wrangles:
  - drop:
      columns:
        - Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data |
| --- |
| SKF ball bearing |
| bearing seal |

</div>

</div>
