---
title: "Case When"
description: "Assign values to a column based on conditional logic."
sidebar_label: "Case When"
slug: "/compute/case-when"
---

# Case When

Assign values to a column based on conditional logic.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `output` | Yes | string | Name of the output column. | — |
| `cases` | Yes | array | List of conditions and corresponding values. | — |
| `default` | No | string, number, integer, boolean, null | Value to assign if no conditions are met. Default None. | `null` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

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

## Provenance

- [WranglesPY compute.case_when implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/compute.py)
- [Existing compute.case_when Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/case-when.md)

## Registry metadata

- Registry ID: `9a9662e4-53d1-4932-8adf-bc3e7aa364ad`
- Namespace: `compute`
- Recipe key: `compute.case_when`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.compute.case_when`
- Status: `active`
- Registry version: `0.1.0-pilot`
