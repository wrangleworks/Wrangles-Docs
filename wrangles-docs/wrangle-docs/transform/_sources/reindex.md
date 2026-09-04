## Reindex

Conform a DataFrame to a new index with optional filling logic.

### Examples

:::note
Cannot specify both `axis` and any of `index` or `columns`. Reindex is not compatible with `where` filtering.
:::

#### Reindexing a Dataframe

##### Recipe

```yaml
wrangles:
  - reindex:
      index:
        - 5
        - 4
        - 3
        - 2
        - 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

|  | Material | Product Data |
| --- | --- | --- |
| 1 | Ceramic | SKF ball brg |
| 2 | Rubber | brg seal |
| 3 | Brass | Ball valve |
| 4 | Ceramic | Ceramic cartridge |
| 5 | Stainless Steel | Needle Bearing |

</div>

<div className="ww-sample-panel">

##### Output Sample

|  | Material | Product Data |
| --- | --- | --- |
| 5 | Stainless Steel | Needle Bearing |
| 4 | Ceramic | Ceramic cartridge |
| 3 | Brass | Ball valve |
| 2 | Rubber | brg seal |
| 1 | Ceramic | SKF ball brg |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| columns | Columns | list | No | New labels for the columns. Preferably an Index object to avoid duplicating data. |  | ["Column A", "Column B"] |
| axis | Axis | text | No | Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1). |  | "" |
| index | Index | list | No | New labels for the index. Preferably an Index object to avoid duplicating data. |  | [] |
| labels | Labels | list | No | New labels / index to conform the axis specified by `axis`. |  | [] |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "axis": "",
  "index": [],
  "labels": [],
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
| ID | def87df8-72da-4e34-83c1-1fde25126257 |
| Wrangle Key | `reindex` |
| Type | transform |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Transform, reindex |

</details>
