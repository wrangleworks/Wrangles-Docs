## Significant Figures

Format a value to a specific number of significant figures

### Examples

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

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | No | Name of the output column. If none given, overwrites input. |  | ["Significant Figures Output"] |
| significant_figures | Significant Figures | number | No | Number of significant figures to format to. Default is 3. |  | "" |
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
  "output": [
    "Significant Figures Output"
  ],
  "significant_figures": ""
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
| Docs Path | docs/python/recipes/wrangles/format.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/format |
| Legacy Path | docs/python/recipes/wrangles/format.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | a359f72a-5250-4dd8-84f6-8a8173bee0f6 |
| Wrangle Key | `format.significant_figures` |
| Type | format |
| Subtype | significant_figures |
| Variant | stock |
| Status | active |
| Tags | Format, format, significant_figures |

</details>
