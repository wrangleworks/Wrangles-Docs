## Codes

Extract alphanumeric codes from unstructured text. Can be performed on one column or multiple columns. Requires WrangleWorks Account.

### Examples

#### Extracting Codes From Single Column

##### Recipe

```yaml
# One column input
wrangles:
  - extract.codes:
      input: Secret
      output: Code Extract
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Secret | Code Extract |
| --- | --- |
| to gain access use Z1ON0101 | ['Z1ON0101'] |

</div>

</div>

#### Extracting Codes From Multiple Columns

##### Recipe

```yaml
# Multi column input
wrangles:
  - extract.codes:
      input:
      	- code1
        - code2
      output: Codes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Codes | code1 | code2 |
| --- | --- | --- |
| ['CH465517080-1', 'CH465517080-2'] | code CH465517080-1 | code CH465517080-2 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of input columns. |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name or list of output columns |  | ["Codes Output"] |
| disallowed_patterns | Disallowed Patterns | text | No | A pattern or JSON array of regex patterns to not include in the found codes |  | "" |
| first_element | First Element | boolean | No | Get the first element from results |  | false |
| include_multi_part_tokens | Include Multi Part Tokens | boolean | No | Whether to include multi-part tokens that have a space. Default True. |  | false |
| max_length | Max Length | text | No | Maximum length of allowed results. |  | "" |
| min_length | Min Length | text | No | Minimum length of allowed results. |  | "" |
| sort_order | Sort Order | select | No | Default is as found in the input. Also allows longest or shortest. | longest, shortest | "" |
| strategy | Strategy | select | No | How aggressive to be at removing false positives such as measurements. | lenient, balanced, strict | "" |
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
    "Codes Output"
  ],
  "strategy": "",
  "max_length": "",
  "min_length": "",
  "sort_order": "",
  "first_element": false,
  "disallowed_patterns": "",
  "include_multi_part_tokens": false
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
| ID | da591387-0fca-4842-8bcb-d19f561f0292 |
| Wrangle Key | `extract.codes` |
| Type | extract |
| Subtype | codes |
| Variant | stock |
| Status | active |
| Tags | Extract, extract, codes |

</details>
