## Python

The Python wrangle executes simple Python commands inline within a recipe. Row values are referenced by column name and commands are evaluated once per row. Spaces within column names are replaced by underscores (`_`). All columns are also available as a dictionary named `kwargs`. For more complex Python, use custom functions.

:::caution
This wrangle evaluates the Python command. Be cautious when including variables from untrusted sources in the command string.
:::

### Examples

#### Python Wrangle

##### Recipe

```yaml
wrangles:
  - python:
      output: result
      command: My_Column.upper()
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| My Column |
| --- |
| example text |

</div>

<div className="ww-sample-panel">

##### Output Sample

| My Column | result |
| --- | --- |
| example text | EXAMPLE TEXT |

</div>

</div>

#### Including Your Own Parameters

The Python wrangle supports parameters so values of unknown origin can be injected safely.

##### Recipe

```yaml
wrangles:
  - python:
      output: sliced
      command: input_column[:i]
      i: ${var}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_No sample available._

</div>

<div className="ww-sample-panel">

##### Output Sample

_No sample available._

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | No | Name or list of input columns to filter the data available to the command. Useful with `kwargs` to target a variable range of columns. |  | ["Column A", "Column B"] |
| output | Output | list | Yes | Name or list of output columns. To output multiple columns, return a list of the corresponding length. |  | ["Python Output"] |
| command | Command | text | Yes | Python command. This must return a value. |  | "" |
| if | If | text | No | Condition that determines whether the action runs as a whole. |  |  |
| except | Except | boolean | No | Value to return for the row if an exception occurs. If omitted, exceptions are raised normally. If multiple output columns are specified, this must match the output length. |  | false |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "except": false,
  "output": [
    "Python Output"
  ],
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
| ID | c0398a11-7731-4e47-8df0-b07eea0b1d6c |
| Wrangle Key | `python` |
| Type | compute |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Compute, python |

</details>
