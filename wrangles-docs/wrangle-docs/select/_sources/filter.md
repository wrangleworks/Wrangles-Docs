## Filter

Filter the dataframe based on the contents.

### Examples

#### Filtering a Column

##### Recipe

```yaml
wrangles:
  # Select only red fruits
  - filter:
      input: Color
      equal:
        - red
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Color | Fruit |
| --- | --- |
| red | Apple |
| green | Apple |
| orange | Orange |
| red | Strawberry |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Color | Fruit |
| --- | --- |
| red | Apple |
| red | Strawberry |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| input | Input | list | No | Name of the column to filter on. |  | ["Column A", "Column B"] |
| between | Between | list | No | Value or list of values to filter that are in between two parameter values |  | [] |
| contains | Contains | text | No | Select rows where the input contains the value. Allows regular expressions. |  | "" |
| equal | Equal | boolean | No | Select rows where the values equal a given value. |  | false |
| greater_than | Greater Than | number | No | Select rows where the values are greater than a specified value. Does include the value itself. |  | "" |
| greater_than_equal_to | Greater Than Equal To | number | No | Select rows where the values are greater than a specified value. Does include the value itself. |  | "" |
| is_in | Is In | list | No | Select rows where the values are in a given list. |  | [] |
| is_null | Is Null | boolean | No | If true, select all rows where the value is NULL. If false, where is not NULL. |  | false |
| less_than | Less Than | number | No | Select rows where the values are less than a specified value. Does not include the value itself. |  | "" |
| less_than_equal_to | Less Than Equal To | number | No | Select rows where the values are less than a specified value. Does include the value itself. |  | "" |
| not_contains | Not Contains | text | No | Select rows where the input does not contain the value. Allows regular expressions. |  | "" |
| not_equal | Not Equal | boolean | No | Select rows where the values do not equal a given value. |  | false |
| not_in | Not In | list | No | Select rows where the values are not in a given list. |  | [] |
| where | Where | text | No | Use a SQL `WHERE` clause to filter the data. `input` must be used if `where` is not provided. Prefer using `where` independently of all other parameters except `where_params`. |  | "" |
| where_params | Where Params | json | No | Variables to use with `where` so the query can be parameterized. Uses SQLite syntax (`?` or `:name`). |  | [] |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |

### Defaults

```json
{
  "equal": false,
  "input": [
    "Column A",
    "Column B"
  ],
  "is_in": [],
  "not_in": [],
  "between": [],
  "is_null": false,
  "contains": "",
  "less_than": "",
  "not_equal": false,
  "greater_than": "",
  "not_contains": "",
  "less_than_equal_to": "",
  "greater_than_equal_to": ""
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
| ID | e3242acf-d204-433f-8373-205b77481131 |
| Wrangle Key | `filter` |
| Type | select |
| Subtype |  |
| Variant | stock |
| Status | active |
| Tags | Select, filter |

</details>
