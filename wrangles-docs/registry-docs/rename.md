---
title: "Rename"
description: "Rename a column or list of columns."
sidebar_label: "Rename"
slug: "/rename"
---

# Rename

Rename a column or list of columns.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | No | string, integer, array, null | Name or list of input columns. | `null` |
| `output` | No | string, array, null | Name or list of output columns. | `null` |
| `wrangles` | No | array, null | Use wrangles to transform the column names. The input is named 'columns' and the final result must also include the column named 'columns'. This can only be used instead of the standard rename. | `null` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |

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

Rename a column or list of columns.

## Migrated examples
:::note
Rename is not compatible with `where` filtering.
:::

#### Renaming Columns With Input and Output

##### Recipe

```yaml
wrangles:
  - rename:
      input:
        - Manufacturer Name
        - Manufacturer Part Number
      output:
        - Manufacturer
        - MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

#### Renaming Columns Without Using Input and Output

##### Recipe

```yaml
wrangles:
  - rename:
      Manufacturer Name: Manufacturer
      Manufacturer Part Number: MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

#### Using Wrangles in Rename

##### Recipe

```yaml
wrangles:
  - rename:
      wrangles:
        - convert.case:
            input: columns
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel">

##### Output Sample

| MANUFACTURER NAME | MANUFACTURER PART NUMBER |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

## Provenance

- [WranglesPY rename implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing rename Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/rename.md)

## Registry metadata

- Registry ID: `ab06898f-faf7-42e7-8275-5e3034a4d727`
- Namespace: root-level runtime key
- Recipe key: `rename`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.rename`
- Status: `active`
- Registry version: `0.1.0-pilot`
