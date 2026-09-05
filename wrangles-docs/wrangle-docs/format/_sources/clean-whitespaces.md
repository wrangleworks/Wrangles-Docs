## Clean Whitespaces

Condense multiple spaces to a single space and convert special space characters to a standard space.

### Examples

#### Food Type Example

##### Recipe

```yaml
wrangles:
  - clean_whitespaces:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Products |
| --- |
| `Hello     world!` |
| `Hello     universe!` |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Products |
| --- |
| Hello world! |
| Hello universe! |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of input columns. |  | ["Column A", "Column B"] |
| output | Output | list | No | Name or list of output columns. If none given, overwrites input. |  | ["Clean Whitespaces Output"] |
| remove_literals | Remove Literals | boolean | No | Whether to remove special space characters such as new lines etc. Default True. |  | false |
| trim | Trim | boolean | No | Whether to trim leading and trailing spaces. Default True. |  | false |

### Defaults

```json
{
  "trim": false,
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Clean Whitespaces Output"
  ],
  "remove_literals": false
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
| Docs Path | docs/excel/standardize.md |
| Docs URL | https://wrangles.io/en/python/recipes/wrangles/standalone |
| Legacy Path | docs/excel/standardize.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | e36e15c4-f0ad-43f8-8555-ef683a8ab892 |
| Wrangle Key | `clean_whitespaces` |
| Type | format |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Format, clean_whitespaces |

</details>
