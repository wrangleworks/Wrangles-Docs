## To YAML

Convert an object to a YAML representation.

### Examples

#### Convert a Dictionary to YAML

##### Recipe

```yaml
wrangles:
  - convert.to_yaml:
      input: column 1
      indent: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

```python
{
  'Product Specs': {
    'length': '6 inch',
    'voltage': '24V',
    'weight': '3lb'
  }
}
```

</div>

<div className="ww-sample-panel">

##### Output Sample

```yaml
Product Specs:
  length: 6 inch
  voltage: 24V
  weight: 3lb
```

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | No | Name of the output column. If omitted, the input column will be overwritten. |  | ["To Yaml Output"] |
| indent | Indent | number | No | Number of spaces to use for nested indentation. |  | "" |
| sort_keys | Sort Keys | boolean | No | If true, dictionary keys are sorted in the output. |  | false |
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
  "indent": "",
  "output": [
    "To Yaml Output"
  ],
  "sort_keys": false
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
| ID | 4cd6252f-ce47-4a9d-8272-3d87e875b72a |
| Wrangle Key | `convert.to_yaml` |
| Type | convert |
| Subtype | to_yaml |
| Variant | stock |
| Status | active |
| Tags | Convert, convert, to_yaml |

</details>
