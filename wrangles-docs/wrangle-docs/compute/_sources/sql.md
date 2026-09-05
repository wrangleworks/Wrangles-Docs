## SQL

Apply a SQL command to the current dataframe. Only `SELECT` statements are supported; the result becomes the output. The current table is called `df`.

:::info
SQL does not currently work with objects. If your table contains objects, use `convert.to_json` before using SQL. SQL is not compatible with `where` filtering.
:::

### Examples

#### Selecting a Subset of Data

##### Recipe

```yaml
wrangles:
  - sql:
      command: |
        SELECT header1, header2
        FROM df
        WHERE header1 >= 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| header1 | header2 | header3 |
| --- | --- | --- |
| 1 | a | x |
| 2 | b | y |
| 3 | c | z |

</div>

<div className="ww-sample-panel">

##### Output Sample

| header1 | header2 |
| --- | --- |
| 2 | b |
| 3 | c |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| command | Command | text | Yes | SQL command. The table is called `df`. For specific SQL syntax, this uses the SQLite dialect. |  | "" |
| params | Params | json | No | Variables to use in conjunction with the SQL command. |  | "" |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "params": "",
  "command": ""
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
| ID | 467a06b1-a697-4d31-8061-7d83a719fd79 |
| Wrangle Key | `sql` |
| Type | compute |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Compute, sql |

</details>
