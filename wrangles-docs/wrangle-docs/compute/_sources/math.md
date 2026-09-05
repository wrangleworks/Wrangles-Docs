## Math

Apply mathematical calculations to columns. Also called as `maths`.

:::info
Spaces within column headers are replaced with underscores automatically. Account for this when writing expressions in `input`.
:::

### Examples

#### Square Root Example

##### Recipe

```yaml
wrangles:
  - math:
      input: sqrt(Values)
      output: Square Root
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Values |
| --- |
| 4 |
| 9 |
| 16 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Values | Square Root |
| --- | --- |
| 4 | 2 |
| 9 | 3 |
| 16 | 4 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | text | Yes | Mathematical expression using column names, e.g. `column1 * column2 + column3`. |  | "Column A" |
| output | Output | text | Yes | Column to output the results to. |  | "Math Output" |
| where | Where | text | No | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` for parameterized criteria. Uses SQLite syntax such as `?` or `:name`. |  |  |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Supported Operators

| Group | Operators |
| --- | --- |
| Logical | `&`, `|`, `~` |
| Comparison | `<`, `<=`, `==`, `!=`, `>=`, `>` |
| Unary arithmetic | `-` |
| Binary arithmetic | `+`, `-`, `*`, `/`, `**`, `%`, `<<`, `>>` |

### Defaults

```json
{
  "input": "Column A",
  "output": "Math Output"
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
| ID | 494b11ad-00c1-4748-8b93-6bec982f4fec |
| Wrangle Key | `math` |
| Type | compute |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Compute, math |

</details>
