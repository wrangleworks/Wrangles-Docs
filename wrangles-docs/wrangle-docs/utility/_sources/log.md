## Log

Print the current status of the dataframe. Only a sample of rows is logged.

### Examples

#### Logging All Columns to Terminal

##### Recipe

```yaml
wrangles:
  - log: {}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Logging Specific Columns to Terminal

##### Recipe

```yaml
wrangles:
  - log:
      columns:
        - column1
        - column2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Logging to a File

##### Recipe

```yaml
wrangles:
  - log:
      write:
        - file:
            name: output/filepath
            columns:
              - column 1
              - column 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Native Variables

| Variable | Function |
| --- | --- |
| `${column_count}` | Number of columns. |
| `${columns}` | List of all columns. |
| `${df}` | Current dataframe. |
| `${row_count}` | Number of visible rows processed in each batch. |

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| columns | Columns | list | No | List of specific columns to log. Defaults to all columns. |  | ["Column A", "Column B"] |
| write | Write | list | No | Allows an intermediate output to a file, dataframe, database, etc. |  | [] |
| error | Error | text | No | Log an error to the console. |  | "" |
| warning | Warning | text | No | Log a warning to the console. |  | "" |
| info | Info | text | No | Log info to the console. |  | "" |
| log_data | Log Data | boolean | No | Whether to log a sample of the dataframe contents. Default true. |  | false |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "info": "",
  "error": "",
  "write": [],
  "columns": [
    "Column A",
    "Column B"
  ],
  "warning": "",
  "log_data": false
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
| Docs Path | docs/python/recipes/wrangles/utilities.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/utilities |
| Legacy Path | docs/python/recipes/wrangles/utilities.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 6177808e-aa2d-4d0b-8385-858b16948a5d |
| Wrangle Key | `log` |
| Type | utility |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Utility, log |

</details>
