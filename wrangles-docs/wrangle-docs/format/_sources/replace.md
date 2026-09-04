## Replace

Quick find and replace for simple values. Can use regex in the `find` field.

:::note
Values that are not a number or a string pass through unaltered.
:::

### Examples

#### Replacing an Abbreviation

##### Recipe

```yaml
wrangles:
  - replace:
      input: Product Data
      find: brg
      replace: bearing
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data |
| --- |
| SKF ball bearing |
| bearing seal |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of input columns. |  | ["Column A", "Column B"] |
| output | Output | list | No | Overwrites input if none given. |  | ["Replace Output"] |
| find | Find | text | Yes | String or regex pattern to find. |  | "" |
| replace | Replace | text | Yes | Value to replace the string or regex pattern. |  | "" |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "find": "",
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Replace Output"
  ],
  "replace": ""
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
| ID | f0ab715e-9e0e-4614-83e4-5cd8ea08a09f |
| Wrangle Key | `replace` |
| Type | format |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Format, replace |

</details>
