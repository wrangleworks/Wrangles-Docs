## Tail

Return the last n rows

### Examples

#### Selecting The Last n Rows

##### Recipe

```yaml
wrangles:
  - select.tail:
      n: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Race | Timken |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Manufacturer |
| --- | --- |
| Needle Bearing | Acme Bearings |
| Roller Bearing | General Bearing Co. |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| n | N | number | Yes | Number of rows to return |  | "" |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "n": ""
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
| ID | 60853759-c160-49a4-87eb-036516a9d823 |
| Wrangle Key | `select.tail` |
| Type | select |
| Subtype | tail |
| Variant | stock |
| Status | active |
| Tags | Select, select, tail |

</details>
