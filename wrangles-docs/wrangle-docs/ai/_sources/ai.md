## Ai

Generate structured AI output for each recipe row.

### Examples

#### Generate Structured Product Data

This template generates a category from a product description. AI-generated values can vary by model and request.

##### Recipe

```yaml
wrangles:
  - generate.ai:
      input:
        - Product Description
      output:
        Category:
          type: string
          description: Broad product category
      api_key: Your OpenAI-compatible API key
      model: gpt-5-mini
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Description |
| --- |
| Stainless steel insulated water bottle, 750 ml |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Description | Category |
| --- | --- |
| Stainless steel insulated water bottle, 750 ml | Drinkware |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | No | Column(s) to concatenate into the prompt (defaults to all columns). |  | ["Column A", "Column B"] |
| output | Output | json | Yes | Target schema; string/array shorthands are expanded automatically. |  | "\{\}" |
| api_key | Api Key | text | Yes | OpenAI-compatible API key. |  | "" |
| messages | Messages | list | No | Optional extra messages forwarded to the inner generate helper. |  | [] |
| model | Model | text | No | Responses model name (e.g. gpt-5-mini). |  | "" |
| previous_response | Previous Response | boolean | No | Chain responses by reusing previous_response_id for field-by-field calls. |  | false |
| reasoning | Reasoning | json | No | Responses API reasoning options (forwarded verbatim). |  | "" |
| retries | Retries | number | No | Number of retry attempts on failure. |  | "" |
| strict | Strict | boolean | No | Enforce JSON-schema validation on the response. |  | false |
| summary | Summary | boolean | No | Request summary text to be merged into the output. |  | false |
| threads | Threads | number | No | Maximum concurrent requests (default 20). |  | "" |
| timeout | Timeout | number | No | Per-request timeout in seconds. |  | "" |
| url | Url | text | No | Override for the OpenAI-compatible endpoint. |  | "" |
| web_search | Web Search | boolean | No | Enable DuckDuckGo context lookup per row. |  | false |

### Defaults

```json
{
  "url": "",
  "input": [
    "Column A",
    "Column B"
  ],
  "model": "",
  "output": "{}",
  "strict": false,
  "api_key": "",
  "retries": "",
  "summary": false,
  "threads": "",
  "timeout": "",
  "messages": [],
  "reasoning": "",
  "web_search": false,
  "previous_response": false
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | Yes |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | Yes |

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
| ID | 12c31c6c-cade-484d-84ba-7f302bf6af52 |
| Wrangle Key | `generate.ai` |
| Type | ai |
| Subtype | ai |
| Variant | stock |
| Status | active |
| Tags | AI, generate, ai |

</details>
