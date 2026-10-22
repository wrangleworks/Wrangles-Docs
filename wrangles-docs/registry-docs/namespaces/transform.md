---
title: "Transform Wrangles"
description: "Transform wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Transform"
slug: "/namespaces/transform"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Transform Wrangles

Transform wrangles, with recipe examples, parameters, and behavior.

## Copy <CopyableCode value="copy" /> {#copy}

Create a copy of columns in a dataframe.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Make a copy of a column or a list of columns",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input columns or columns"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output columns or columns"
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    }
  }
}
```

</details>

### Examples

```yaml
wrangles:
  - copy:
      input: Product Data
      output: Product Data (copy)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Data (copy) |
| --- |
| SKF ball brg |
| brg seal |

</div>

</div>



The runtime also accepts dictionary shorthand, but the upstream recipe schema
requires explicit `input` and `output`. Use this form for schema-validated recipes.



```yaml
wrangles:
  - copy:
      input: Product Data
      output: Product Data (copy)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Data (copy) |
| --- |
| SKF ball brg |
| brg seal |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input columns or columns | string, integer, array | `null` | Yes |
| `output` | Name of the output columns or columns | string, array | `null` | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

</details>

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
| Catalog ID | `74` |
| Catalog key | `copy` |
| Recipe key | `copy` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `transform` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.copy` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `b002fbdc-92c0-4347-889d-0f4bfeec99fa` |

**Sources**

- [WranglesPY copy implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived copy Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/copy.md)

</details>


---

## Reindex <CopyableCode value="reindex" /> {#reindex}

Conform a DataFrame to a new index with optional filling logic.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Changes the row labels and column labels of a DataFrame.",
  "additionalProperties": false,
  "properties": {
    "labels": {
      "type": "array",
      "description": "New labels / index to conform the axis specified by ‘axis’ to."
    },
    "index": {
      "type": "array",
      "description": "New labels for the index. Preferably an Index object to avoid duplicating data."
    },
    "columns": {
      "type": "array",
      "description": "New labels for the columns. Preferably an Index object to avoid duplicating data."
    },
    "axis": {
      "type": [
        "number",
        "string"
      ],
      "description": "Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1)."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    }
  }
}
```

</details>

### Examples

:::note
Cannot specify both `axis` and any of `index` or `columns`. Reindex is not compatible with `where` filtering.
:::





```yaml
wrangles:
  - reindex:
      index:
        - 4
        - 3
        - 2
        - 1
        - 0
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |
| Brass | Ball valve |
| Ceramic | Ceramic cartridge |
| Stainless Steel | Needle Bearing |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Material | Product Data |
| --- | --- |
| Stainless Steel | Needle Bearing |
| Ceramic | Ceramic cartridge |
| Brass | Ball valve |
| Rubber | brg seal |
| Ceramic | SKF ball brg |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `columns` | New labels for the columns. Preferably an Index object to avoid duplicating data. | array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `labels` | New labels / index to conform the axis specified by ‘axis’ to. | array | `null` | No |
| `index` | New labels for the index. Preferably an Index object to avoid duplicating data. | array | `null` | No |
| `axis` | Axis to target. Can be either the axis name (‘index’, ‘columns’) or number (0, 1). | number, string | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

</details>

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
| Catalog ID | `87` |
| Catalog key | `reindex` |
| Recipe key | `reindex` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `transform` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.reindex` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `def87df8-72da-4e34-83c1-1fde25126257` |

**Sources**

- [WranglesPY reindex implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived reindex Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/reindex.md)

</details>


---

## Rename <CopyableCode value="rename" /> {#rename}

Rename a column or list of columns.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Rename a column or list of columns.",
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input columns."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output columns."
    },
    "wrangles": {
      "type": "array",
      "description": "Use wrangles to transform the column names.\nThe input is named 'columns' and the final result\nmust also include the column named 'columns'.\nThis can only be used instead of the standard rename.",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    }
  }
}
```

</details>

### Examples

:::note
Rename is not compatible with `where` filtering.
:::





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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>





```yaml
wrangles:
  - rename:
      Manufacturer Name: Manufacturer
      Manufacturer Part Number: MPN
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Manufacturer | MPN |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>





```yaml
wrangles:
  - rename:
      wrangles:
        - convert.case:
            input: columns
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Manufacturer Name | Manufacturer Part Number |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| MANUFACTURER NAME | MANUFACTURER PART NUMBER |
| --- | --- |
| SKF | 302-2 |
| Timken | PF48 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | `null` | No |
| `output` | Name or list of output columns. | string, array | `null` | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | Use wrangles to transform the column names.<br />The input is named 'columns' and the final result<br />must also include the column named 'columns'.<br />This can only be used instead of the standard rename. | array | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

</details>

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
| Catalog ID | `89` |
| Catalog key | `rename` |
| Recipe key | `rename` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Structural rename steps are not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `transform` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.rename` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `ab06898f-faf7-42e7-8275-5e3034a4d727` |

**Sources**

- [WranglesPY rename implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived rename Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/rename.md)

</details>


---

## Transpose <CopyableCode value="transpose" /> {#transpose}

Transpose a dataframe.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).

Compatibility correction: Normalize schema type null to null.

```json
{
  "type": "object",
  "description": "Transpose the DataFrame (swap columns to rows)",
  "additionalProperties": false,
  "properties": {
    "header_column": {
      "type": [
        "string",
        "integer",
        "null"
      ],
      "description": "Name or position of the column that will be used as the column headings for the transposed DataFrame. Default 0 (first column). Use header_column = null to not use any column as header."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    },
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where_special"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    }
  }
}
```

</details>

### Examples

:::note
Transpose is not compatible with `where` filtering.
:::





```yaml
wrangles:
  - transpose:
      header_column: Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Material | Ceramic | Rubber |
| --- | --- | --- |
| Product Data | SKF ball brg | brg seal |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `header_column` | Name or position of the column that will be used as the column headings for the transposed DataFrame. Default 0 (first column). Use header_column = null to not use any column as header. | string, integer, null | `0` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

Required follows the recipe schema. Default records the Python argument default;
a schema may require an argument even when Python provides a default.

</details>

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
| Catalog ID | `97` |
| Catalog key | `transpose` |
| Recipe key | `transpose` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `transform` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.transpose` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `8716347f-f286-49b2-8a0b-cb73292e7475` |

**Sources**

- [WranglesPY transpose implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived transpose Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/transpose.md)

</details>
