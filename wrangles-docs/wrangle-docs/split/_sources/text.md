## Text

Split text strings on certain characters. The text can be split into either multiple columns or a list.

### Examples

#### To a List

##### Recipe

```yaml
wrangles:
  - split.text:
      input: Column1
      output: Column2
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column1 |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column2 |
| --- |
| ['Hello', 'Wrangles!'] |

</div>

</div>

#### Split Using Regex

##### Recipe

```yaml
# Split on x, case insensitive.
wrangles:
  - split.text:
      input: Col1
      output: Col2
      char: 'regex:(?i)x'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col1 |
| --- |
| 1x2 |
| 1X2 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col2 |
| --- |
| ['1', '2'] |
| ['1', '2'] |

</div>

</div>

#### Slice the Output

##### Recipe

```yaml
wrangles:
  - split.text:
      input: Column1
      output: Column2
      char: ', '
      element: 0
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column1 |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column2 |
| --- |
| Hello |

</div>

</div>

#### Split to Columns (Wildcard)

##### Recipe

```yaml
wrangles:
  - split.text:
      input: Col
      output: Col*              # Optional
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col |
| --- |
| Hello, Wrangles! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 |
| --- | --- |
| Hello | Wrangles! |

</div>

</div>

#### Split to Columns (Named)

##### Recipe

```yaml
wrangles:
  - split.text:
      input: Col
      output:
        - Col 1
        - Col 2
        - Col 3
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Col |
| --- |
| Wrangles, are, Cool! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col 1 | Col 2 | Col 3 |
| --- | --- | --- |
| Wrangles | are | Cool! |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | text | Yes | Name of the column to split. |  | "Column A" |
| output | Output | list | No | Name of the output column(s). If a single column is provided, results are returned as a list. If multiple columns are listed, results are separated into columns. If omitted, overwrites input. Allows a wildcard (`*`) to name output columns with incrementing numbers. |  | ["Text Output"] |
| char | Char | text | No | Character(s) to split on. Default comma (`,`). Prefix with `regex:` to split on a pattern. |  | "" |
| element | Element | text | No | Select specific elements or ranges after splitting. Accepts Python slicing syntax. |  | "" |
| inclusive | Inclusive | boolean | No | If true, include the split character in the output. Default false. |  | false |
| pad | Pad | boolean | No | Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists. |  | false |
| skip_empty | Skip Empty | boolean | No | Whether to skip empty values, defaults to false. |  | false |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "pad": false,
  "char": "",
  "input": "Column A",
  "output": [
    "Text Output"
  ],
  "element": "",
  "inclusive": false,
  "skip_empty": false
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
| Docs Path | docs/python/recipes/wrangles/split.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/split |
| Legacy Path | docs/python/recipes/wrangles/split.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | e76e43f7-d129-4bf8-87b4-a304a378b130 |
| Wrangle Key | `split.text` |
| Type | split |
| Subtype | text |
| Variant | stock |
| Status | active |
| Tags | Split, split, text |

</details>
