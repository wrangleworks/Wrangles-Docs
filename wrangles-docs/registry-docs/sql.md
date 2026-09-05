---
title: "SQL"
description: "Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output."
sidebar_label: "SQL"
slug: "/sql"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# SQL

Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output.

Apply a SQL command to the current dataframe. Only `SELECT` statements are supported; the result becomes the output. The current table is called `df`.

:::info
SQL does not currently work with objects. If your table contains objects, use `convert.to_json` before using SQL. SQL is not compatible with `where` filtering.
:::

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `command` | SQL Command. The table is called df. For specific SQL syntax, this uses the SQLite dialect. | string | — | Yes |
| `params` | Variables to use in conjunctions with query. This allows the query to be parameterized. This uses sqlite syntax (? or :name). | array, object, null | `null` | No |
| `preserve_data_types` | Preserve Data Types value accepted by the runtime. | boolean | `true` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `preserve_index` | Preserve Index value accepted by the runtime. | boolean | `false` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - sql:
      command: |
        SELECT header1, header2
        FROM df
        WHERE header1 >= 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| header1 | header2 | header3 |
| --- | --- | --- |
| 1 | a | x |
| 2 | b | y |
| 3 | c | z |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| header1 | header2 |
| --- | --- |
| 2 | b |
| 3 | c |

</div>

</div>

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
| Recipe key | `sql` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `compute` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.sql` |

**Sources**

- [WranglesPY sql implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing sql Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/sql.md)

</details>
