---
schema_version: '0.1'
type: wrangle
id: 3260b9f7-aae2-499f-8004-d211c2cf643e
wrangle_name: list
namespace: split
title: List
description: Split a list in a single column to multiple columns.
wrangle_key: split.list
aliases: []
slug: split/list
status: active
visibility: public
tags:
  - split
  - list
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.split.list
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
    description: Name of the column to be split.
    required: true
    role: column-selector
    schema:
      type:
        - string
        - integer
  - name: output
    description: >-
      Name of column(s) for the results. If providing a single column, use a wildcard (*) to
      indicate a incrementing integer.
    required: true
    role: column-output
    schema:
      type:
        - string
        - array
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/split.py
    title: WranglesPY split.list implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/split/_sources/list.md
    title: Existing split.list Markdown
---

# List

Split a list into multiple columns. If only one output is given, `split.list` returns the same list it was given, so output should be a list of columns or a column name with a wildcard (`*`).

## Migrated examples
#### Using a Wildcard

##### Recipe

```yaml
wrangles:
  - split.list:
      input: Column
      output: Column*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column1 | Column2 | Column3 |
| --- | --- | --- |
| A | B | C |

</div>

</div>

#### Named Columns

##### Recipe

```yaml
wrangles:
  - split.list:
      input: Column
      output:
        - Heading A
        - Heading B
        - Heading C
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Heading A | Heading B | Heading C |
| --- | --- | --- |
| A | B | C |

</div>

</div>
