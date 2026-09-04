---
schema_version: '0.1'
type: wrangle
id: 53cd3fdd-24e2-4411-8655-6014b92a3f3a
wrangle_name: standardize
namespace: null
title: Standardize
description: >-
  Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and
  Subscription.
wrangle_key: standardize
aliases: []
slug: standardize
status: active
visibility: public
tags:
  - format
  - standardize
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.main.standardize
  contract_status: verified
access:
  ai_powered: false
  requires_account: true
  requires_subscription: false
  requires_external_api_key: false
capabilities:
  if: true
  where: true
  where_params: true
parameters:
  - name: input
    description: Name or list of input columns.
    required: true
    role: column-selector
    schema:
      type:
        - string
        - integer
        - array
  - name: model_id
    description: The ID of the wrangle to use (do not include 'find' and 'replace').
    required: true
    role: model-reference
    schema:
      type:
        - string
        - array
  - name: output
    description: Name or list of output columns.
    required: false
    role: column-output
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: case_sensitive
    description: Allows the wrangle to be case sensitive if set to True, default is False.
    required: false
    role: option
    runtime_default: false
    schema:
      type: boolean
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py
    title: WranglesPY standardize implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/standardize.md
    title: Existing standardize Markdown
---

# Standardize

Run a standardize wrangle, such as one that expands abbreviations. A standardization wrangle must be trained first.

## Migrated examples
#### Replacing Abbreviations

##### Recipe

```yaml
wrangles:
  - standardize:
      input: Abbrev
      output: Abbreviations
      model_id: code_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Abbrev |
| --- |
| ASAP |
| ETA |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Abbreviations |
| --- |
| As Soon As Possible |
| Estimated Time of Arrival |

</div>

</div>
