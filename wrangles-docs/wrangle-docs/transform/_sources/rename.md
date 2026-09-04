## Rename

Rename a column or list of columns.

### Examples

:::note
Rename is not compatible with `where` filtering.
:::

#### Renaming Columns With Input and Output

##### Recipe

```yaml
wrangles:
  - rename:
      input:
        - Manufacturer Name
        - Manufacturer Part Number
      output:
        - Manufacturer
        - MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

#### Renaming Columns Without Using Input and Output

##### Recipe

```yaml
wrangles:
  - rename:
      Manufacturer Name: Manufacturer
      Manufacturer Part Number: MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

#### Using Wrangles in Rename

##### Recipe

```yaml
wrangles:
  - rename:
      wrangles:
        - convert.case:
            input: columns
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| MANUFACTURER NAME | MANUFACTURER PART NUMBER |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | No | Name or list of input columns. |  | ["Column A", "Column B"] |
| output | Output | list | No | Name or list of output columns. |  | ["Rename Output"] |
| wrangles | Wrangles | list | No | Use wrangles to transform the column names. The input is named `columns` and the final result must also include the column named `columns`. This can only be used instead of the standard rename. |  | [] |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Rename Output"
  ],
  "wrangles": []
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
| ID | ab06898f-faf7-42e7-8275-5e3034a4d727 |
| Wrangle Key | `rename` |
| Type | transform |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Transform, rename |

</details>
