## From JSON

Convert a JSON string into an object.

### Examples

#### Convert JSON to Object

##### Recipe

```yaml
wrangles:
  - convert.from_json:
      input: column
      output: new column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| `["a","python","list"]` |
| `{"python":"dict"}` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| new column |
| --- |
| `['a', 'python', 'list']` |
| `{'python': 'dict'}` |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | No | Name of the output column. If omitted, the input column will be overwritten. |  | ["From Json Output"] |
| default | Default | boolean | No | Value to return if the row is empty or fails to be parsed as JSON. |  | false |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "From Json Output"
  ],
  "default": false
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
| Docs Path | docs/python/recipes/wrangles/convert.md |
| Docs URL | /python/recipes/wrangles/convert |
| Legacy Path | docs/python/recipes/wrangles/convert.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | e370dfcf-b0fe-4c48-8a52-6f34c47e7978 |
| Wrangle Key | `convert.from_json` |
| Type | convert |
| Subtype | from_json |
| Variant | stock |
| Status | active |
| Tags | Convert, convert, from_json |

</details>
