## HTML

Extract text and links from HTML elements. Requires WrangleWorks Account.

### Examples

#### Extracting Text From HTML

##### Recipe

```yaml
wrangles:
  - extract.html:
      input: HTML
      output: Text
      data_type: text
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| HTML | Text |
| --- | --- |
| ` |  |

</div>

</div>

#### Extracting Links From HTML

##### Recipe

```yaml
wrangles:
  - extract.html:
      input: HTML
      output: Links
      data_type: links
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| HTML | Links |
| --- | --- |
| ` |  |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of input columns. |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name or list of output columns |  | ["Html Output"] |
| data_type | Data Type | select | Yes | The type of data to extract | text, links | "text" |
| first_element | First Element | boolean | No | Get the first element from results |  | false |
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
  "output": [
    "Html Output"
  ],
  "data_type": "text",
  "first_element": false
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/extract.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/extract |
| Legacy Path | docs/python/recipes/wrangles/extract.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 728fc87a-a20d-4efa-833a-612e0b5eadc3 |
| Wrangle Key | `extract.html` |
| Type | extract |
| Subtype | html |
| Variant | stock |
| Status | active |
| Tags | Extract, extract, html |

</details>
