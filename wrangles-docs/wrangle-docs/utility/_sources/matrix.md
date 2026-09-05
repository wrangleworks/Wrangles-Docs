## Matrix

Apply a matrix of wrangles to the dataframe. Each wrangle runs for the configured combinations of variables, including recipe variables and variables declared by the `variables` parameter.

See the [Matrix connector](/python/connectors/matrix) for the connector equivalent.

### Examples

#### Use Hardcoded Variables

Run a custom function once for each configured variable value.

##### Recipe

```yaml
wrangles:
  - matrix:
      variables:
        var: [A, B, C]
      wrangles:
        - custom.test_fn:
            input: Part Code
            output: Part Code ${var}
            value: ${var}
```

```python
def test_fn(part_code, value):
    return part_code + value
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Part Code |
| --- |
| 6202 |
| br549 |
| 554-114 |
| 554-112 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Part Code | Part Code A | Part Code B | Part Code C |
| --- | --- | --- | --- |
| 6202 | 6202A | 6202B | 6202C |
| br549 | br549A | br549B | br549C |
| 554-114 | 554-114A | 554-114B | 554-114C |
| 554-112 | 554-112A | 554-112B | 554-112C |

</div>

</div>

#### Use Unique Variables Per Row

This example runs `extract.custom` once for each unique model ID.

##### Recipe

```yaml
wrangles:
  - matrix:
      variables:
        model_id: set(Model ID)
      wrangles:
        - extract.custom:
            input: Description
            output: Extracted Values
            model_id: ${model_id}
            where: "[Model ID] = ?"
            where_params:
              - ${model_id}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Description | Model ID |
| --- | --- |
| The SKF 6202 bearing is the best bearing in the world | xxxxxxxx-xxxx-xxxx |
| The Timken 6102 bearing is indestructible | yyyyyyyy-yyyy-yyyy |
| The Milwaukee impact has 1200ft-lbs of torque | zzzzzzzz-zzzz-zzzz |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Description | Model ID | Extracted Values |
| --- | --- | --- |
| The SKF 6202 bearing is the best bearing in the world | xxxxxxxx-xxxx-xxxx | 6202 |
| The Timken 6102 bearing is indestructible | yyyyyyyy-yyyy-yyyy | indestructible |
| The Milwaukee impact has 1200ft-lbs of torque | zzzzzzzz-zzzz-zzzz | 1200ft-lbs |

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
| variables | Variables | json | Yes | Variable names and the values passed to nested wrangles. |  |  |
| wrangles | Wrangles | json | Yes | Wrangles to run for each variable combination. |  |  |
| functions | Functions | json | No | User-defined custom functions available to nested wrangles. |  |  |
| strategy | Strategy | select | No | How multiple variables are combined. `loop` repeats shorter lists until the longest completes; `permutations` uses every combination. | loop, permutations | loop |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "strategy": "loop"
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
| Docs URL | https://wrangles.io/python/recipes/wrangles/utilities#matrix |
| Legacy Path | docs/python/recipes/wrangles/utilities.md |
| Catalog Source | Not present in generated catalog |
| Mapping Source | Not present in generated mappings |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | Not available in generated catalog |
| Wrangle Key | `matrix` |
| Type | utility |
| Subtype |  |
| Variant | stock |
| Status | active (legacy documentation) |
| Tags | Utility, matrix |

</details>
