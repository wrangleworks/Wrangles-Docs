## Pad

Pad a string to a fixed length

### Examples

#### Adding Dashes to Part Numbers

##### Recipe

```yaml
wrangles:
  - format.pad:
      input: Part Number
      pad_length: 5
      side: left
      char: "-"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Number |
| --- |
| 0458 |
| 396 |
| 84 |
| 98516 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Part Number |
| --- |
| -0458 |
| --396 |
| ---84 |
| 98516 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | No | If none given, overwrites input. |  | ["Pad Output"] |
| char | Char | text | Yes | The character to pad the input with |  | "" |
| pad_length | Pad Length | number | Yes | Length for the output |  | "" |
| side | Side | text | Yes | Side from which to fill resulting string. | left, right, both | "" |
| skip_empty | Skip Empty | boolean | No | Whether to skip empty values, defaults to false. |  | false |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "char": "",
  "side": "",
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Pad Output"
  ],
  "pad_length": "",
  "skip_empty": false
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
| ID | 76c19378-38f4-45aa-85d1-3cdf8f8aae29 |
| Wrangle Key | `format.pad` |
| Type | format |
| Subtype | pad |
| Variant | stock |
| Status | active |
| Tags | Format, format, pad |

</details>
