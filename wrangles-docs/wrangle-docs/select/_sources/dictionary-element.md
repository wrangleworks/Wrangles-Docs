## Dictionary Element

Select one or more element of a dictionary.

### Examples

#### Selecting Dictionary Element Using Where

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Shapes
      element: shapes
      default: square
      where: Part Number = 1234
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Properties | Part Number |
| --- | --- |
| \{'colours': ['red', 'white', 'blue'], 'shapes': 'round', 'materials': 'tungsten'\} | 1234 |
| \{'colours': ['green', 'yellow', 'orange'], 'shapes': 'square', 'materials': 'tungsten'\} | 5678 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Shapes |
| --- |
| round |
|  |

</div>

</div>

#### Selecting Multiple Dictionary Elements

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      element:
        - shapes
        - materials
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Properties |
| --- |
| \{'colours': ['red', 'white', 'blue'], 'shapes': 'round', 'materials': 'tungsten'\} |
| \{'colours': ['green', 'yellow', 'orange'], 'shapes': 'square', 'materials': 'tungsten'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Properties |
| --- |
| \{'shapes': 'round', 'materials': 'tungsten'\} |
| \{'shapes': 'square', 'materials': 'tungsten'\} |

</div>

</div>

#### Selecting Multiple Dictionary Elements Using a Wildcard

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - Col*
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Other3': 'C'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Col1': 'A', 'Col2': 'B'\} |

</div>

</div>

#### Selecting Multiple Dictionary Elements Using Regex

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - "regex: .*2"
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

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Col2': 'B'\} |

</div>

</div>

#### Selecting Elements While Renaming

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
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

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Column 1': 'A', 'Column 2': 'B'\} |

</div>

</div>

#### Using Default to Fill Missing Elements

##### Recipe

```yaml
wrangles:
  - select.dictionary_element:
      input: Properties
      output: Output Dict
      element:
        - Col1
        - Col3
      default:
        Col1: Z
        Col3: Y
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Column |
| --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} |
| \{'Col1': 'D', 'Col2': 'E'\} |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Column | Output Dict |
| --- | --- |
| \{'Col1': 'A', 'Col2': 'B', 'Col3': 'C'\} | \{'Col1': 'A', 'Col3': 'C'\} |
| \{'Col1': 'D', 'Col2': 'E'\} | \{'Col1': 'D', 'Col3': 'Y'\} |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | Yes | Name of the input column |  | ["Column A", "Column B"] |
| output | Output | list | No | Name of the output column. If omitted, the input column will be replaced. |  | ["Dictionary Element Output"] |
| element | Element | list | Yes | The key or keys from the dictionary to select. |  | [] |
| default | Default | boolean | No | Set the default value to return if the specified element doesn't exist. |  | false |
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
    "Dictionary Element Output"
  ],
  "default": false,
  "element": []
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
| Docs Path | docs/python/recipes/wrangles/select.md |
| Docs URL | https://wrangles.io/python/recipes/wrangles/select |
| Legacy Path | docs/python/recipes/wrangles/select.md |
| Catalog Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleCatalog.generated.js |
| Mapping Source | wrangles-docs/src/components/WrangleFlowPlayground/wrangleMappings.json |

</details>

<details className="ww-field-disclosure">

<summary>Metadata</summary>

| Field | Value |
| --- | --- |
| ID | 5adaeada-6da8-464f-84cb-9fb5ecc17e48 |
| Wrangle Key | `select.dictionary_element` |
| Type | select |
| Subtype | dictionary_element |
| Variant | stock |
| Status | active |
| Tags | Select, select, dictionary_element |

</details>
