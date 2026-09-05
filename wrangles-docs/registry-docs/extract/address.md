---
title: "Address"
description: "Extract parts of addresses. Requires WrangleWorks Account."
sidebar_label: "Address"
slug: "/extract/address"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Address

Extract parts of addresses. Requires WrangleWorks Account.

Extract geographical information from unstructured text such as streets, cities, or countries. Requires WrangleWorks Account.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `dataType` | Specific part of the address to extract. | string; one of:<ul className="ww-param-enum-values"><li>streets</li><li>cities</li><li>regions</li><li>countries</li></ul> | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_format` | Format of the extract output. | string, null; one of:<ul className="ww-param-enum-values"><li>list</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate. | string | `", "` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

```yaml
wrangles:
  - extract.address:
      input: Location
      output: Street
      dataType: streets
      where: SUBSTRING(Location, 1, 3) = '221'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Location |
| --- |
| 221 B Baker St., London, England, United Kingdom |
| London SW1A 1AA, London, England, United Kingdom |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Street |
| --- |
| ['221 B Baker St.'] |
|  |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Access</summary>

| Requirement | Value |
| --- | --- |
| AI-powered | No |
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Recipe key | `extract.address` |
| Lifecycle status | active |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.address` |

**Sources**

- [WranglesPY extract.address implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.address Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/address.md)

</details>
