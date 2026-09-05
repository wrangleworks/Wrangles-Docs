## Standardize

Run a standardize wrangle, such as one that expands abbreviations. A standardization wrangle must be trained first.

### Examples

#### Replacing Abbreviations

##### Recipe

```yaml
wrangles:
  - standardize:
      input: Abbrev
      output: Abbreviations
      model_id: code_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Abbrev |
| --- |
| ASAP |
| ETA |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Abbreviations |
| --- |
| As Soon As Possible |
| Estimated Time of Arrival |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of input columns. |  | ["Column A", "Column B"] |
| output | Output | list | No | If omitted, overwrites input. |  | ["Standardize Output"] |
| case_sensitive | Case Sensitive | boolean | No | Allows the wrangle to be case sensitive if set to True, default is False. |  | false |
| model_id | Model Id | list | Yes | The ID of the wrangle to use (do not include `find` and `replace`). |  | [] |
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
    "Standardize Output"
  ],
  "model_id": [],
  "case_sensitive": false
}
```

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-backed | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | Yes |
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
| ID | 53cd3fdd-24e2-4411-8655-6014b92a3f3a |
| Wrangle Key | `standardize` |
| Type | format |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Format, standardize |

</details>
