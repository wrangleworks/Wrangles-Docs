## Dictionary

Split a dictionary into columns. The dictionary keys are used as the new column headers.

### Examples

#### Splitting an Entire Dictionary

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      # Output not required
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

</div>

#### Choosing Specific Keys by Name

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: Col2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col2 |
| --- |
| B |

</div>

</div>

#### Using a Wildcard Output to Choose Specific Keys

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: Col*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Other': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col1 | Col2 |
| --- | --- |
| A | B |

</div>

</div>

#### Using Regular Expressions to Choose Specific Keys

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output: "regex: .*3"
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Col3 |
| --- |
| C |

</div>

</div>

#### Choosing Specific Keys While Renaming the Output

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output:
        - Col1: Column 1
        - Col2: Column 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column 1 | Column 2 |
| --- | --- |
| A | B |

</div>

</div>

#### Using a Wildcard While Renaming

##### Recipe

```yaml
wrangles:
  - split.dictionary:
      input: Column
      output:
        - Col*: Column *
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| A | B | C |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name or list of columns containing dictionaries to split. If providing multiple dictionaries and they contain overlapping values, the last value is returned. |  | ["Column A", "Column B"] |
| output | Output | list | No | Optional subset of keys to extract from the dictionary. If not provided, all keys are returned. |  | ["Dictionary Output"] |
| default | Default | json | No | Provide a set of default headings and values if they are not found within the input. |  | "" |
| where | Where | text | No | Filter the data to only apply the wrangle to certain rows using SQL-style criteria, such as `column1 = 123 OR column2 = 'abc'`. |  |  |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  |  |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "input": [
    "Column A",
    "Column B"
  ],
  "output": [
    "Dictionary Output"
  ],
  "default": ""
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
| ID | 06ca98e4-d026-43f7-84eb-af246d401ba9 |
| Wrangle Key | `split.dictionary` |
| Type | split |
| Subtype | dictionary |
| Variant | stock |
| Status | active |
| Tags | Split, split, dictionary |

</details>
