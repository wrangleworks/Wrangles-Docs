## Highest Confidence

Select the option with the highest confidence from multiple columns. Inputs are expected to be of the form `[value, confidence_score]`.

### Examples

#### Selecting Highest Confidence Single Output

##### Recipe

```yaml
wrangles:
  - select.highest_confidence:
      input:
        - Col1
        - Col2
        - Col3
      output: Highest Confidence
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| ['A', 0.79] | ['B', 0.77] | ['C', 0.99] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Highest Confidence |
| --- |
| ['C', 0.99] |

</div>

</div>

#### Selecting Highest Confidence Two Outputs

##### Recipe

```yaml
wrangles:
  - select.highest_confidence:
      input:
        - Col1
        - Col2
        - Col3
      output:
        - Item
        - Confidence
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| ['A', 0.79] | ['B', 0.77] | ['C', 0.99] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Item | Confidence |
| --- | --- |
| C | 0.99 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | The input columns to select from. |  | ["Column A", "Column B"] |
| output | Output | list | Yes | If a list of two, separates the element and its confidence. If one column is provided, returns `[result, confidence]`. |  | ["Highest Confidence Output"] |
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
    "Highest Confidence Output"
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
| ID | 00aad85d-8cc8-42e5-86f3-e4ff916e8ac2 |
| Wrangle Key | `select.highest_confidence` |
| Type | select |
| Subtype | highest_confidence |
| Variant | stock |
| Status | active |
| Tags | Select, select, highest_confidence |

</details>
