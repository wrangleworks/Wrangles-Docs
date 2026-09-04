## Lists

Take lists in multiple columns and merge them to a single list.

### Examples

#### Merging Two Lists

##### Recipe

```yaml
wrangles:
  - merge.lists:
      input:
        - col1
        - col2
      output: Combined Col
      remove_duplicates: false
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 |
| --- | --- |
| ['A', 'B'] | ['D', 'E'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Combined Col |
| --- |
| ['A', 'B', 'D', 'E'] |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | List of input columns. |  | ["Column A", "Column B"] |
| output | Output | text | Yes | Name of the output column. |  | "Lists Output" |
| ignore_case | Ignore Case | boolean | No | Ignore case when removing duplicates. |  | false |
| include_empty | Include Empty | boolean | No | Whether to include empty values in the created list. |  | false |
| remove_duplicates | Remove Duplicates | boolean | No | Whether to remove duplicates from the created list, defaults to false. |  | false |
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
  "output": "Lists Output",
  "ignore_case": false,
  "include_empty": false,
  "remove_duplicates": false
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
| Docs Path | docs/python/recipes/wrangles/merge.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/merge |
| Legacy Path | docs/python/recipes/wrangles/merge.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | d9978f00-b3d4-4583-884e-a53b98a43e9a |
| Wrangle Key | `merge.lists` |
| Type | merge |
| Subtype | lists |
| Variant | stock |
| Status | active |
| Tags | Merge, merge, lists |

</details>
