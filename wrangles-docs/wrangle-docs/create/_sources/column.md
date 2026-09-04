## Column

Create column(s) with a user defined value. Defaults to `None` (empty). If you need to copy an existing column, use the copy wrangle instead.

### Examples

#### Creating a New Column

##### Recipe

```yaml
wrangles:
  - create.column:
      output: New Column
      value: new value			# Optional, otherwise empty
      where: column > 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column |
| --- | --- |
| 1 |  |
| 2 | new value |
| 3 | new value |

</div>

</div>

#### Creating Multiple Columns

##### Recipe

```yaml
wrangles:
  - create.column:
      output: 
      	- New Column 1: new value 1 # Optional, otherwise empty
        - New Column 2: new value 2
        - New Column 3: new value 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column 1 | New Column 2 | New Column 3 |
| --- | --- | --- | --- |
| 1 | new value 1 | new value 2 | new value 1 |
| 2 | new value 1 | new value 2 | new value 1 |
| 3 | new value 1 | new value 2 | new value 1 |

</div>

</div>

#### Creating Columns That Consist of Lists

##### Recipe

```yaml
wrangles:
  - create.column:
      output: 
      	- New Column: 
        		- 4
            - 5
        		- 6
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column |
| --- | --- |
| 1 | [4, 5, 6] |
| 2 | [4, 5, 6] |
| 3 | [4, 5, 6] |

</div>

</div>

Columns of empty lists can also be created by passing an empty list (`[]`) as the column value.

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| output | Output | list | Yes | Name or list of names of new columns or column_name: value pairs. |  | ["Column Output"] |
| value | Value | boolean | No | Value(s) to add in the new column(s). If using a dictionary in `output`, `value` can only be a string. |  | false |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "value": false,
  "output": [
    "Column Output"
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
| Docs Path | docs/python/recipes/wrangles/create.md |
| Docs URL | /python/recipes/wrangles/create |
| Legacy Path | docs/python/recipes/wrangles/create.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 5a18e2c8-ec7c-45f5-88fd-bb5c358a8b40 |
| Wrangle Key | `create.column` |
| Type | create |
| Subtype | column |
| Variant | stock |
| Status | active |
| Tags | Create, create, column |

</details>
