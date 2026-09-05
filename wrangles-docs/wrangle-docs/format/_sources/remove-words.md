## Remove Words

Remove all the elements that occur in one list from another.

### Examples

#### Removing Words From a Column

##### Recipe

```yaml
wrangles:
   - remove_words:
        input: Description
        to_remove: # To Remove columns must be list
          - Materials
          - Colours
        output: Product
        tokenize_to_remove: True
        ignore_case: False
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Colours | Materials | Description |
| --- | --- | --- |
| ['Blue'] | ['Steel'] | Steel Blue Bottle |
| ['Blue'] | ['Steel'] | ['Steel', 'Blue', 'Bottle'] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product |
| --- |
| Bottle |
| Bottle |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of column to remove words from |  | ["Column A", "Column B"] |
| output | Output | list | No | If omitted, overwrites input. |  | ["Remove Words Output"] |
| to_remove | To Remove | list | Yes | Column or list of columns with a list of words to be removed |  | [] |
| tokenize_to_remove | Tokenize To Remove | boolean | No | Tokenize all `to_remove` inputs, defaults to false. |  | false |
| ignore_case | Ignore Case | boolean | No | Ignore input and `to_remove` case, defaults to true. |  | false |
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
    "Remove Words Output"
  ],
  "to_remove": [],
  "ignore_case": false,
  "tokenize_to_remove": false
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
| ID | 543b96c3-f354-48be-8046-bf0cb9fbaf56 |
| Wrangle Key | `remove_words` |
| Type | format |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Format, remove_words |

</details>
