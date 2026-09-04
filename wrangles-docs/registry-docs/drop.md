---
title: "Drop"
description: "Drop (Delete) selected column(s)."
sidebar_label: "Drop"
slug: "/drop"
---

# Drop

Drop (Delete) selected column(s).

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `columns` | Yes | string, array | Name of the column(s) to drop. | — |
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

Drop (Delete) selected column(s)

## Migrated examples
#### Dropping a Column

##### Recipe

```yaml
wrangles:
  - drop:
      columns:
        - Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Product Data |
| --- |
| SKF ball bearing |
| bearing seal |

</div>

</div>

## Provenance

- [WranglesPY drop implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing drop Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/select/_sources/drop.md)

## Registry metadata

- Registry ID: `363bffbf-397e-4975-8382-e9efa5e9eed6`
- Namespace: root-level runtime key
- Recipe key: `drop`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.pandas.drop`
- Status: `active`
- Registry version: `0.1.0-pilot`
