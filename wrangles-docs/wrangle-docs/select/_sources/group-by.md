## Group By

Group and aggregate the data

### Examples

#### Grouping By One Column

##### Recipe

```yaml
wrangles:
  - select.group_by:
      by: 
        - Product Type
      sum: Quanitity
      mean: Price ($)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Product | Quantity | Price ($) | Product Type |
| --- | --- | --- | --- |
| Hammer | 3 | 12.99 | Hand Tools |
| Ratchet Wrench | 12 | 6.99 | Hand Tools |
| Cordless Drill | 2 | 49.99 | Power Tools |
| Reciprocating Saw | 7 | 29.99 | Power Tools |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Type | Quantity.sum | Price ($).mean |
| --- | --- | --- |
| Hand Tools | 15 | 9.99 |
| Power Tools | 9 | 39.99 |

</div>

</div>

#### Grouping With Custom Function Aggregation

##### Recipe

```yaml
wrangles:
  - select.group_by:
      by: Category
      custom.sum_times_two: Quantity
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Category | Quantity |
| --- | --- |
| Hand Tools | 3 |
| Hand Tools | 1 |
| Hand Tools | 2 |
| Power Tools | 4 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Category | Quantity.sum_times_two |
| --- | --- |
| Hand Tools | 12 |
| Power Tools | 4 |

</div>

</div>

### Parameters

| Parameter | Label | UI Type | Required | Description | Allowed Values | Default |
| --- | --- | --- | --- | --- | --- | --- |
| by | By | list | No | List of the input columns to group on |  | ["Column A", "Column B"] |
| all | All | list | No | Return true if all of the values for these column(s) are true |  | [] |
| any | Any | list | No | Return true if any of the values for these column(s) are true |  | [] |
| auto_rename_columns | Auto Rename Columns | boolean | No | If true (default), aggregated column names include the operation as a suffix (e.g. Value.sum). If false, column names are left as-is; use a dictionary entry to supply a custom output name (e.g. - Value: Total). |  | false |
| count | Count | list | No | The count of values for these column(s) |  | [] |
| custom.placeholder | Custom Placeholder | list | No | Placeholder for custom functions. Replace 'placeholder' with the name of the function. |  | [] |
| if | If | text | No | A condition that determines whether the action runs as a whole. |  |  |
| first | First | list | No | The first value for these column(s) |  | [] |
| last | Last | list | No | The last value for these column(s) |  | [] |
| list | List | list | No | Group and return all values for these column(s) as a list |  | [] |
| max | Max | list | No | The maximum value for these column(s) |  | [] |
| mean | Mean | list | No | The mean (average) value for these column(s) |  | [] |
| median | Median | list | No | The median value for these column(s) |  | [] |
| min | Min | list | No | The minimum value for these column(s) |  | [] |
| nunique | Nunique | list | No | The count of unique values for these column(s) |  | [] |
| p75 | P75 | list | No | Get a percentile. Note, you can use any integer here for the corresponding percentile. |  | [] |
| std | Std | list | No | The standard deviation of values for these column(s) |  | [] |
| sum | Sum | list | No | The total of values for these column(s) |  | [] |

### Defaults

```json
{
  "by": [
    "Column A",
    "Column B"
  ],
  "all": [],
  "any": [],
  "max": [],
  "min": [],
  "p75": [],
  "std": [],
  "sum": [],
  "last": [],
  "list": [],
  "mean": [],
  "count": [],
  "first": [],
  "median": [],
  "nunique": [],
  "custom.placeholder": [],
  "auto_rename_columns": false
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
| ID | c0af10b1-423a-416c-8cb5-7e7fe1164964 |
| Wrangle Key | `select.group_by` |
| Type | select |
| Subtype | group_by |
| Variant | stock |
| Status | active |
| Tags | Select, select, group_by |

</details>
