## Remove Duplicates

Remove duplicate values in a list.

### Examples

#### Removing Duplicates From a List

##### Recipe

```yaml
wrangles:
    - format.remove_duplicates:
        input: Attack of the Clones
        output: Commander
        where: Rank = Commander
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Rank | Attack of the Clones |
| --- | --- |
| Commander | ['Cody', 'Cody', 'Cody'] |
| Captain | ['Rex', 'Rex', 'Rex'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Rank | Commander | Attack of the Clones |
| --- | --- | --- |
| Commander | ['Cody'] | ['Cody', 'Cody', 'Cody'] |
| Captain |  | ['Rex', 'Rex', 'Rex'] |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column. |  | ["Column A", "Column B"] |
| output | Output | list | No | If none given, overwrites input. |  | ["Remove Duplicates Output"] |
| ignore_case | Ignore Case | boolean | No | Ignore case when removing duplicates. |  | false |
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
    "Remove Duplicates Output"
  ],
  "ignore_case": false
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
| Docs Path | docs/python/recipes/wrangles/format.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/format |
| Legacy Path | docs/python/recipes/wrangles/format.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 283b9e78-b2b2-43d0-844f-9842c33120aa |
| Wrangle Key | `format.remove_duplicates` |
| Type | format |
| Subtype | remove_duplicates |
| Variant | stock |
| Status | active |
| Tags | Format, format, remove_duplicates |

</details>
