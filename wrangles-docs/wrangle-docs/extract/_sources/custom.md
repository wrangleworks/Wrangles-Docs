## Custom

Extract data from the input using a DIY or bespoke extraction wrangle. Can be performed on one column or multiple columns. Requires WrangleWorks Account and Subscription.

:::info
Non-regex pattern matching extracts whole-word matches separated by word boundaries. Word boundaries include anything that is not a letter, number, or underscore.
:::

### Examples

#### Extracting Wood Types From Single Column

##### Recipe

```yaml
# One column input
wrangles:
  - extract.custom:
      input: Product
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Wood Types |
| --- | --- |
| Dining Oakwood Chair | Oakwood |
| Living Room Teakwood Frame Mirror | Teakwood |

</div>

</div>

#### Extracting Wood Types From Multiple Columns

##### Recipe

```yaml
# Multi column input
wrangles:
  - extract.custom:
      input:
      	- Part 1 of 2
        - Part 2 of 2
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Wood Types | Part 1 of 2 | Part 2 of 2 |
| --- | --- | --- |
| ['Acacia Wood', 'Imitation Wood'] | Dining Acacia Wood Table | Imitation Wood Table Chairs |

</div>

</div>

#### Using Multiple Extract Models

##### Recipe

```yaml
# Multiple Models
wrangles:
	- extract.custom:
  		input:
      	- Product
        - Product
      output:
      	- Wood Types
        - Item Type
      model_id:
      	- wood_Type_model_id
        - item_type_model_id
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product | Item Type | Wood Types |
| --- | --- | --- |
| Dining Oakwood Chair | Chair | Oakwood |
| Living Room Teakwood Frame Mirror | Mirror | Teakwood |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of input columns. |  | ["Column A", "Column B"] |
| output | Output | list | No | Name or list of output columns |  | ["Custom Output"] |
| model_id | Model Id | list | Yes | Model ID of the custom Extract Wrangle being used. |  | [] |
| case_sensitive | Case Sensitive | boolean | No | Allows the wrangle to be case sensitive if set to True, default is False. |  | false |
| extract_raw | Extract Raw | boolean | No | Extract the raw data from the wrangle |  | false |
| first_element | First Element | boolean | No | Get the first element from results |  | false |
| sort | Sort | select | No | Sort the results | training_order, input_order, longest, shortest, alphabetical, reverse_alphabetical, ascending, descending | "" |
| use_labels | Use Labels | boolean | No | Use Labels in the extract output \{label: value\} |  | false |
| use_spellcheck | Use Spellcheck | boolean | No | Use spellcheck to correct spelling mistakes in the input. |  | false |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "sort": "",
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Custom Output"
  ],
  "model_id": [],
  "use_labels": false,
  "extract_raw": false,
  "first_element": false,
  "case_sensitive": false,
  "use_spellcheck": false
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
| ID | e8e96b76-86bf-41dc-8d16-825dcff9688b |
| Wrangle Key | `extract.custom` |
| Type | extract |
| Subtype | custom |
| Variant | stock |
| Status | active |
| Tags | Extract, extract, custom |

</details>
