## Bins

Creates a column that segments and sorts data values into bins. `bins` can be an integer or a list. When `bins` is an integer, the input data is split equally into that number of bins. When `bins` is a list, the input data is split based on the list boundaries.

### Examples

#### Creating Bins With an Integer

##### Recipe

```yaml
wrangles:
  - create.bins:
      input: Data
      output: Category
      bins: 3
      labels:
        - Bad
        - Medium
        - Good
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Category |
| --- | --- |
| 1 | Bad |
| 7 | Good |
| 5 | Medium |
| 4 | Medium |
| 6 | Good |
| 3 | Bad |

</div>

</div>

#### Creating Bins With a List

##### Recipe

```yaml
wrangles:
  - create.bins:
      input: Grades
      output: Letter Grade
      bins: 
      	- 0
      	- 60
        - 70
        - 80
        - 90
        - 100
      labels:
        - F
        - D
        - C
        - B
        - A
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Grade | Student |
| --- | --- |
| 64 | Charles |
| 92 | Sabrina |
| 76 | Edward |
| 84 | Wendy |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Grade | Student | Letter Grade |
| --- | --- | --- |
| 64 | Charles | D |
| 92 | Sabrina | A |
| 76 | Edward | C |
| 84 | Wendy | B |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of input column |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name of new column |  | ["Bins Output"] |
| bins | Bins | list | Yes | Defines the number of equal-width bins in the range |  | [] |
| labels | Labels | list | No | Labels for the returned bins. |  | [] |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "bins": [],
  "input": [
    "Column A",
    "Column B"
  ],
  "labels": [],
  "output": [
    "Bins Output"
  ]
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
| Docs Path | docs/python/recipes/wrangles/create.md |
| Docs URL | /python/recipes/wrangles/create |
| Legacy Path | docs/python/recipes/wrangles/create.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 232e3ba0-4735-4934-88aa-0163181abb3f |
| Wrangle Key | `create.bins` |
| Type | create |
| Subtype | bins |
| Variant | stock |
| Status | active |
| Tags | Create, create, bins |

</details>
