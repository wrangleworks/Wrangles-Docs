## Case When

Assign values to a column based on conditional logic.

### Examples

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

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| output | Output | text | Yes | The name of the output column. |  | "Case When Output" |
| cases | Cases | list | Yes | List of conditions and corresponding values. |  | [] |
| default | Default | boolean | No | Value to assign if no conditions are met. Defaults to None. |  | false |

### Case Entries

Each item in `cases` is an object with a condition and value. Conditions are evaluated in order, and the value from the first matching condition is assigned to the output column.

| Key | Required | Data Type | Description |
| --- | --- | --- | --- |
| condition | Yes | string | Condition to evaluate, such as `Score > 0.84`. |
| value | Yes | any | Value to assign if the condition is true. |

### Defaults

```json
{
  "cases": [],
  "output": "Case When Output",
  "default": false
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/compute.md |
| Docs URL | /python/recipes/wrangles/compute |
| Legacy Path | docs/python/recipes/wrangles/compute.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 9a9662e4-53d1-4932-8adf-bc3e7aa364ad |
| Wrangle Key | `compute.case_when` |
| Type | compute |
| Subtype | case_when |
| Variant | stock |
| Status | active |
| Tags | Compute, compute, case_when |

</details>
