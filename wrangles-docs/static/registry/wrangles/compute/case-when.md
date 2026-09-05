---
schema_version: '0.1'
type: wrangle
id: 9a9662e4-53d1-4932-8adf-bc3e7aa364ad
wrangle_name: case_when
namespace: compute
title: Case When
description: Assign values to a column based on conditional logic.
wrangle_key: compute.case_when
aliases: []
slug: compute/case-when
status: active
visibility: public
tags:
  - compute
  - case-when
runtime:
  package: wrangles
  symbol: wrangles.recipe_wrangles.compute.case_when
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
    description: Name of the output column.
    required: true
    param_group: I/O
    schema:
      type: string
  - name: cases
    description: List of conditions and corresponding values.
    required: true
    param_group: Options
    schema:
      type: array
      minItems: 1
      items:
        type: object
        required:
          - condition
          - value
        properties:
          condition:
            type: string
          value:
            type:
              - string
              - number
              - integer
              - boolean
  - name: default
    description: Value to assign if no conditions are met. Default None.
    required: false
    param_group: Options
    runtime_default: null
    schema:
      type:
        - string
        - number
        - integer
        - boolean
        - 'null'
examples: []
sources:
  - id: runtime
    resource: >-
      https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py
    title: WranglesPY compute.case_when implementation
  - id: quasi-registry
    resource: >-
      https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/case-when.md
    title: Existing compute.case_when Markdown
---

# Case When

Assign values to a column based on conditional logic.

## Migrated examples
#### Assigning Letter Grades

##### Recipe

```yaml
wrangles:
  - compute.case_when:
      output: Letter Grade
      cases:
        - condition: Grade > 89
          value: 'A'
        - condition: 90 > Grade > 79
          value: 'B'
        - condition: 80 > Grade > 69
          value: 'C'
        - condition: 70 > Grade
          value: 'F'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Student | Grade |
| --- | --- |
| Billy | 62 |
| Sarah | 91 |
| Timmy | 88 |
| Tammy | 74 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Student | Grade | Letter Grade |
| --- | --- | --- |
| Billy | 62 | F |
| Sarah | 91 | A |
| Timmy | 88 | B |
| Tammy | 74 | C |

</div>

</div>

#### Assigning Letter Grades with Attendance

Conditions can be combined so multiple criteria must be met before assigning a value.

##### Recipe

```yaml
wrangles:
  - compute.case_when:
      output: Letter Grade
      cases:
        - condition: (Grade > .89) & (Attendance == 'Good')
          value: 'A'
        - condition: (.90 > Grade > .79) & (Attendance == 'Good')
          value: 'B'
        - condition: (.80 > Grade > .69) & (Attendance == 'Good')
          value: 'C'
        - condition: (.70 > Grade) or (Attendance == 'Poor')
          value: 'F'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Student | Grade | Attendance |
| --- | --- | --- |
| Billy | 62 | Poor |
| Sarah | 91 | Poor |
| Timmy | 88 | Good |
| Tammy | 74 | Good |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Student | Grade | Attendance | Letter Grade |
| --- | --- | --- | --- |
| Billy | 62 | Poor | F |
| Sarah | 91 | Poor | F |
| Timmy | 88 | Good | B |
| Tammy | 74 | Good | C |

</div>

</div>
