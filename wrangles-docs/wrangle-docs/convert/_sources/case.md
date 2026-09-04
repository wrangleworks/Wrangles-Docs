## Case

Change the case of the input.

:::info
Non-string values are passed through unaltered.
:::

### Examples

#### Capitalize Input Column

##### Recipe

```yaml
wrangles:
  - convert.case:
      input: column
      output: new column
      case: upper
      where: column = 'more text'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| some text |
| more text |
| some more text |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | new column |
| --- | --- |
| some text |  |
| more text | MORE TEXT |
| some more text |  |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of input columns. |  | ["Column A", "Column B"] |
| output | Output | list | No | Name or list of output columns. If omitted, the input column will be overwritten. |  | ["Case Output"] |
| case | Case | select | Yes | Case to convert to. | lower, upper, title, sentence | "lower" |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "case": "lower",
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Case Output"
  ]
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
| Docs Path | docs/python/recipes/wrangles/convert.md |
| Docs URL | /python/recipes/wrangles/convert |
| Legacy Path | docs/python/recipes/wrangles/convert.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 12ff4120-3613-4801-8653-99c793477fbc |
| Wrangle Key | `convert.case` |
| Type | convert |
| Subtype | case |
| Variant | stock |
| Status | active |
| Tags | Convert, convert, case |

</details>
