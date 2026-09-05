## List Element

Select a numbered element of a list (zero indexed).

### Examples

#### Selecting the Second Element in a List

##### Recipe

```yaml
wrangles:
  - select.list_element:
      input: Col1
      output: Second Element
      element: 2 # Zero indexed
      default: F
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 |
| --- |
| ['A', 'B', 'C'] |
| ['D', 'E'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Third Element |
| --- |
| C |
| F |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column |  | ["Column A", "Column B"] |
| output | Output | list | No | If omitted, overwrites input. |  | ["List Element Output"] |
| element | Element | number | No | The numbered element of the list to select. Starts from zero. If omitted, defaults to 0. |  | "" |
| default | Default | boolean | No | Set the default value to return if the specified element doesn't exist. |  | false |
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
    "List Element Output"
  ],
  "default": false,
  "element": ""
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
| ID | ec40495d-d29a-4f62-86dd-eafa43cf388a |
| Wrangle Key | `select.list_element` |
| Type | select |
| Subtype | list_element |
| Variant | stock |
| Status | active |
| Tags | Select, select, list_element |

</details>
