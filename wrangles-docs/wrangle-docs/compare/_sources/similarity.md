## Similarity

Calculate the similarity of two vectors.

:::info
Similarity only works on vectors. To produce vectors from a column of strings, use `create.embeddings` first.
:::

### Examples

#### Similarity Between Embeddings

##### Recipe

```yaml
wrangles:
  - create.embeddings:
      input: col1
      api_key: ${my_key}
      output: col1 embeddings

  - create.embeddings:
      input: col2
      api_key: ${my_key}
      output: col2 embeddings

  - similarity:
      input:
        - col1 embeddings
        - col2 embeddings
      output: similarity
      method: adjusted cosine
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| col1 | col2 |
| --- | --- |
| SKF | Timken |
| Ball Bearing | Roller Bearing |

</div>

<div className="ww-sample-panel">

##### Output Sample

| col1 | col2 | col1 embeddings | col2 embeddings | similarity |
| --- | --- | --- | --- | --- |
| SKF | Timken | [1, 2, 3, 4] | [4, 3, 2, 1] | 0.158931 |
| Ball Bearing | Roller Bearing | [5, 6, 7, 8] | [5, 6, 7, 9] | 0.942437 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Two columns of vectors to compare. |  | ["Column A", "Column B"] |
| output | Output | text | Yes | Name of the output column. |  | "Similarity Output" |
| method | Method | select | No | Type of similarity to calculate. Defaults to cosine. Adjusted cosine maps typical comparisons to a 0-1 range. | cosine, adjusted cosine, euclidean | "" |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Methods

- `cosine`
- `adjusted cosine`
- `euclidean`

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "method": "",
  "output": "Similarity Output"
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
| Docs Path | docs/python/recipes/wrangles/standalone.md |
| Docs URL | https://wrangles.io/en/python/recipes/wrangles/standalone |
| Legacy Path | docs/python/recipes/wrangles/standalone.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 7c733344-4cce-4938-8013-53742fb46a90 |
| Wrangle Key | `similarity` |
| Type | compare |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Compare, similarity |

</details>
