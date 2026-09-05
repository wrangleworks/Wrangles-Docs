## Find Links

Perform web searches to find links. Returns structured search results with titles, links, snippets, and optional pricing.

### Examples

#### Find Product Links

This template searches once per query and returns structured result dictionaries. Search results vary by provider, location, and time.

##### Recipe

```yaml
wrangles:
  - search.find_links:
      id: Row ID
      queries:
        - Search Query
      output:
        - Search Results
      api_key: Your SerpApi API key
      client: serpapi
      n_results: 5
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Row ID | Search Query |
| --- | --- |
| 1001 | SKF 6202 bearing supplier |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Row ID | Search Query | Search Results |
| --- | --- | --- |
| 1001 | SKF 6202 bearing supplier | `[{"title": "Example result", "link": "https://example.com/6202", "snippet": "SKF 6202 bearing"}]` |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| output | Output | list | Yes | Output column for the dictionaries. If a list of 2 is provided, outputs [dicts_column, pretty_strings_column]. |  | ["Find Links Output"] |
| id | Id | text | Yes | Name of the column containing the row ID to append to each search result. |  | "" |
| queries | Queries | list | Yes | Name or list of input columns containing search queries. |  | [] |
| api_key | Api Key | text | No | API key for the search client. Can also be set as an environment variable (e.g., SERPAPI_API_KEY). |  | "" |
| client | Client | select | No | The search provider to use. | serpapi | "serpapi" |
| country | Country | text | No | Country code for search results (default 'us'). Alias: gl. |  | "us" |
| device | Device | select | No | Device type for search results. | desktop, mobile, tablet | "" |
| language | Language | text | No | Language code for search results (default 'en'). Alias: hl. |  | "en" |
| location | Location | text | No | Location for search results (e.g., 'Austin, Texas'). |  | "" |
| n_results | N Results | number | No | Number of search results to return per query (default 10, max 100). |  | 10 |
| threads | Threads | number | No | Number of concurrent threads for parallel processing (default 10). |  | 10 |

### Defaults

```json
{
  "id": "",
  "client": "serpapi",
  "device": "",
  "output": [
    "Find Links Output"
  ],
  "api_key": "",
  "country": "us",
  "queries": [],
  "threads": 10,
  "language": "en",
  "location": "",
  "n_results": 10
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
| ID | ec1f661b-2cbc-4a47-88e3-646179104376 |
| Wrangle Key | `search.find_links` |
| Type | search |
| Subtype | find_links |
| Variant | stock |
| Status | active |
| Tags | Search, search, find_links |

</details>
