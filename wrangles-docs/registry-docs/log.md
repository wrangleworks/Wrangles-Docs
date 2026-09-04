---
title: "Log"
description: "Log the current status of the dataframe."
sidebar_label: "Log"
slug: "/log"
---

# Log

Log the current status of the dataframe.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `columns` | No | array, null | (Optional, default all columns) List of specific columns to log. | `null` |
| `write` | No | array, null | (Optional) Allows for an intermediate output to a file/dataframe/database etc. | `null` |
| `warning` | No | string, null | Log a warning to the console. | `null` |
| `info` | No | string, null | Log info to the console. | `null` |
| `log_data` | No | boolean, null | Whether to log a sample of the contents of the dataframe. Default True if not logging to a write, error, warning or info. Default False otherwise. | `null` |
| `error` | No | string | Log an error to the console. | — |
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

Print the current status of the dataframe. Only a sample of rows is logged.

## Migrated examples
#### Logging All Columns to Terminal

##### Recipe

```yaml
wrangles:
  - log: {}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Logging Specific Columns to Terminal

##### Recipe

```yaml
wrangles:
  - log:
      columns:
        - column1
        - column2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Logging to a File

##### Recipe

```yaml
wrangles:
  - log:
      write:
        - file:
            name: output/filepath
            columns:
              - column 1
              - column 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel">

##### Output Sample

_Logs a sample of rows or status information to the configured destination._

</div>

</div>

#### Native Variables

| Variable | Function |
| --- | --- |
| `${column_count}` | Number of columns. |
| `${columns}` | List of all columns. |
| `${df}` | Current dataframe. |
| `${row_count}` | Number of visible rows processed in each batch. |

## Provenance

- [WranglesPY log implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing log Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/utility/_sources/log.md)

## Registry metadata

- Registry ID: `6177808e-aa2d-4d0b-8385-858b16948a5d`
- Namespace: root-level runtime key
- Recipe key: `log`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.log`
- Status: `active`
- Registry version: `0.1.0-pilot`
