## Classify

Run a custom classification wrangle on the specified column or columns. A classification wrangle must be trained first.

### Examples

#### Food Type Example

##### Recipe

```yaml
wrangles:
  - classify:
      input: Products
      output: Category
      model_id: ${model_id}
      where: Products = Milk
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| Rice |
| Milk |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products | Category |
| --- | --- |
| Rice |  |
| Milk | Dairy |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column or columns. |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name of the output column or columns. |  | ["Classify Output"] |
| model_id | Model Id | text | Yes | ID of the classification model to be used. |  | "" |
| include_confidence | Include Confidence | boolean | No | Also return confidence for models that support it. |  | false |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where`, allowing the query to be parameterized using SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Classify Output"
  ],
  "model_id": "",
  "include_confidence": false
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | Yes |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/standalone.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/standalone |
| Legacy Path | docs/python/recipes/wrangles/standalone.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 06669ef8-cdd1-42f7-8078-98e0b7a42c30 |
| Wrangle Key | `classify` |
| Type | ai |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | AI, classify |

</details>
