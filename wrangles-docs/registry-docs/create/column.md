---
title: "Column"
description: "Create column(s) with a user defined value. Defaults to None (empty)."
sidebar_label: "Column"
slug: "/create/column"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Column

Create column(s) with a user defined value. Defaults to None (empty).

Create column(s) with a user defined value. Defaults to `None` (empty). If you need to copy an existing column, use the copy wrangle instead.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns or column_name: value pairs. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `value` | (Optional) Value(s) to add in the new column(s). If using a dictionary in output, value can only be a string. | string, number, object, array, boolean, null | `null` | No |
| `value_if_exists` | Determines behaviour when the output column already exists. existing (default): leave the column unchanged. coalesce: fill empty/null cells with the new value, keeping non-null cells. new: overwrite the entire column with the new value. | string; one of:<ul className="ww-param-enum-values"><li>existing</li><li>coalesce</li><li>new</li></ul> | `"existing"` | No |
| `coalesce_value` | Only used when value_if_exists is coalesce. Determines which side is preferred when both the existing and new values are non-empty. existing (default): keep the existing value, only fill empty/null cells with the new value. new: keep the new value, only fall back to the existing value where the new value is empty/null. | string; one of:<ul className="ww-param-enum-values"><li>existing</li><li>new</li></ul> | `"existing"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - create.column:
      output: New Column
      value: new value      # Optional, otherwise empty
      where: column > 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Column |
| --- |
|  |
| new value |
| new value |

</div>

</div>





```yaml
wrangles:
  - create.column:
      output:
        - New Column 1: new value 1 # Optional, otherwise empty
        - New Column 2: new value 2
        - New Column 3: new value 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Column 1 | New Column 2 | New Column 3 |
| --- | --- | --- |
| new value 1 | new value 2 | new value 1 |
| new value 1 | new value 2 | new value 1 |
| new value 1 | new value 2 | new value 1 |

</div>

</div>





```yaml
wrangles:
  - create.column:
      output:
        - New Column:
            - 4
            - 5
            - 6
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Column |
| --- |
| [4, 5, 6] |
| [4, 5, 6] |
| [4, 5, 6] |

</div>

</div>

Columns of empty lists can also be created by passing an empty list (`[]`) as the column value.

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | No |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | `create.column` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.column` |

**Sources**

- [WranglesPY create.column implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.column Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/column.md)

</details>
