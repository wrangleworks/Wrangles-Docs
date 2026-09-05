---
title: "Custom"
description: "Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription."
sidebar_label: "Custom"
slug: "/extract/custom"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Custom

Extract data from the input using a DIY or bespoke extraction wrangle. Requires WrangleWorks Account and Subscription.

Extract data from the input using a DIY or bespoke extraction wrangle. Can be performed on one column or multiple columns. Requires WrangleWorks Account and Subscription.

:::info
Non-regex pattern matching extracts whole-word matches separated by word boundaries. Word boundaries include anything that is not a letter, number, or underscore.
:::

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case_sensitive` | Allows the wrangle to be case sensitive if set to True, default is False. | boolean | `false` | No |
| `extract_raw` | Extract the raw data from the wrangle. | boolean | `false` | No |
| `use_spellcheck` | Use spellcheck to also find minor mispellings compared to the reference data. | boolean | `false` | No |
| `sort` | Sort the results. | string; one of:<ul className="ww-param-enum-values"><li>training_order</li><li>input_order</li><li>longest</li><li>shortest</li><li>alphabetical</li><li>reverse_alphabetical</li><li>ascending</li><li>descending</li></ul> | `"training_order"` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `use_labels` | Use Labels in the extract output &#123;label: value&#125;. | boolean | `false` | No |
| `first_element` | Get the first element from results. | boolean | `false` | No |
| `include_empty_labels` | Include labels with no found values in the output when using use_labels=True. | boolean | `true` | No |
| `output_format` | Format of the extract output. | string, null; one of:<ul className="ww-param-enum-values"><li>list</li><li>dictionary</li><li>columns</li><li>concatenate</li></ul> | `null` | No |
| `char` | Character to use when output_format is concatenate. | string | `", "` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | The ID of the wrangle to use. | string, array | — | Yes |

</div>

## Examples

```yaml
# One column input
wrangles:
  - extract.custom:
      input: Product
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| Dining Oakwood Chair |
| Living Room Teakwood Frame Mirror |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Wood Types |
| --- |
| Oakwood |
| Teakwood |

</div>

</div>





```yaml
# Multi column input
wrangles:
  - extract.custom:
      input:
        - Part 1 of 2
        - Part 2 of 2
      output: Wood Types
      model_id: model_id_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part 1 of 2 | Part 2 of 2 |
| --- | --- |
| Dining Acacia Wood Table | Imitation Wood Table Chairs |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Wood Types |
| --- |
| ['Acacia Wood', 'Imitation Wood'] |

</div>

</div>





```yaml
# Multiple Models
wrangles:
  - extract.custom:
      input:
        - Product
        - Product
      output:
        - Wood Types
        - Item Type
      model_id:
        - wood_Type_model_id
        - item_type_model_id
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Item Type | Wood Types |
| --- | --- | --- |
| Dining Oakwood Chair | Chair | Oakwood |
| Living Room Teakwood Frame Mirror | Mirror | Teakwood |

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
| Recipe key | `extract.custom` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `extract` |
| Documentation group | `extract` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.extract.custom` |

**Sources**

- [WranglesPY extract.custom implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/extract.py)
- [Existing extract.custom Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/extract/_sources/custom.md)

</details>
