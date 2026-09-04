---
title: "Reindex"
description: "Changes the row labels and column labels of a DataFrame."
sidebar_label: "Reindex"
slug: "/reindex"
---

# Reindex

Changes the row labels and column labels of a DataFrame.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `labels` | No | array, null | New labels / index to conform the axis specified by ‘axis’ to. | `null` |
| `index` | No | array, null | New labels for the index. Preferably an Index object to avoid duplicating data. | `null` |
| `columns` | No | array, null | New labels for the columns. Preferably an Index object to avoid duplicating data. | `null` |
| `axis` | No | string, integer, null | Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1). | `null` |
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

Conform a DataFrame to a new index with optional filling logic.

## Migrated examples
:::note
Cannot specify both `axis` and any of `index` or `columns`. Reindex is not compatible with `where` filtering.
:::

#### Reindexing a Dataframe

##### Recipe

```yaml
wrangles:
  - reindex:
      index:
        - 5
        - 4
        - 3
        - 2
        - 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

|  | Material | Product Data |
| --- | --- | --- |
| 1 | Ceramic | SKF ball brg |
| 2 | Rubber | brg seal |
| 3 | Brass | Ball valve |
| 4 | Ceramic | Ceramic cartridge |
| 5 | Stainless Steel | Needle Bearing |

</div>

<div className="ww-sample-panel">

##### Output Sample

|  | Material | Product Data |
| --- | --- | --- |
| 5 | Stainless Steel | Needle Bearing |
| 4 | Ceramic | Ceramic cartridge |
| 3 | Brass | Ball valve |
| 2 | Rubber | brg seal |
| 1 | Ceramic | SKF ball brg |

</div>

</div>

## Provenance

- [WranglesPY reindex implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing reindex Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/reindex.md)

## Registry metadata

- Registry ID: `def87df8-72da-4e34-83c1-1fde25126257`
- Namespace: root-level runtime key
- Recipe key: `reindex`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.pandas.reindex`
- Status: `active`
- Registry version: `0.1.0-pilot`
