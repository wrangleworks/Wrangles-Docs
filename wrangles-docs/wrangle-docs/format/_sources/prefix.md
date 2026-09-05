## Prefix

Add a prefix to a column.

### Examples

#### Adding a Prefix to a String

##### Recipe

```yaml
wrangles:
  - format.prefix:
      input: Data
      output: Prefix
      value: anti
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Data |
| --- |
| freeze |
| dote |
| hero |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Data | Prefix |
| --- | --- |
| freeze | antifreeze |
| dote | antidote |
| hero | antihero |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | No | If none given, overwrites input. |  | ["Prefix Output"] |
| value | Value | text | Yes | Prefix value to add |  | "" |
| skip_empty | Skip Empty | boolean | No | Whether to skip empty values, defaults to false. |  | false |
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
  "value": "",
  "output": [
    "Prefix Output"
  ],
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
| ID | c12f99b9-2363-4da7-8405-7c73b87906e5 |
| Wrangle Key | `format.prefix` |
| Type | format |
| Subtype | prefix |
| Variant | stock |
| Status | active |
| Tags | Format, format, prefix |

</details>
