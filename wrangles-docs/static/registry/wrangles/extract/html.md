---
schema_version: '0.1'
type: wrangle
id: 728fc87a-a20d-4efa-833a-612e0b5eadc3
wrangle_name: html
namespace: extract
title: HTML
description: Extract elements from strings containing html. Requires WrangleWorks Account.
wrangle_key: extract.html
aliases: []
slug: extract/html
status: active
visibility: public
tags:
  - extract
  - html
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.extract.html
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
    param_group: I/O
    schema:
      type:
        - string
        - integer
        - array
  - name: data_type
    description: The type of data to extract.
    required: true
    param_group: Options
    schema:
      type: string
      enum:
        - text
        - links
  - name: output
    description: Name or list of output columns.
    required: false
    param_group: I/O
    runtime_default: null
    schema:
      type:
        - string
        - array
        - 'null'
  - name: output_format
    description: Format of the extract output.
    required: false
    param_group: Formatting
    runtime_default: null
    schema:
      type:
        - string
        - 'null'
      enum:
        - list
        - columns
        - concatenate
  - name: char
    description: Character to use when output_format is concatenate.
    required: false
    param_group: Formatting
    runtime_default: ', '
    schema:
      type: string
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py
    title: WranglesPY extract.html implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/html.md
    title: Existing extract.html Markdown
---

# HTML

Extract text and links from HTML elements. Requires WrangleWorks Account.

## Migrated examples
#### Extracting Text From HTML

##### Recipe

```yaml
wrangles:
  - extract.html:
      input: HTML
      output: Text
      data_type: text
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| HTML | Text |
| --- | --- |
| ` |  |

</div>

</div>

#### Extracting Links From HTML

##### Recipe

```yaml
wrangles:
  - extract.html:
      input: HTML
      output: Links
      data_type: links
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| HTML | Links |
| --- | --- |
| ` |  |

</div>

</div>
