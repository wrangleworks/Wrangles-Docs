## Transpose

Transpose a dataframe.

### Examples

:::note
Transpose is not compatible with `where` filtering.
:::

#### Transposing a Dataframe

##### Recipe

```yaml
wrangles:
  - transpose:
      header_column: Material
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

| Material | Ceramic | Rubber |
| --- | --- | --- |
| Product Data | SKF ball brg | brg seal |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| header_column | Header Column | text | No | Name or position of the column that will be used as the column headings for the transposed DataFrame. Default 0 (first column). Use `header_column = null` to not use any column as header. |  | "" |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "header_column": ""
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
| ID | 8716347f-f286-49b2-8a0b-cb73292e7475 |
| Wrangle Key | `transpose` |
| Type | transform |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Transform, transpose |

</details>
