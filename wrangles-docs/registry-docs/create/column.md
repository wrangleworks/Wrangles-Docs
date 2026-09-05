---
title: "Column"
description: "Create column(s) with a user defined value. Defaults to None (empty)."
sidebar_label: "Column"
slug: "/create/column"
---

# Column

Create column(s) with a user defined value. Defaults to None (empty).

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `output` | Yes | string, array | Name or list of names of new columns or column_name: value pairs. | — |
| `value` | No | string, number, object, array, boolean, null | (Optional) Value(s) to add in the new column(s). If using a dictionary in output, value can only be a string. | `null` |
| `value_if_exists` | No | string; one of: existing, coalesce, new | Determines behaviour when the output column already exists. existing (default): leave the column unchanged. coalesce: fill empty/null cells with the new value, keeping non-null cells. new: overwrite the entire column with the new value. | `"existing"` |
| `coalesce_value` | No | string; one of: existing, new | Only used when value_if_exists is coalesce. Determines which side is preferred when both the existing and new values are non-empty. existing (default): keep the existing value, only fill empty/null cells with the new value. new: keep the new value, only fall back to the existing value where the new value is empty/null. | `"existing"` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

Create column(s) with a user defined value. Defaults to `None` (empty). If you need to copy an existing column, use the copy wrangle instead.

## Migrated examples
#### Creating a New Column

##### Recipe

```yaml
wrangles:
  - create.column:
      output: New Column
      value: new value      # Optional, otherwise empty
      where: column > 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column |
| --- | --- |
| 1 |  |
| 2 | new value |
| 3 | new value |

</div>

</div>

#### Creating Multiple Columns

##### Recipe

```yaml
wrangles:
  - create.column:
      output:
        - New Column 1: new value 1 # Optional, otherwise empty
        - New Column 2: new value 2
        - New Column 3: new value 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column 1 | New Column 2 | New Column 3 |
| --- | --- | --- | --- |
| 1 | new value 1 | new value 2 | new value 1 |
| 2 | new value 1 | new value 2 | new value 1 |
| 3 | new value 1 | new value 2 | new value 1 |

</div>

</div>

#### Creating Columns That Consist of Lists

##### Recipe

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

<div className="ww-sample-panel">

##### Input Sample

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| column | New Column |
| --- | --- |
| 1 | [4, 5, 6] |
| 2 | [4, 5, 6] |
| 3 | [4, 5, 6] |

</div>

</div>

Columns of empty lists can also be created by passing an empty list (`[]`) as the column value.

## Provenance

- [WranglesPY create.column implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.column Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/column.md)

## Registry metadata

- Registry ID: `5a18e2c8-ec7c-45f5-88fd-bb5c358a8b40`
- Namespace: `create`
- Recipe key: `create.column`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.create.column`
- Status: `active`
- Registry version: `0.1.0-pilot`
