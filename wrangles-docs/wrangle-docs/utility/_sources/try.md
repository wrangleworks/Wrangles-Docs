## Try

Run a list of wrangles and catch errors. When `except` is provided, its wrangles or fallback column values run after an error; otherwise, the error is logged and the recipe continues.

### Examples

#### Use Fallback Wrangles After an Error

##### Recipe

```yaml
wrangles:
  - try:
      wrangles:
        - risky_wrangle:
            input: column
      except:
        - backup_wrangle:
            input: column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_The input dataframe is passed to the primary wrangles._

</div>

<div className="ww-sample-panel">

##### Output Sample

_The primary result is returned on success; the `except` result is returned after an error._

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| df | Dataframe | json | Yes | Dataframe supplied to the nested wrangles by the recipe runtime. |  |  |
| wrangles | Wrangles | json | Yes | Primary wrangles to apply. |  |  |
| except | Except | json | No | Wrangles or column/value fallbacks used after an error. When omitted, the error is logged and execution continues. |  |  |
| functions | Functions | json | No | User-defined custom functions available to the nested wrangles. |  |  |
| variables | Variables | json | No | Variables available to the nested wrangles. |  |  |
| retries | Retries | number | No | Number of times to retry after an error. |  | 0 |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "retries": 0
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

:::note
Nested wrangles can have their own access requirements.
:::

</details>

<details className="ww-field-disclosure">

<summary>Source</summary>

| Field | Value |
| --- | --- |
| Docs Path | docs/python/recipes/wrangles/utilities.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/utilities#try |
| Legacy Path | docs/python/recipes/wrangles/utilities.md |
| Catalog Source | Not present in generated catalog |
| Mapping Source | Not present in generated mappings |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | Not available in generated catalog |
| Wrangle Key | `try` |
| Type | utility |
| Subtype |  |
| Variant | stock |
| Status | active (legacy documentation) |
| Tags | Utility, try |

</details>
