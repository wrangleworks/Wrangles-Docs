## Index

Create a new incremental index.

### Examples

#### Creating a New Index Column

##### Recipe

```yaml
wrangles:
  - create.index:
      output: New Index
      start: 1    # optional
      step: 1     # optional
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

| New Index |
| --- |
| 1 |
| 2 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| by | By | list | No | Optional. Cluster the created indexes by one or more columns |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name or list of names of new columns |  | ["Index Output"] |
| start | Start | number | No | (Optional; default 1) Starting number for the index |  | "" |
| step | Step | number | No | Step to increment from one row to the next. Defaults to 1. |  | "" |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "by": [
    "Column A",
    "Column B"
  ],
  "step": "",
  "start": "",
  "output": [
    "Index Output"
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
| ID | 0a4909ca-6e14-4da7-8a70-a7fd106d6944 |
| Wrangle Key | `create.index` |
| Type | create |
| Subtype | index |
| Variant | stock |
| Status | active |
| Tags | Create, create, index |

</details>
