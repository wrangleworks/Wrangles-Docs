## Explode

Explode a column of lists into rows

### Examples

#### Exploding a Column

##### Recipe

```yaml
wrangles:
  - explode:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products | Manufacturer |
| --- | --- |
| [Ball Bearing, Bearing Seal] | SKF |
| [Angle Grinder, Drill, Impact Driver] | Milwaukee |
| Solid State Relay | Schneider |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Seal | SKF |
| Angle Grinder | Milwaukee |
| Drill | Milwaukee |
| Impact Driver | Milwaukee |
| Solid State Relay | Schneider |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the column(s) to explode. If multiple columns are included, they must contain lists of the same length. |  | ["Column A", "Column B"] |
| drop_empty | Drop Empty | boolean | No | Empty lists will not produce a row in the exploded output. Default false. |  | false |
| reset_index | Reset Index | boolean | No | Reset the index after exploding. Default false. |  | false |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "drop_empty": false,
  "reset_index": false
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
| ID | 4e4b13ac-8d50-4b2c-85c8-2c31de1e817d |
| Wrangle Key | `explode` |
| Type | split |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Split, explode |

</details>
