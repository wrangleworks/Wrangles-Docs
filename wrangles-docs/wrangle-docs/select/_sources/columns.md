## Columns

Select columns from the dataframe

### Examples

#### Selecting Columns

##### Recipe

```yaml
wrangles:
  - select.columns:
      input: Manufacturer
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Number | Manufacturer |
| --- | --- |
| 1234 | SKF |
| 5678 | Timken |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer |
| --- |
| SKF |
| Timken |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the column(s) to select |  | ["Column A", "Column B"] |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
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
| ID | bca12c60-3957-4dc5-83f7-5ee460df2a11 |
| Wrangle Key | `select.columns` |
| Type | select |
| Subtype | columns |
| Variant | stock |
| Status | active |
| Tags | Select, select, columns |

</details>
