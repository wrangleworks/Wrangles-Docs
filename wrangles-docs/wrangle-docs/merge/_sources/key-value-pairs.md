## Key Value Pairs

Create a dictionary from keys and values in paired columns.

### Examples

#### Using Named Columns

##### Recipe

```yaml
wrangles:
  - merge.key_value_pairs:
      input:
        Letter: Number
      output: Pairs
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Letter | Number |
| --- | --- |
| A | 1 |
| B | 2 |
| C | 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Pairs |
| --- |
| \{'A': 1\} |
| \{'B': 2\} |
| \{'C': 3\} |

</div>

</div>

#### Using a wildcard (*)

##### Recipe

```yaml
# Using a Wildcard (*)
wrangles:
  - merge.key_value_pairs:
      input:
        key*: value*
      output: Object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| key 1 | key 2 | value 1 | value 2 |
| --- | --- | --- | --- |
| A | One | a | First |
| B | Two | b | Second |
| C | three | c | Third |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Object |
| --- |
| \{'A': 'a', 'One': 'First'\} |
| \{'B': 'b', 'Two': 'Second'\} |
| \{'C': 'c', 'three': 'Third'\} |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | text | Yes | Matched pairs of key and value columns. |  | "Column A" |
| output | Output | text | Yes | Name of the output column. |  | "Key Value Pairs Output" |
| skip_empty | Skip Empty | boolean | No | Whether to skip empty values, defaults to false. |  | false |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": "Column A",
  "output": "Key Value Pairs Output",
  "skip_empty": false
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
| ID | 8a2cd37c-8ef7-4b05-8264-36512f5dd837 |
| Wrangle Key | `merge.key_value_pairs` |
| Type | merge |
| Subtype | key_value_pairs |
| Variant | stock |
| Status | active |
| Tags | Merge, merge, key_value_pairs |

</details>
