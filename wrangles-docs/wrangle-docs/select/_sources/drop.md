## Drop

Drop (Delete) selected column(s)

### Examples

#### Dropping a Column

##### Recipe

```yaml
wrangles:
  - drop:
      columns:
        - Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data |
| --- |
| SKF ball bearing |
| bearing seal |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| columns | Columns | list | Yes | Name of the column(s) to drop |  | ["Column A", "Column B"] |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "columns": [
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
| Docs Path | docs/python/recipes/wrangles/utilities.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/utilities |
| Legacy Path | docs/python/recipes/wrangles/utilities.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 363bffbf-397e-4975-8382-e9efa5e9eed6 |
| Wrangle Key | `drop` |
| Type | select |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Select, drop |

</details>
