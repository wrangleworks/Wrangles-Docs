## Regex

Extract single values, matches, or specific capture groups using regex.

### Examples

#### Extracting Number of Months From Range

##### Recipe

```yaml
wrangles:
  - extract.regex:
  		input: Product
      output: GPM
      find: \d\.?\d? ?gpm
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| GPM | Product |
| --- | --- |
| 3.4 gpm | 3.4 gpm water pump |
| 2gpm | 2gpm water pump |

</div>

</div>

#### Implementing output_pattern

##### Recipe

```yaml
wrangles:
  - extract.regex:
  		input: Product
      output: GPM
      find: (\d\.?\d?) ?gpm
      output_pattern: \1 Gallons Per Minute
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| GPM | Product |
| --- | --- |
| 3.4 Gallons Per Minute | 3.4 gpm water pump for 5.5 gallon tank |
| 2 Gallons Per Minute | 2gpm water pump for 2 gal tank |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column(s). |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name of the output column(s). |  | ["Regex Output"] |
| find | Find | text | Yes | Pattern to find using regex |  | "" |
| first_element | First Element | boolean | No | Get the first element from results |  | false |
| output_pattern | Output Pattern | text | No | Format for output matches and capture groups using backreferences such as `\1` or `\2`. Defaults to entire matches. |  | "" |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "find": "",
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Regex Output"
  ],
  "first_element": false,
  "output_pattern": ""
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
| ID | 9aa0253a-4b70-4737-832c-964e15967289 |
| Wrangle Key | `extract.regex` |
| Type | extract |
| Subtype | regex |
| Variant | stock |
| Status | active |
| Tags | Extract, extract, regex |

</details>
