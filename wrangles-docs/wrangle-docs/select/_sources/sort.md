## Sort

Sort the data

### Examples

#### Replacing Abbreviations

##### Recipe

```yaml
wrangles:
  - sort:
      by: Price
      ascending: true
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Item | Price |
| --- | --- |
| Hammer | 11.99 |
| Chisel | 4.99 |
| Drill | 29.99 |
| Wrench | 6.99 |
| Saw | 13.99 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Item | Price |
| --- | --- |
| Chisel | 4.99 |
| Wrench | 6.99 |
| Hammer | 11.99 |
| Saw | 13.99 |
| Drill | 29.99 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| by | By | list | Yes | Name or list of the column(s) to sort by |  | ["Column A", "Column B"] |
| ascending | Ascending | boolean | No | Sort ascending vs. descending. Specify a list to sort multiple columns in different orders. If this is a list of bools then it must match the length of the by. |  | false |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "by": [
    "Column A",
    "Column B"
  ],
  "ascending": false
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
| ID | 1dcf06ad-898a-4d83-862c-4774be37a687 |
| Wrangle Key | `sort` |
| Type | select |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Select, sort |

</details>
