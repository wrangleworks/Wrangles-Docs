---
title: "Reindex"
description: "Changes the row labels and column labels of a DataFrame."
sidebar_label: "Reindex"
slug: "/reindex"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Reindex

Changes the row labels and column labels of a DataFrame.

Conform a DataFrame to a new index with optional filling logic.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `columns` | New labels for the columns. Preferably an Index object to avoid duplicating data. | array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `labels` | New labels / index to conform the axis specified by ‘axis’ to. | array, null | `null` | No |
| `index` | New labels for the index. Preferably an Index object to avoid duplicating data. | array, null | `null` | No |
| `axis` | Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1). | string, integer, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |

</div>

## Examples

:::note
Cannot specify both `axis` and any of `index` or `columns`. Reindex is not compatible with `where` filtering.
:::





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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

|  | Material | Product Data |
| --- | --- | --- |
| 1 | Ceramic | SKF ball brg |
| 2 | Rubber | brg seal |
| 3 | Brass | Ball valve |
| 4 | Ceramic | Ceramic cartridge |
| 5 | Stainless Steel | Needle Bearing |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

|  | Material | Product Data |
| --- | --- | --- |
| 5 | Stainless Steel | Needle Bearing |
| 4 | Ceramic | Ceramic cartridge |
| 3 | Brass | Ball valve |
| 2 | Rubber | brg seal |
| 1 | Ceramic | SKF ball brg |

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
| Recipe key | `reindex` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `transform` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.reindex` |

**Sources**

- [WranglesPY reindex implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Existing reindex Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/transform/_sources/reindex.md)

</details>
