## Lookup

Look up data from a saved Lookup Wrangle. Data is output as a dictionary if an output is not specified or the output does not match any columns in the lookup. If specific lookup columns are named in the output, they will be output as individual columns.

### Examples

#### State Example

##### Recipe

```yaml
wrangles:
  - lookup:
      input: State
      output:
        - Abbreviation
      model_id: 55555555-5555-5555
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| State |
| --- |
| Texas |
| New York |
| Virginia |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Abbreviation |
| --- |
| TX |
| NY |
| VA |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | text | Yes | The input column that contains the keys to be looked up in the Lookup Wrangle. |  | "Column A" |
| output | Output | list | No | Output columns from the Lookup Wrangle. If not present, a dictionary with output values is returned. |  | ["Lookup Output"] |
| model_id | Model Id | text | Yes | ID of the lookup model to be used. |  | "" |
| lookup_mode | Lookup Mode | select | No | How to perform lookups. `by_row` (default): lookup each row individually. `by_dataframe`: lookup unique values once, copy results to all rows. `by_matrix`: lookup once per matrix permutation. | by_row, by_matrix, by_dataframe | "" |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": "Column A",
  "output": [
    "Lookup Output"
  ],
  "model_id": "",
  "lookup_mode": ""
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
| ID | b3339193-d1cc-4c89-8ed6-901efa6d81be |
| Wrangle Key | `lookup` |
| Type | lookup |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Lookup, lookup |

</details>
