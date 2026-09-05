## Threshold

Select the first option if it exceeds a given threshold, else the second option.

### Examples

#### Selecting Results Above a Threshold

##### Recipe

```yaml
wrangles:
  - select.threshold:
      input:
        - Col1
        - Col2
      output: Result
      threshold: .77
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| ['A', 0.6] | ['B', 0.79] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Result |
| --- |
| B |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | List of the input columns to select from |  | ["Column A", "Column B"] |
| output | Output | text | Yes | Name of the output column |  | "Threshold Output" |
| threshold | Threshold | number | Yes | Threshold above which to choose the first option, otherwise the second |  | "" |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "output": "Threshold Output",
  "threshold": ""
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
| Docs Path | docs/python/recipes/wrangles/select.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/select |
| Legacy Path | docs/python/recipes/wrangles/select.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | af2a5dcc-0ec0-48d7-8fb4-f58d9c5391d2 |
| Wrangle Key | `select.threshold` |
| Type | select |
| Subtype | threshold |
| Variant | stock |
| Status | active |
| Tags | Select, select, threshold |

</details>
