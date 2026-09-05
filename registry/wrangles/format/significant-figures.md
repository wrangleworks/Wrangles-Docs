---
schema_version: '0.2'
type: wrangle
id: a359f72a-5250-4dd8-84f6-8a8173bee0f6
wrangle_name: significant_figures
namespace: format
title: Significant Figures
description: Format a value to a specific number of significant figures.
wrangle_key: format.significant_figures
aliases: []
slug: format/significant-figures
status: active
visibility: public
recipe_writer:
  eligible: true
tags:
  - format
  - significant-figures
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.format.significant_figures
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
  - name: significant_figures
    description: Number of significant figures to format to. Default is 3.
    required: false
    param_group: Formatting
    runtime_default: 3
    schema:
      type: integer
  - name: output
    description: Name of the output column.
    required: false
    param_group: I/O
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
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py
    title: WranglesPY format.significant_figures implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/significant-figures.md
    title: Existing format.significant_figures Markdown
---

# Significant Figures

Format a value to a specific number of significant figures

## Migrated examples
#### Rounding to Significant Figures

##### Recipe

```yaml
wrangles:
  - format.significant_figures:
      input: Data
      significant_figures: 2
      output: Data to 2 Figures
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Data |
| --- |
| 1.25 |
| 12.3 |
| 55.6 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Data to 2 Figures |
| --- | --- |
| 1.25 | 1.2 |
| 12.3 | 12 |
| 55.6 | 55 |

</div>

</div>
