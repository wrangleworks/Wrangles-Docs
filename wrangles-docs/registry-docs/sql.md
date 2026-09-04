---
title: "SQL"
description: "Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output."
sidebar_label: "SQL"
slug: "/sql"
---

# SQL

Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `command` | Yes | string | SQL Command. The table is called df. For specific SQL syntax, this uses the SQLite dialect. | — |
| `params` | No | array, object, null | Variables to use in conjunctions with query. This allows the query to be parameterized. This uses sqlite syntax (? or :name). | `null` |
| `preserve_index` | No | boolean | Preserve Index value accepted by the runtime. | `false` |
| `preserve_data_types` | No | boolean | Preserve Data Types value accepted by the runtime. | `true` |
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

Apply a SQL command to the current dataframe. Only `SELECT` statements are supported; the result becomes the output. The current table is called `df`.

:::info
SQL does not currently work with objects. If your table contains objects, use `convert.to_json` before using SQL. SQL is not compatible with `where` filtering.
:::

## Migrated examples
#### Selecting a Subset of Data

##### Recipe

```yaml
wrangles:
  - sql:
      command: |
        SELECT header1, header2
        FROM df
        WHERE header1 >= 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| header1 | header2 | header3 |
| --- | --- | --- |
| 1 | a | x |
| 2 | b | y |
| 3 | c | z |

</div>

<div className="ww-sample-panel">

##### Output Sample

| header1 | header2 |
| --- | --- |
| 2 | b |
| 3 | c |

</div>

</div>

## Provenance

- [WranglesPY sql implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing sql Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/compute/_sources/sql.md)

## Registry metadata

- Registry ID: `467a06b1-a697-4d31-8061-7d83a719fd79`
- Namespace: root-level runtime key
- Recipe key: `sql`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.sql`
- Status: `active`
- Registry version: `0.1.0-pilot`
