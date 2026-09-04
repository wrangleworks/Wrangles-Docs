## Accordion

Apply a series of wrangles to the individual elements of one or more lists.

### Examples

#### Apply Convert Case to List Elements

This example applies `convert.case` to each string in a list, where the wrangle would not normally operate on the list as a whole.

##### Recipe

```yaml
wrangles:
  - accordion:
      input: list_column
      output: modified_lists
      wrangles:
        - convert.case:
            input: list_column
            output: modified_lists
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| list_column |
| --- |
| ["a", "b", "c"] |
| ["e", "f", "g"] |

</div>

<div className="ww-sample-panel">

##### Output Sample

| list_column | modified_lists |
| --- | --- |
| ["a", "b", "c"] | ["A", "B", "C"] |
| ["e", "f", "g"] | ["E", "F", "G"] |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Column or columns containing the lists whose elements will be processed. Multiple list columns must contain matching element counts. |  |  |
| output | Output | list | Yes | Columns returned to the dataframe. Columns created inside the accordion are dropped unless listed here. |  |  |
| wrangles | Wrangles | json | Yes | Wrangles to apply to each list element. |  |  |
| propagate | Propagate | list | No | Limit the columns available to the nested wrangles and replicated for each element. All columns are propagated when omitted. |  |  |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-style criteria. |  |  |
| where_params | Where Params | json | No | Values used to parameterize `where` with SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

_No defaults are documented in the legacy source._

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
| Docs Path | docs/python/recipes/wrangles/utilities.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/utilities#accordion |
| Legacy Path | docs/python/recipes/wrangles/utilities.md |
| Catalog Source | Not present in generated catalog |
| Mapping Source | Not present in generated mappings |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | Not available in generated catalog |
| Wrangle Key | `accordion` |
| Type | utility |
| Subtype |  |
| Variant | stock |
| Status | active (legacy documentation) |
| Tags | Utility, accordion |

</details>
