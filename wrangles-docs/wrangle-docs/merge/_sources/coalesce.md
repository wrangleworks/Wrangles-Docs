## Coalesce

Take the first non-empty value from a series of columns.

### Examples

#### Coalescing 3 Columns

##### Recipe

```yaml
wrangles:
  - merge.coalesce:
      input:
        - Col1
        - Col2
        - Col3
      output: Output Col
      where: Col2 = E
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |
| D | E | F |
| G | H | I |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 | Col3 | Output Col |
| --- | --- | --- | --- |
| A | B | C |  |
| D | E | F | D |
| G | H | I |  |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | List of input columns. |  | ["Column A", "Column B"] |
| output | Output | text | Yes | Name of the output column. |  | "Coalesce Output" |
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
  "output": "Coalesce Output"
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
| ID | 25c1a60d-fa48-4b9a-8c03-0921d5b31049 |
| Wrangle Key | `merge.coalesce` |
| Type | merge |
| Subtype | coalesce |
| Variant | stock |
| Status | active |
| Tags | Merge, merge, coalesce |

</details>
