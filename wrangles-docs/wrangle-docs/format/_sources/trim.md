## Trim

Remove excess whitespace at the start and end of text. Can accept multiple columns.

:::note
Non-string values pass through unaltered.
:::

### Examples

#### Trimming a String

##### Recipe

```yaml
wrangles:
  - format.trim:
      input:
        - col1
      output: col1 trimmed
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| col1 |
| --- |
| `  Hello World  ` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| col1 | col1 trimmed |
| --- | --- |
| Hello World | Hello World |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | No | If none given, overwrites input. |  | ["Trim Output"] |
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
    "Trim Output"
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
| ID | af16b3c1-c230-4868-8ebe-f574904a0c76 |
| Wrangle Key | `format.trim` |
| Type | format |
| Subtype | trim |
| Variant | stock |
| Status | active |
| Tags | Format, format, trim |

</details>
