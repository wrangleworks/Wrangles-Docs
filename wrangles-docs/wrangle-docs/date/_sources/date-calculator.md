## Date Calculator

Add or subtract time from a date.

### Examples

#### Calculating a Future Date

##### Recipe

```yaml
wrangles:
   - date_calculator:
      input: Date
      output: New Date
      operation: subtract  # Optional default is addition
      time_unit: days
      time_value: 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Date |
| --- |
| 2022-12-26 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| New Date |
| --- |
| 2022-12-25 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | text | Yes | Name of the dates column. |  | "Column A" |
| output | Output | text | No | Name of the output column of dates. |  | "Date Calculator Output" |
| operation | Operation | select | No | Date operation. Defaults to add. | add, subtract | "" |
| time_unit | Time Unit | select | No | Time unit for the operation. Defaults to none. | years, months, weeks, days, hours, minutes, seconds, milliseconds | "" |
| time_value | Time Value | number | No | Time unit value for the operation. Defaults to none. |  | "" |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": "Column A",
  "output": "Date Calculator Output",
  "operation": "",
  "time_unit": "",
  "time_value": ""
}
```

### Time Units

- `years`
- `months`
- `weeks`
- `days`
- `hours`
- `minutes`
- `seconds`
- `milliseconds`

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
| Docs Path | docs/python/recipes/wrangles/standalone.md |
| Docs URL | https://wrangles.io/en/python/recipes/wrangles/standalone |
| Legacy Path | docs/python/recipes/wrangles/standalone.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 19cfeb4f-02af-4ab2-895c-0ff2bb5cce19 |
| Wrangle Key | `date_calculator` |
| Type | date |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Date, date_calculator |

</details>
