## Retrieve Link Content

Retrieves targeted content from web pages using LLM URL extraction. Can optionally output a second column containing a clean, human-readable text summary of the retrieved data.

### Examples

#### Retrieve Structured Page Content

This template extracts JSON content from a URL. Returned fields depend on the page, prompt, and retrieval model.

##### Recipe

```yaml
wrangles:
  - search.retrieve_link_content:
      input:
        - Product URL
      output:
        - Page Data
      api_key: Your Google API key
      client: google_url_context
      output_format: json
      prompt: Extract the product title and manufacturer.
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product URL |
| --- |
| https://example.com/products/6202 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product URL | Page Data |
| --- | --- |
| https://example.com/products/6202 | `{"title": "6202 Bearing", "manufacturer": "SKF"}` |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of input columns containing URLs or Scored Search Result dictionaries. |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name of the output column for the raw dictionaries. To output BOTH the raw dictionaries and the formatted text, provide a list of exactly two column names (e.g., [page_data, page_text]). |  | ["Retrieve Link Content Output"] |
| api_key | Api Key | text | No | API key for the provider. Can also be set as an environment variable (e.g., GOOGLE_API_KEY). |  | "" |
| client | Client | select | No | The retrieval provider to use. | google_url_context | "google_url_context" |
| model_id | Model Id | text | No | The specific model ID to use (default models/gemini-3-flash-preview). |  | "" |
| output_format | Output Format | select | No | The desired format for the extracted content. | markdown, json | "json" |
| prompt | Prompt | text | No | Optional custom system prompt to guide the extraction behavior and output format. |  | "" |
| threads | Threads | number | No | Number of concurrent threads for parallel processing (default 10). |  | 10 |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "client": "google_url_context",
  "output": [
    "Retrieve Link Content Output"
  ],
  "prompt": "",
  "api_key": "",
  "threads": 10,
  "model_id": "",
  "output_format": "json"
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
| Docs Path | Not currently published on wrangles.io |
| Docs URL | Not currently published on wrangles.io |
| Legacy Path | Not currently published on wrangles.io |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 3d5faa87-9e96-48c0-8226-5ae566e8d76c |
| Wrangle Key | `search.retrieve_link_content` |
| Type | search |
| Subtype | retrieve_link_content |
| Variant | stock |
| Status | active |
| Tags | Search, search, retrieve_link_content |

</details>
