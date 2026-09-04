## Huggingface

Use a model from huggingface

### Examples

#### Summarize Product Descriptions

This template uses a Hugging Face summarization model. The exact response shape and text depend on the selected model.

##### Recipe

```yaml
wrangles:
  - huggingface:
      input:
        - Product Description
      output:
        - Summary
      api_token: Your Hugging Face API token
      model: facebook/bart-large-cnn
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Description |
| --- |
| A cordless drill with two batteries, a charger, and a compact carrying case. |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Description | Summary |
| --- | --- |
| A cordless drill with two batteries, a charger, and a compact carrying case. | Cordless drill kit with batteries, charger, and case. |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | No | Name of the output column. If not provided, will overwrite the input column |  | ["Huggingface Output"] |
| api_token | Api Token | text | Yes | Huggingface API Token |  | "" |
| model | Model | text | Yes | Name of the model to use. e.g. facebook/bart-large-cnn |  | "" |
| parameters | Parameters | json | No | Optionally, provide additional parameters to define the model behaviour |  | "" |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "model": "",
  "output": [
    "Huggingface Output"
  ],
  "api_token": "",
  "parameters": ""
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
| Docs Path |  |
| Docs URL |  |
| Legacy Path |  |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | ae12cf20-4934-428f-84a9-a6898cb7ffe0 |
| Wrangle Key | `huggingface` |
| Type | ai |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | AI, huggingface |

</details>
