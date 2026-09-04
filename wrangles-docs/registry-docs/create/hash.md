---
title: "Hash"
description: "Create a hash of a column."
sidebar_label: "Hash"
slug: "/create/hash"
---

# Hash

Create a hash of a column.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of input column. | — |
| `output` | Yes | string, array | Name of new column. | — |
| `method` | No | string; one of: md5, sha1, sha256, sha512 | The method to use to hash the input (Default: md5). | `"md5"` |
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

Create a hash of a column.

## Migrated examples
#### Creating a New Hash Column

##### Recipe

```yaml
wrangles:
  - create.hash:
      input: Description
      output: hash
      method: md5
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Description |
| --- |
| The wrench is blue |
| The hammer is yellow |

</div>

<div className="ww-sample-panel">

##### Output Sample

| New Column |
| --- |
| ce114e4501d2f4e2dcea3e17b546f339 |
| a54d88e06612d820bc3be72877c74f257b561b19 |

</div>

</div>

## Provenance

- [WranglesPY create.hash implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.hash Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/hash.md)

## Registry metadata

- Registry ID: `11e8fc13-00d2-4779-8d87-6288b07de7e7`
- Namespace: `create`
- Recipe key: `create.hash`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.create.hash`
- Status: `active`
- Registry version: `0.1.0-pilot`
