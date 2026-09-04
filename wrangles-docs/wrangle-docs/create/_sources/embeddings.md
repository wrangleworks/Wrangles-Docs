## Embeddings

Create an embedding based on text input.

### Examples

#### Creating Embeddings

##### Recipe

```yaml
wrangles:
  - create.embeddings:
      input: my_column
      api_key: ${my_key}
      output: embeddings
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| my_column |
| --- |
| angle grinder |
| jig saw |

</div>

<div className="ww-sample-panel">

##### Output Sample

| my_column | embeddings |
| --- | --- |
| angle grinder | [0.010793785, -0.010007165, 0.0028609, -0.0139...] |
| jig saw | [-0.008975127, 0.009314879, -0.024150735, -0.0...] |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | The column of text to create the embeddings for. |  | ["Column A", "Column B"] |
| output | Output | list | No | The output column the embeddings will be saved as. |  | ["Embeddings Output"] |
| api_key | Api Key | text | Yes | OpenAI API key. |  | "" |
| batch_size | Batch Size | number | No | The number of rows to submit per individual request. |  | "" |
| model | Model | text | No | OpenAI embedding model to use. Defaults to `text-embedding-3-small`. |  | "" |
| output_type | Output Type | select | No | Output embeddings as a numpy array or Python list. Defaults to Python list. | numpy array, python list | "" |
| precision | Precision | select | No | The precision of the embeddings. Default is float32. This should be used with output_type numpy array. | float16, float32 | "" |
| retries | Retries | number | No | The number of times to retry if the request fails. This will apply exponential backoff to help with rate limiting. |  | "" |
| threads | Threads | number | No | The number of requests to submit in parallel. Each request contains the number of rows set as batch_size. |  | "" |
| url | Url | text | No | Override the default OpenAI embeddings endpoint. Must use the OpenAI embeddings API. |  | "" |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "url": "",
  "input": [
    "Column A",
    "Column B"
  ],
  "model": "",
  "output": [
    "Embeddings Output"
  ],
  "api_key": "",
  "retries": "",
  "threads": "",
  "precision": "",
  "batch_size": "",
  "output_type": ""
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | Yes |

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/create.md |
| Docs URL | /python/recipes/wrangles/create |
| Legacy Path | docs/python/recipes/wrangles/create.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | e3518afd-a819-40ec-8b49-eb25690220c1 |
| Wrangle Key | `create.embeddings` |
| Type | create |
| Subtype | embeddings |
| Variant | stock |
| Status | active |
| Tags | Create, create, embeddings |

</details>
