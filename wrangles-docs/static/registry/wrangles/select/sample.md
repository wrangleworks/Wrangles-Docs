---
schema_version: '0.1'
type: wrangle
id: 95a84ab6-a66e-450f-8a4a-7a87e3a77932
wrangle_name: sample
namespace: select
title: Sample
description: Return a random sample of the rows.
wrangle_key: select.sample
aliases: []
slug: select/sample
status: active
visibility: public
tags:
  - select
  - sample
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.select.sample
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
  - name: rows
    description: >-
      If a whole number, will select that number of rows. If a decimal between 0 and 1 will select
      that fraction of the rows e.g. 0.1 => 10% of rows will be returned.
    required: true
    role: option
    schema:
      type:
        - integer
        - number
      exclusiveMinimum: 0
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/select.py
    title: WranglesPY select.sample implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/sample.md
    title: Existing select.sample Markdown
---

# Sample

Return a random sample of the rows

## Migrated examples
#### Selecting 2 Random Rows

##### Recipe

```yaml
wrangles:
  - select.sample:
      rows: 2
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
| Ball Bearing | SKF |
| Needle Bearing | Acme Bearings |

</div>

</div>

#### Selecting a Random 25% of All Rows

##### Recipe

```yaml
wrangles:
  - select.sample:
      rows: .25
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

</div>

</div>
