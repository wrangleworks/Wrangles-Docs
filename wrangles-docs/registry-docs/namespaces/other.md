---
title: "Other Wrangles"
description: "Other wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Other"
slug: "/namespaces/other"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';
import RegistryLocationRedirect from '@site/src/components/RegistryLocationRedirect';

<RegistryLocationRedirect from={"/py/namespaces/other"} routes={{}} />

# Other Wrangles

Other wrangles, with recipe examples, parameters, and behavior.

## Accordion <CopyableCode value="accordion" /> {#accordion}

Apply a series of wrangles to the individual elements of one or more lists.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "69",
  "status": "active",
  "description": "Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each element in the list and the results will be returned back as a list.",
  "additionalProperties": false,
  "required": [
    "input",
    "wrangles"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "The column(s) containing the list(s) that the wrangles will be applied to the elements of."
    },
    "propagate": {
      "type": [
        "string",
        "array"
      ],
      "description": "Limit the column(s) that will be available to the wrangles and replicated for each element. If not specified, all columns will be propogated. This may be useful to limit the memory use for large datasets."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Output of the wrangles to save back to the dataframe."
    },
    "wrangles": {
      "type": "array",
      "description": "List of wrangles to apply",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
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

This example applies `convert.case` to each string in a list, where the wrangle would not normally operate on the list as a whole.



```yaml
wrangles:
  - accordion:
      input: list_column
      output: modified_lists
      wrangles:
        - convert.case:
            input: list_column
            output: modified_lists
            case: upper
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| list_column |
| --- |
| ["a", "b", "c"] |
| ["e", "f", "g"] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| modified_lists |
| --- |
| ["A", "B", "C"] |
| ["E", "F", "G"] |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The column(s) containing the list(s) that the wrangles will be applied to the elements of. | string, integer, array | — | Yes |
| `output` | Output of the wrangles to save back to the dataframe. | string, array | `null` | No |
| `propagate` | Limit the column(s) that will be available to the wrangles and replicated for each element. If not specified, all columns will be propogated. This may be useful to limit the memory use for large datasets. | string, array | `null` | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | List of wrangles to apply | array | — | Yes |
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
| Catalog ID | `69` |
| Catalog key | `accordion` |
| Recipe key | `accordion` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Nested-list orchestration is not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.accordion` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY accordion implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived accordion Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/accordion.md)

</details>


---

## Batch <CopyableCode value="batch" /> {#batch}

Execute a series of wrangles in batches. Batches can run in parallel with `threads` and can provide fallback output when an error occurs.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "70",
  "status": "active",
  "description": "Split the data into batches for executing a list of wrangles. Use this in situations such as where the intermediate data is too large to fit in memory.",
  "additionalProperties": false,
  "required": [
    "wrangles"
  ],
  "properties": {
    "batch_size": {
      "type": "integer",
      "description": "The number of rows to split each batch into",
      "default": 1000
    },
    "wrangles": {
      "type": "array",
      "description": "The wrangles to execute on the data. Each series of wrangles\nwill be run agaisnst the data in batches of the size\ndefined by batch_size.",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
    },
    "threads": {
      "type": "integer",
      "description": "The number of threads to use for parallel processing. Default 1."
    },
    "on_error": {
      "type": "object",
      "description": "A dictionary of column_name: value to return if an error occurs while attempting to run a batch"
    },
    "timeout": {
      "type": "number",
      "description": "The number of seconds to wait for a batch to complete before raising an error"
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

This example processes product descriptions in batches of two rows.



```yaml
wrangles:
  - batch:
      batch_size: 2
      threads: 1
      wrangles:
        - extract.ai:
            api_key: Your OpenAI API key
            input: Product Description
            output:
              Title:
                type: string
                description: Title of the product
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Description |
| --- |
| Sleep better with our Memory Foam Pillow, designed to contour to your head and neck. |
| Stay comfortable and stylish with our Organic Cotton T-Shirt, made from soft, breathable fabric. |
| Keep drinks hot or cold with our Stainless Steel Water Bottle, featuring durable insulation. |
| Enjoy crisp sound and long battery life with our Wireless Bluetooth Earbuds. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Title |
| --- |
| Memory Foam Pillow |
| Organic Cotton T-Shirt |
| Stainless Steel Water Bottle |
| Wireless Bluetooth Earbuds |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | The wrangles to execute on the data. Each series of wrangles<br />will be run agaisnst the data in batches of the size<br />defined by batch_size. | array | — | Yes |
| `batch_size` | The number of rows to split each batch into | integer | `1000` | No |
| `threads` | The number of threads to use for parallel processing. Default 1. | integer | `1` | No |
| `timeout` | The number of seconds to wait for a batch to complete before raising an error | number | `null` | No |
| `use_multiprocessing` | Use process-based workers instead of threads. This is an advanced runtime option. | Any JSON value (not constrained upstream) | `false` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `on_error` | A dictionary of column_name: value to return if an error occurs while attempting to run a batch | object | `null` | No |
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
| Catalog ID | `70` |
| Catalog key | `batch` |
| Recipe key | `batch` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.batch` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY batch implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived batch Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/batch.md)

</details>


---

## Classify <CopyableCode value="classify" /> {#classify}

Run a custom classification wrangle on the specified column or columns. A classification wrangle must be trained first.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "71",
  "status": "active",
  "description": "Run classify wrangles on the specified columns.\nRequires WrangleWorks Account and Subscription.\n",
  "required": [
    "input",
    "output",
    "model_id"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column."
    },
    "model_id": {
      "type": "string",
      "description": "ID of the classification model to be used"
    },
    "include_confidence": {
      "type": "boolean",
      "description": "For models that support it, include the confidence level in the output"
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
  - classify:
      input: Products
      output: Category
      model_id: ${model_id}
      where: Products = Milk
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products |
| --- |
| Rice |
| Milk |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Category |
| --- |
|  |
| Dairy |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `include_confidence` | For models that support it, include the confidence level in the output | boolean | — | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | ID of the classification model to be used | string | — | Yes |
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
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `71` |
| Catalog key | `classify` |
| Recipe key | `classify` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.classify` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `06669ef8-cdd1-42f7-8078-98e0b7a42c30` |

**Sources**

- [WranglesPY classify implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived classify Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/ai/_sources/classify.md)

</details>


---

## Clean Whitespaces <CopyableCode value="clean_whitespaces" /> {#clean-whitespaces}

Condense multiple spaces to a single space and convert special space characters to a standard space.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "72",
  "status": "active",
  "description": "Condense multiple spaces to a single space and convert special space characters to a standard space.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
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
    "trim": {
      "type": "boolean",
      "description": "Whether to trim leading and trailing spaces. Default True."
    },
    "remove_literals": {
      "type": "boolean",
      "description": "Whether to remove special space characters such as new lines etc. Default True."
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
  - clean_whitespaces:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products |
| --- |
| `Hello     world!` |
| `Hello     universe!` |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products |
| --- |
| Hello world! |
| Hello universe! |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `trim` | Whether to trim leading and trailing spaces. Default True. | boolean | `true` | No |
| `remove_literals` | Whether to remove special space characters such as new lines etc. Default True. | boolean | `true` | No |
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
| Catalog ID | `72` |
| Catalog key | `clean_whitespaces` |
| Recipe key | `clean_whitespaces` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.clean_whitespaces` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `e36e15c4-f0ad-43f8-8555-ef683a8ab892` |

**Sources**

- [WranglesPY clean_whitespaces implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived clean_whitespaces Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/clean-whitespaces.md)

</details>


---

## Concurrent <CopyableCode value="concurrent" /> {#concurrent}

Run multiple wrangles concurrently instead of sequentially. Concurrent wrangles must declare output columns, may finish in any order, and should not update overlapping columns.

See the [Concurrent connector](/py/connectors/concurrent) for the connector equivalent.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "73",
  "status": "active",
  "description": "Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles.",
  "additionalProperties": false,
  "required": [
    "wrangles"
  ],
  "properties": {
    "wrangles": {
      "type": "array",
      "description": "The wrangles section of a recipe to execute for each combination of variables",
      "minItems": 1,
      "items": [
        {
          "$ref": "#/$defs/wrangles/items"
        }
      ]
    },
    "max_concurrency": {
      "type": "integer",
      "description": "The maximum number of wrangles to execute in parallel",
      "minimum": 1
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
  - concurrent:
      wrangles:
        - extract.codes:
            input: Products
            output: Part Codes
        - extract.attributes:
            input: Products
            output: Attributes
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products |
| --- |
| SKF ball brg 2" od 6202 |
| brg seal 1" id 5493 |
| 3lb hammer 87102 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Part Codes | Attributes |
| --- | --- |
| 6202 | `{"length":["2in"]}` |
| 5493 | `{"length":["1in"]}` |
| 87102 | `{"weight":["3lb"]}` |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | The wrangles section of a recipe to execute for each combination of variables | array | — | Yes |
| `max_concurrency` | The maximum number of wrangles to execute in parallel | integer | `10` | No |
| `use_multiprocessing` | Use process-based workers instead of threads. This is an advanced runtime option. | Any JSON value (not constrained upstream) | `false` | No |
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
| Catalog ID | `73` |
| Catalog key | `concurrent` |
| Recipe key | `concurrent` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Concurrent orchestration is not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.concurrent` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY concurrent implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived concurrent Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/concurrent.md)

</details>


---

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
  "catalog_id": "74",
  "status": "active",
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
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.copy` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `b002fbdc-92c0-4347-889d-0f4bfeec99fa` |

**Sources**

- [WranglesPY copy implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived copy Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/copy.md)

</details>


---

## Date Calculator <CopyableCode value="date_calculator" /> {#date-calculator}

Add or subtract time from a date.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "75",
  "status": "active",
  "description": "Add or Subtract time from a date",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "Name of the dates column"
    },
    "operation": {
      "type": "string",
      "description": "Date operation",
      "enum": [
        "add",
        "subtract"
      ]
    },
    "output": {
      "type": "string",
      "description": "Name of the output column of dates"
    },
    "time_unit": {
      "type": "string",
      "description": "time unit for operation",
      "enum": [
        "years",
        "months",
        "weeks",
        "days",
        "hours",
        "minutes",
        "seconds",
        "milliseconds"
      ]
    },
    "time_value": {
      "type": "number",
      "description": "time unit value for operation"
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
   - date_calculator:
      input: Date
      output: New Date
      operation: subtract  # Optional default is addition
      time_unit: days
      time_value: 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Date |
| --- |
| 2022-12-26 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Date |
| --- |
| 2022-12-25 00:00:00 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the dates column | string, integer | — | Yes |
| `output` | Name of the output column of dates | string | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `operation` | Date operation | string; one of:<ul className="ww-param-enum-values"><li>add</li><li>subtract</li></ul> | `"add"` | No |
| `time_unit` | time unit for operation | string; one of:<ul className="ww-param-enum-values"><li>years</li><li>months</li><li>weeks</li><li>days</li><li>hours</li><li>minutes</li><li>seconds</li><li>milliseconds</li></ul> | `null` | No |
| `time_value` | time unit value for operation | number | `null` | No |
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
| Catalog ID | `75` |
| Catalog key | `date_calculator` |
| Recipe key | `date_calculator` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.date_calculator` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `19cfeb4f-02af-4ab2-895c-0ff2bb5cce19` |

**Sources**

- [WranglesPY date_calculator implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived date_calculator Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/date/_sources/date-calculator.md)

</details>


---

## Drop <CopyableCode value="drop" /> {#drop}

Drop (Delete) selected column(s)

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "76",
  "status": "active",
  "description": "Drop (Delete) selected column(s)",
  "additionalProperties": true,
  "required": [
    "columns"
  ],
  "properties": {
    "columns": {
      "type": [
        "array",
        "string"
      ],
      "description": "Name of the column(s) to drop"
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    }
  }
}
```

</details>

### Examples

```yaml
wrangles:
  - drop:
      columns:
        - Material
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Material | Product Data |
| --- | --- |
| Ceramic | SKF ball brg |
| Rubber | brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Data |
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
| `columns` | Name of the column(s) to drop | array, string | — | Yes |
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
| Catalog ID | `76` |
| Catalog key | `drop` |
| Recipe key | `drop` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.drop` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `363bffbf-397e-4975-8382-e9efa5e9eed6` |

**Sources**

- [WranglesPY drop implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived drop Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/drop.md)

</details>


---

## Explode <CopyableCode value="explode" /> {#explode}

Explode a column of lists into rows

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "77",
  "status": "active",
  "description": "Explode a column of lists into rows",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the column(s) to explode. If multiple columns are included they must contain lists of the same length"
    },
    "reset_index": {
      "type": "boolean",
      "description": "Reset the index after exploding. Default True."
    },
    "drop_empty": {
      "type": "boolean",
      "description": "If true, any rows that contain an empty list will be dropped.\nIf false, rows that contain empty lists will keep 1 row with an empty value.\nDefault False."
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
  - explode:
      input: Products
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Products | Manufacturer |
| --- | --- |
| ["Ball Bearing", "Bearing Seal"] | SKF |
| ["Angle Grinder", "Drill", "Impact Driver"] | Milwaukee |
| Solid State Relay | Schneider |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Products | Manufacturer |
| --- | --- |
| Ball Bearing | SKF |
| Bearing Seal | SKF |
| Angle Grinder | Milwaukee |
| Drill | Milwaukee |
| Impact Driver | Milwaukee |
| Solid State Relay | Schneider |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column(s) to explode. If multiple columns are included they must contain lists of the same length | string, integer, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `drop_empty` | If true, any rows that contain an empty list will be dropped.<br />If false, rows that contain empty lists will keep 1 row with an empty value.<br />Default False. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `reset_index` | Reset the index after exploding. Default True. | boolean | `true` | No |
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
| Catalog ID | `77` |
| Catalog key | `explode` |
| Recipe key | `explode` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.explode` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `4e4b13ac-8d50-4b2c-85c8-2c31de1e817d` |

**Sources**

- [WranglesPY explode implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived explode Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/split/_sources/explode.md)

</details>


---

## Filter <CopyableCode value="filter" /> {#filter}

Filter the dataframe based on the contents.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "78",
  "status": "active",
  "description": "Filter the dataframe based on the contents.\nIf multiple filters are specified, all must be correct.\nFor complex filters, use the where parameter.",
  "additionalProperties": false,
  "properties": {
    "where": {
      "$ref": "#/$defs/wrangles/commonProperties/where_special"
    },
    "where_params": {
      "$ref": "#/$defs/wrangles/commonProperties/where_params"
    },
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the column to filter on.\nIf multiple are provided, all must match the criteria."
    },
    "equal": {
      "type": [
        "string",
        "array",
        "boolean",
        "number"
      ],
      "description": "Select rows where the values equal a given value."
    },
    "not_equal": {
      "type": [
        "string",
        "array",
        "boolean",
        "number"
      ],
      "description": "Select rows where the values do not equal a given value."
    },
    "is_in": {
      "type": [
        "array",
        "string"
      ],
      "description": "Select rows where the values are in a given list."
    },
    "not_in": {
      "type": [
        "array",
        "string"
      ],
      "description": "Select rows where the values are not in a given list."
    },
    "is_null": {
      "type": "boolean",
      "description": "If true, select all rows where the value is NULL. If false, where is not NULL."
    },
    "greater_than": {
      "type": [
        "integer",
        "number"
      ],
      "description": "Select rows where the values are greater than a specified value. Does include the value itself."
    },
    "greater_than_equal_to": {
      "type": [
        "integer",
        "number"
      ],
      "description": "Select rows where the values are greater than a specified value. Does include the value itself."
    },
    "less_than": {
      "type": [
        "integer",
        "number"
      ],
      "description": "Select rows where the values are less than a specified value. Does not include the value itself."
    },
    "less_than_equal_to": {
      "type": [
        "integer",
        "number"
      ],
      "description": "Select rows where the values are less than a specified value. Does include the value itself."
    },
    "between": {
      "type": [
        "array"
      ],
      "description": "Value or list of values to filter that are in between two parameter values"
    },
    "contains": {
      "type": "string",
      "description": "Select rows where the input contains the value. Allows regular expressions."
    },
    "not_contains": {
      "type": "string",
      "description": "Select rows where the input does not contain the value. Allows regular expressions."
    },
    "if": {
      "$ref": "#/$defs/wrangles/commonProperties/if"
    }
  }
}
```

</details>

### Examples

```yaml
wrangles:
  # Select only red fruits
  - filter:
      input: Color
      equal:
        - red
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Color | Fruit |
| --- | --- |
| red | Apple |
| green | Apple |
| orange | Orange |
| red | Strawberry |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Color | Fruit |
| --- | --- |
| red | Apple |
| red | Strawberry |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to filter on.<br />If multiple are provided, all must match the criteria. | string, integer, array | `[]` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `equal` | Select rows where the values equal a given value. | string, array, boolean, number | `null` | No |
| `not_equal` | Select rows where the values do not equal a given value. | string, array, boolean, number | `null` | No |
| `is_in` | Select rows where the values are in a given list. | array, string | `null` | No |
| `not_in` | Select rows where the values are not in a given list. | array, string | `null` | No |
| `greater_than` | Select rows where the values are greater than a specified value. Does include the value itself. | integer, number | `null` | No |
| `greater_than_equal_to` | Select rows where the values are greater than a specified value. Does include the value itself. | integer, number | `null` | No |
| `less_than` | Select rows where the values are less than a specified value. Does not include the value itself. | integer, number | `null` | No |
| `less_than_equal_to` | Select rows where the values are less than a specified value. Does include the value itself. | integer, number | `null` | No |
| `between` | Value or list of values to filter that are in between two parameter values | array | `null` | No |
| `contains` | Select rows where the input contains the value. Allows regular expressions. | string | `null` | No |
| `not_contains` | Select rows where the input does not contain the value. Allows regular expressions. | string | `null` | No |
| `is_null` | If true, select all rows where the value is NULL. If false, where is not NULL. | boolean | `null` | No |
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
| Catalog ID | `78` |
| Catalog key | `filter` |
| Recipe key | `filter` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.filter` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `e3242acf-d204-433f-8373-205b77481131` |

**Sources**

- [WranglesPY filter implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived filter Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/filter.md)

</details>


---

## Huggingface <CopyableCode value="huggingface" /> {#huggingface}

Use a model from huggingface

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "79",
  "status": "active",
  "description": "Use a model from huggingface",
  "required": [
    "input",
    "api_token",
    "model"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column. If not provided, will overwrite the input column\n"
    },
    "model": {
      "type": "string",
      "description": "Name of the model to use. e.g. facebook/bart-large-cnn"
    },
    "api_token": {
      "type": "string",
      "description": "Huggingface API Token"
    },
    "parameters": {
      "type": "object",
      "description": "Optionally, provide additional parameters to define the model behaviour"
    },
    "timeout": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Request timeout in seconds; defaults to the AI configuration."
    },
    "retries": {
      "type": "integer",
      "minimum": 0,
      "description": "Additional attempts after transient failures; defaults to the AI configuration."
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

This template uses a Hugging Face summarization model. The exact response shape and text depend on the selected model.



```yaml
wrangles:
  - huggingface:
      input:
        - Product Description
      output:
        - Summary
      api_token: Your Hugging Face API token
      model: facebook/bart-large-cnn
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Description |
| --- |
| A cordless drill with two batteries, a charger, and a compact carrying case. |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Summary |
| --- |
| Cordless drill kit with batteries, charger, and case. |

</div>

</div>

_Template based on the documented parameters; no published source example is currently available._

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column. | string, integer, array | — | Yes |
| `output` | Name of the output column. If not provided, will overwrite the input column<br /> | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `parameters` | Optionally, provide additional parameters to define the model behaviour | object | `null` | No |
| `timeout` | Request timeout in seconds; defaults to the AI configuration. | number | `null` | No |
| `retries` | Additional attempts after transient failures; defaults to the AI configuration. | integer | `null` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_token` | Huggingface API Token | string | — | Yes |
| `model` | Name of the model to use. e.g. facebook/bart-large-cnn | string | — | Yes |
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
| Catalog ID | `79` |
| Catalog key | `huggingface` |
| Recipe key | `huggingface` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.huggingface` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `ae12cf20-4934-428f-84a9-a6898cb7ffe0` |

**Sources**

- [WranglesPY huggingface implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived huggingface Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/ai/_sources/huggingface.md)

</details>


---

## Log <CopyableCode value="log" /> {#log}

Print the current status of the dataframe. Only a sample of rows is logged.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "80",
  "status": "active",
  "description": "Log the current status of the dataframe.",
  "additionalProperties": false,
  "properties": {
    "columns": {
      "type": "array",
      "description": "(Optional, default all columns) List of specific columns to log."
    },
    "write": {
      "type": "array",
      "description": "(Optional) Allows for an intermediate output to a file/dataframe/database etc.",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/write/items"
      }
    },
    "error": {
      "type": "string",
      "description": "Log an error to the console"
    },
    "warning": {
      "type": "string",
      "description": "Log a warning to the console"
    },
    "info": {
      "type": "string",
      "description": "Log info to the console"
    },
    "log_data": {
      "type": "boolean",
      "description": "Whether to log a sample of the contents of the dataframe. Default True if not logging to a write, error, warning or info. Default False otherwise."
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
  - log: {}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product | Quantity |
| --- | --- |
| Hammer | 2 |
| Drill | 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product | Quantity |
| --- | --- |
| Hammer | 2 |
| Drill | 3 |

The data is returned unchanged. A sample of the dataframe is written to the server log, not added to the result table.

</div>

</div>





```yaml
wrangles:
  - log:
      columns:
        - column1
        - column2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column1 | column2 |
| --- | --- |
| Hammer | 3 |
| Drill | 2 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

The input data is returned unchanged; the selected columns are also logged.

| column1 | column2 |
| --- | --- |
| Hammer | 3 |
| Drill | 2 |

</div>

</div>





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

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_Logs a sample of rows or status information to the configured destination._

</div>

</div>



| Variable | Function |
| --- | --- |
| `${column_count}` | Number of columns. |
| `${columns}` | List of all columns. |
| `${df}` | Current dataframe. |
| `${row_count}` | Number of visible rows processed in each batch. |

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `columns` | (Optional, default all columns) List of specific columns to log. | array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `write` | (Optional) Allows for an intermediate output to a file/dataframe/database etc. | array | `null` | No |
| `warning` | Log a warning to the console | string | `null` | No |
| `info` | Log info to the console | string | `null` | No |
| `log_data` | Whether to log a sample of the contents of the dataframe. Default True if not logging to a write, error, warning or info. Default False otherwise. | boolean | `null` | No |
| `error` | Log an error to the console | string | — | No |
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
| Catalog ID | `80` |
| Catalog key | `log` |
| Recipe key | `log` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Operational logging steps are not authored in the baseline. |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.log` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `6177808e-aa2d-4d0b-8385-858b16948a5d` |

**Sources**

- [WranglesPY log implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived log Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/log.md)

</details>


---

## Math <CopyableCode value="math" /> {#math}

Apply mathematical calculations to columns. Also called as `maths`.

:::info
Spaces within column headers are replaced with underscores automatically. Account for this when writing expressions in `input`.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "82",
  "status": "active",
  "description": "Apply a mathematical calculation.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "The mathematical expression using column names. e.g. column1 * column2\n+ column3.  Note: spaces within column names are replaced by underscores (_).\n"
    },
    "output": {
      "type": "string",
      "description": "The column to output the results to"
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
  - math:
      input: sqrt(Values)
      output: Square Root
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Values |
| --- |
| 4 |
| 9 |
| 16 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Square Root |
| --- |
| 2 |
| 3 |
| 4 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The mathematical expression using column names. e.g. column1 * column2<br />+ column3.  Note: spaces within column names are replaced by underscores (_).<br /> | string, integer | — | Yes |
| `output` | The column to output the results to | string | — | Yes |
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
| Catalog ID | `82` |
| Catalog key | `math` |
| Recipe key | `math` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.math` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `494b11ad-00c1-4748-8b93-6bec982f4fec` |

**Sources**

- [WranglesPY math implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived math Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/math.md)

</details>


---

## Matrix <CopyableCode value="matrix" /> {#matrix}

Apply a matrix of wrangles to the dataframe. Each wrangle runs for the configured combinations of variables, including recipe variables and variables declared by the `variables` parameter.

See the [Matrix connector](/py/connectors/matrix) for the connector equivalent.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "84",
  "status": "active",
  "description": "Apply a matrix of wrangles to the dataframe.\nThis will run the wrangles for each combination of the variables.",
  "required": [
    "variables",
    "wrangles"
  ],
  "properties": {
    "variables": {
      "type": "object",
      "description": "A dictionary of variables to pass to the wrangle.\nThe key is the variable name and the value is a list of values."
    },
    "wrangles": {
      "type": "array",
      "description": "The wrangles to apply to the dataframe.\nEach wrangle will be run for each combination of the variables.",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
    },
    "strategy": {
      "type": "string",
      "enum": [
        "permutations",
        "loop"
      ],
      "description": "Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists  until the longest is completed. permutations uses the combination of all  variables against all other variables."
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

Run a custom function once for each configured variable value.



```yaml
wrangles:
  - matrix:
      variables:
        var: [A, B, C]
      wrangles:
        - custom.test_fn:
            input: Part Code
            output: Part Code ${var}
            value: ${var}
```

```python
def test_fn(Part_Code, value):
    return str(Part_Code) + str(value)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Part Code |
| --- |
| 6202 |
| br549 |
| 554-114 |
| 554-112 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Part Code A | Part Code B | Part Code C |
| --- | --- | --- |
| 6202A | 6202B | 6202C |
| br549A | br549B | br549C |
| 554-114A | 554-114B | 554-114C |
| 554-112A | 554-112B | 554-112C |

</div>

</div>



This example runs `extract.custom` once for each unique model ID.



```yaml
wrangles:
  - matrix:
      variables:
        model_id: set(Model ID)
      wrangles:
        - extract.custom:
            input: Description
            output: Extracted Values
            model_id: ${model_id}
            where: "[Model ID] = ?"
            where_params:
              - ${model_id}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Description | Model ID |
| --- | --- |
| The SKF 6202 bearing is the best bearing in the world | xxxxxxxx-xxxx-xxxx |
| The Timken 6102 bearing is indestructible | yyyyyyyy-yyyy-yyyy |
| The Milwaukee impact has 1200ft-lbs of torque | zzzzzzzz-zzzz-zzzz |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Extracted Values |
| --- |
| 6202 |
| indestructible |
| 1200ft-lbs |

</div>

</div>



| Variable | Function |
| --- | --- |
| `${column_count}` | Number of columns. |
| `${columns}` | List of all columns. |
| `${df}` | Current dataframe. |
| `${row_count}` | Number of visible rows processed in each batch. |

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `strategy` | Determines how to combine variables when there are multiple. loop (default) iterates over each set of variables, repeating shorter lists  until the longest is completed. permutations uses the combination of all  variables against all other variables. | string; one of:<ul className="ww-param-enum-values"><li>permutations</li><li>loop</li></ul> | `"loop"` | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `variables` | A dictionary of variables to pass to the wrangle.<br />The key is the variable name and the value is a list of values. | object | — | Yes |
| `wrangles` | The wrangles to apply to the dataframe.<br />Each wrangle will be run for each combination of the variables. | array | — | Yes |
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
| Catalog ID | `84` |
| Catalog key | `matrix` |
| Recipe key | `matrix` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Matrix orchestration is not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.matrix` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY matrix implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived matrix Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/matrix.md)

</details>


---

## Python <CopyableCode value="python" /> {#python}

The Python wrangle executes simple Python commands inline within a recipe. Row values are referenced by column name and commands are evaluated once per row. Spaces within column names are replaced by underscores (`_`). All columns are also available as a dictionary named `kwargs`. For more complex Python, use custom functions.

:::caution
This wrangle evaluates the Python command. Be cautious when including variables from untrusted sources in the command string.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "85",
  "status": "active",
  "description": "Apply a simple single-line python command. For more complex python use a custom function.\nNote, this evaluates the python command - be especially cautious including\nvariables from untrusted sources within the command string.\nThe python command will be evaluated once for each row and the result returned.\nReference column values by using their name.\nNon-alphanumeric characters within column names are replaced by underscores (_)\nAdditionally, all columns are available as a dict named kwargs.\nAdditional parameters set for the wrangle will also be available to the command.",
  "required": [
    "command",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input column(s) to filter the data available\nto the command. Useful in conjunction with kwargs to target\na variable range of columns.\nIf not specified, all columns will be available."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output column(s). To output multiple columns,\nreturn a list of the corresponding length."
    },
    "command": {
      "type": "string",
      "description": "Python command. This must return a value.\nNote: any non-alphanumeric characters in variable names\nare replaced by underscores (_)."
    },
    "except": {
      "type": [
        "string",
        "array",
        "number",
        "integer",
        "boolean",
        "object"
      ],
      "description": "Value to return for the row if an exception occurs during the evaluation.\nIf not provided, an exception will be raised as normal.\nIf multiple output columns are specified, this must match the length."
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
  - python:
      output: result
      command: My_Column.upper()
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| My Column |
| --- |
| example text |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| result |
| --- |
| EXAMPLE TEXT |

</div>

</div>



The Python wrangle supports parameters so values of unknown origin can be injected safely.



```yaml
wrangles:
  - python:
      output: sliced
      input: input_column
      command: input_column[:i]
      i: 3
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| input_column |
| --- |
| Bearing |
| Hammer |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| sliced |
| --- |
| Bea |
| Ham |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of output column(s). To output multiple columns,<br />return a list of the corresponding length. | string, array | — | Yes |
| `input` | Name or list of input column(s) to filter the data available<br />to the command. Useful in conjunction with kwargs to target<br />a variable range of columns.<br />If not specified, all columns will be available. | string, integer, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `command` | Python command. This must return a value.<br />Note: any non-alphanumeric characters in variable names<br />are replaced by underscores (_). | string | — | Yes |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `except` | Value to return for the row if an exception occurs during the evaluation.<br />If not provided, an exception will be raised as normal.<br />If multiple output columns are specified, this must match the length. | string, array, number, integer, boolean, object | — | No |
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
| Catalog ID | `85` |
| Catalog key | `python` |
| Recipe key | `python` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.python` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `c0398a11-7731-4e47-8df0-b07eea0b1d6c` |

**Sources**

- [WranglesPY python implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived python Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/python.md)

</details>


---

## Recipe <CopyableCode value="recipe" /> {#recipe}

### Behavior

Run another recipe as a wrangle against the current dataframe.

This guidance was derived from the callable signature and its embedded Python schema docstring.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "catalog_id": "86",
  "status": "active",
  "anyOf": [
    {
      "$ref": "#"
    },
    {
      "type": "object",
      "description": "Run a recipe as a Wrangle. Recipe-ception,",
      "additionalProperties": false,
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "file name of the recipe"
        },
        "variables": {
          "type": "object",
          "description": "A dictionary of variables to pass to the recipe"
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
  ]
}
```

</details>



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name, index, or list of input columns. | Any JSON value (not constrained upstream) | `null` | No |
| `output` | Name or list of output columns. | Any JSON value (not constrained upstream) | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `name` | file name of the recipe | string | `null` | Conditional; see schema |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `variables` | A dictionary of variables to pass to the recipe | object | `null` | No |
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
| Catalog ID | `86` |
| Catalog key | `recipe` |
| Recipe key | `recipe` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Nested recipe composition is outside the baseline. |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.recipe` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY recipe implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)

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
  "catalog_id": "87",
  "status": "active",
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
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.reindex` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `def87df8-72da-4e34-83c1-1fde25126257` |

**Sources**

- [WranglesPY reindex implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived reindex Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/reindex.md)

</details>


---

## Remove Words <CopyableCode value="remove_words" /> {#remove-words}

Remove all the elements that occur in one list from another.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "88",
  "status": "active",
  "description": "Remove all the elements that occur in one list from another.",
  "additionalProperties": false,
  "required": [
    "input",
    "to_remove",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of column to remove words from"
    },
    "to_remove": {
      "type": "array",
      "description": "Column or list of columns with a list of words to be removed"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output columns"
    },
    "tokenize_to_remove": {
      "type": "boolean",
      "description": "Tokenize all to_remove inputs"
    },
    "ignore_case": {
      "type": "boolean",
      "description": "Ignore input and to_remove case"
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
   - remove_words:
        input: Description
        to_remove: # To Remove columns must be list
          - Materials
          - Colours
        output: Product
        tokenize_to_remove: True
        ignore_case: False
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Colours | Materials | Description |
| --- | --- | --- |
| ['Blue'] | ['Steel'] | Steel Blue Bottle |
| ['Blue'] | ['Steel'] | ['Steel', 'Blue', 'Bottle'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product |
| --- |
| Bottle |
| Bottle |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of column to remove words from | string, integer, array | — | Yes |
| `to_remove` | Column or list of columns with a list of words to be removed | array | — | Yes |
| `output` | Name of the output columns | string, array | `null` | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `tokenize_to_remove` | Tokenize all to_remove inputs | boolean | `false` | No |
| `ignore_case` | Ignore input and to_remove case | boolean | `true` | No |
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
| Catalog ID | `88` |
| Catalog key | `remove_words` |
| Recipe key | `remove_words` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.remove_words` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `543b96c3-f354-48be-8046-bf0cb9fbaf56` |

**Sources**

- [WranglesPY remove_words implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived remove_words Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/remove-words.md)

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
  "catalog_id": "89",
  "status": "active",
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
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.rename` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `ab06898f-faf7-42e7-8275-5e3034a4d727` |

**Sources**

- [WranglesPY rename implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived rename Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/rename.md)

</details>


---

## Round <CopyableCode value="round" /> {#round}

Round numbers in a column to the nearest decimal point of your choosing.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "91",
  "status": "active",
  "description": "Round column(s) to the specified decimals",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the input column(s)"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column(s)"
    },
    "decimals": {
      "type": "number",
      "description": "Number of decimal places to round column"
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
  - round:
      input: Cost Per Unit
      output: Cost Rounded
      decimals: 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Cost Per Unit |
| --- |
| 3.14159 |
| 2.71828 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Cost Rounded |
| --- |
| 3.14 |
| 2.72 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the input column(s) | string, integer, array | — | Yes |
| `output` | Name of the output column(s) | string, array | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `decimals` | Number of decimal places to round column | number | `0` | No |
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
| Catalog ID | `91` |
| Catalog key | `round` |
| Recipe key | `round` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.round` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `12f3111b-8511-4e42-8d3f-b5302dc3b4e4` |

**Sources**

- [WranglesPY round implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived round Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/round.md)

</details>


---

## Similarity <CopyableCode value="similarity" /> {#similarity}

Calculate the similarity of two vectors.

:::info
Similarity only works on vectors. To produce vectors from a column of strings, use `create.embeddings` first.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "92",
  "status": "active",
  "description": "Calculate the cosine similarity of two vectors",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": "array",
      "description": "Two columns of vectors to compare the similarity of.",
      "minItems": 2,
      "maxItems": 2
    },
    "output": {
      "type": "string",
      "description": "Name of the output column."
    },
    "method": {
      "type": "string",
      "description": "The type of similarity to calculate (cosine or euclidean). Adjusted cosine adjusts the default cosine calculation to cover a range of 0-1 for typical comparisons.",
      "enum": [
        "cosine",
        "adjusted cosine",
        "euclidean"
      ]
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
  - create.embeddings:
      input: col1
      api_key: ${my_key}
      output: col1 embeddings

  - create.embeddings:
      input: col2
      api_key: ${my_key}
      output: col2 embeddings

  - similarity:
      input:
        - col1 embeddings
        - col2 embeddings
      output: similarity
      method: adjusted cosine
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| col1 | col2 |
| --- | --- |
| SKF | Timken |
| Ball Bearing | Roller Bearing |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| col1 embeddings | col2 embeddings | similarity |
| --- | --- | --- |
| [1, 2, 3, 4] | [4, 3, 2, 1] | 0.158931 |
| [5, 6, 7, 8] | [5, 6, 7, 9] | 0.942437 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Two columns of vectors to compare the similarity of. | array | — | Yes |
| `output` | Name of the output column. | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The type of similarity to calculate (cosine or euclidean). Adjusted cosine adjusts the default cosine calculation to cover a range of 0-1 for typical comparisons. | string; one of:<ul className="ww-param-enum-values"><li>cosine</li><li>adjusted cosine</li><li>euclidean</li></ul> | `"cosine"` | No |
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
| Catalog ID | `92` |
| Catalog key | `similarity` |
| Recipe key | `similarity` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.similarity` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `7c733344-4cce-4938-8013-53742fb46a90` |

**Sources**

- [WranglesPY similarity implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived similarity Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compare/_sources/similarity.md)

</details>


---

## Sort <CopyableCode value="sort" /> {#sort}

Sort the data

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "93",
  "status": "active",
  "description": "Sort the data",
  "additionalProperties": true,
  "required": [
    "by"
  ],
  "properties": {
    "by": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of the column(s) to sort by"
    },
    "ascending": {
      "type": [
        "boolean",
        "array"
      ],
      "items": {
        "type": "boolean"
      },
      "description": "Sort ascending vs. descending. Specify a list to sort multiple columns in different orders. If this is a list of bools then it must match the length of the by."
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

```yaml
wrangles:
  - sort:
      by: Price
      ascending: true
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Item | Price |
| --- | --- |
| Hammer | 11.99 |
| Chisel | 4.99 |
| Drill | 29.99 |
| Wrench | 6.99 |
| Saw | 13.99 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Item | Price |
| --- | --- |
| Chisel | 4.99 |
| Wrench | 6.99 |
| Hammer | 11.99 |
| Saw | 13.99 |
| Drill | 29.99 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `by` | Name or list of the column(s) to sort by | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `ascending` | Sort ascending vs. descending. Specify a list to sort multiple columns in different orders. If this is a list of bools then it must match the length of the by. | boolean, array | — | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `ignore_index` | Ignore Index value accepted by the runtime. | Any JSON value (not constrained upstream) | `true` | No |
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
| Catalog ID | `93` |
| Catalog key | `sort` |
| Recipe key | `sort` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.sort` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `1dcf06ad-898a-4d83-862c-4774be37a687` |

**Sources**

- [WranglesPY sort implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived sort Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/select/_sources/sort.md)

</details>


---

## SQL <CopyableCode value="sql" /> {#sql}

Apply a SQL command to the current dataframe. Only `SELECT` statements are supported; the result becomes the output. The current table is called `df`.

:::info
SQL does not currently work with objects. If your table contains objects, use `convert.to_json` before using SQL. SQL is not compatible with `where` filtering.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "94",
  "status": "active",
  "description": "Apply a SQL command to the current dataframe. Only SELECT statements are supported - the result will be the output.",
  "additionalProperties": false,
  "required": [
    "command"
  ],
  "properties": {
    "command": {
      "type": "string",
      "description": "SQL Command. The table is called df. For specific SQL syntax, this uses the SQLite dialect."
    },
    "params": {
      "type": [
        "array",
        "object"
      ],
      "description": "Variables to use in conjunctions with query.\nThis allows the query to be parameterized.\nThis uses sqlite syntax (? or :name)"
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

```yaml
wrangles:
  - sql:
      command: |
        SELECT header1, header2
        FROM df
        WHERE header1 >= 2
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| header1 | header2 | header3 |
| --- | --- | --- |
| 1 | a | x |
| 2 | b | y |
| 3 | c | z |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| header1 | header2 |
| --- | --- |
| 2 | b |
| 3 | c |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `command` | SQL Command. The table is called df. For specific SQL syntax, this uses the SQLite dialect. | string | — | Yes |
| `params` | Variables to use in conjunctions with query.<br />This allows the query to be parameterized.<br />This uses sqlite syntax (? or :name) | array, object | `null` | No |
| `preserve_data_types` | Preserve Data Types value accepted by the runtime. | Any JSON value (not constrained upstream) | `true` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `preserve_index` | Preserve Index value accepted by the runtime. | Any JSON value (not constrained upstream) | `false` | No |
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
| Catalog ID | `94` |
| Catalog key | `sql` |
| Recipe key | `sql` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.sql` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `467a06b1-a697-4d31-8061-7d83a719fd79` |

**Sources**

- [WranglesPY sql implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived sql Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/compute/_sources/sql.md)

</details>


---

## Translate <CopyableCode value="translate" /> {#translate}

Translate the input column to another language. Powered by DeepL.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "96",
  "status": "active",
  "description": "Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available).",
  "additionalProperties": false,
  "required": [
    "input",
    "output",
    "target_language"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name of the column to translate"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column"
    },
    "target_language": {
      "type": "string",
      "description": "Code of the language to translate to",
      "enum": [
        "Bulgarian",
        "Chinese",
        "Czech",
        "Danish",
        "Dutch",
        "English (American)",
        "English (British)",
        "Estonian",
        "Finnish",
        "French",
        "German",
        "Greek",
        "Hungarian",
        "Italian",
        "Japanese",
        "Latvian",
        "Lithuanian",
        "Polish",
        "Portuguese",
        "Portuguese (Brazilian)",
        "Romanian",
        "Russian",
        "Slovak",
        "Slovenian",
        "Spanish",
        "Swedish"
      ]
    },
    "source_language": {
      "type": "string",
      "description": "Code of the language to translate from. If omitted, automatically detects the input language",
      "enum": [
        "Auto",
        "Bulgarian",
        "Chinese",
        "Czech",
        "Danish",
        "Dutch",
        "English",
        "Estonian",
        "Finnish",
        "French",
        "German",
        "Greek",
        "Hungarian",
        "Italian",
        "Japanese",
        "Latvian",
        "Lithuanian",
        "Polish",
        "Portuguese",
        "Romanian",
        "Russian",
        "Slovak",
        "Slovenian",
        "Spanish",
        "Swedish"
      ]
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
  - translate:
      input: Español
      output: English
      source_language: Spanish
      target_language: English (British)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Español |
| --- |
| ¡Hola Mundo! |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| English |
| --- |
| Hello World! |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to translate | string, integer, array | — | Yes |
| `output` | Name of the output column | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `target_language` | Code of the language to translate to | string; one of:<ul className="ww-param-enum-values"><li>Bulgarian</li><li>Chinese</li><li>Czech</li><li>Danish</li><li>Dutch</li><li>English (American)</li><li>English (British)</li><li>Estonian</li><li>Finnish</li><li>French</li><li>German</li><li>Greek</li><li>Hungarian</li><li>Italian</li><li>Japanese</li><li>Latvian</li><li>Lithuanian</li><li>Polish</li><li>Portuguese</li><li>Portuguese (Brazilian)</li><li>Romanian</li><li>Russian</li><li>Slovak</li><li>Slovenian</li><li>Spanish</li><li>Swedish</li></ul> | — | Yes |
| `source_language` | Code of the language to translate from. If omitted, automatically detects the input language | string; one of:<ul className="ww-param-enum-values"><li>Auto</li><li>Bulgarian</li><li>Chinese</li><li>Czech</li><li>Danish</li><li>Dutch</li><li>English</li><li>Estonian</li><li>Finnish</li><li>French</li><li>German</li><li>Greek</li><li>Hungarian</li><li>Italian</li><li>Japanese</li><li>Latvian</li><li>Lithuanian</li><li>Polish</li><li>Portuguese</li><li>Romanian</li><li>Russian</li><li>Slovak</li><li>Slovenian</li><li>Spanish</li><li>Swedish</li></ul> | `"AUTO"` | No |
| `case` | Allow changing the case of the input prior to translation. | Any JSON value (not constrained upstream) | `null` | No |
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
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `96` |
| Catalog key | `translate` |
| Recipe key | `translate` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.translate` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `73c3ceb6-ffd8-4d74-8389-c83b99d33bb0` |

**Sources**

- [WranglesPY translate implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived translate Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/translate.md)

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
  "catalog_id": "97",
  "status": "active",
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
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.pandas.transpose` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `8716347f-f286-49b2-8a0b-cb73292e7475` |

**Sources**

- [WranglesPY transpose implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/pandas.py)
- [Archived transpose Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/transform/_sources/transpose.md)

</details>


---

## Try <CopyableCode value="try" /> {#try}

Run a list of wrangles and catch errors. When `except` is provided, its wrangles or fallback column values run after an error; otherwise, the error is logged and the recipe continues.

The runtime supports both forms, but the pinned upstream schema only permits a
dictionary for `except`. Use fallback column values for schema-validated recipes.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "98",
  "status": "active",
  "description": "Try a list of wrangles and catch any errors that occur",
  "required": [
    "wrangles"
  ],
  "properties": {
    "wrangles": {
      "type": "array",
      "description": "List of wrangles to apply",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
    },
    "except": {
      "type": [
        "object"
      ],
      "description": "An action to take if the wrangles encounter an error.\nThis can contain a list of wrangles or a dictionary of column names and values.\nIf except is not provided, the error will be logged and the recipe will continue.",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/wrangles/items"
      }
    },
    "retries": {
      "type": "integer",
      "description": "Number of times to retry the wrangles if an error occurs. Default 0.",
      "minimum": 0
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

This input deliberately lacks `column`, so the conversion raises a missing-column error and `except` creates it with the fallback value. Invalid numeric text alone does not trigger this fallback: `convert.data_type` retains unconvertible values unless a default is provided.



```yaml
wrangles:
  - try:
      wrangles:
        - convert.data_type:
            input: column
            data_type: int
      except:
        column: unavailable
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| Hammer |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| column |
| --- |
| unavailable |

</div>

</div>



The same recipe preserves a successful conversion rather than applying the fallback.

```yaml
wrangles:
  - try:
      wrangles:
        - convert.data_type:
            input: column
            data_type: int
      except:
        column: unavailable
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| "42" |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| column |
| --- |
| 42 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `wrangles` | List of wrangles to apply | array | — | Yes |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Number of times to retry the wrangles if an error occurs. Default 0. | integer | `0` | No |
| `except` | An action to take if the wrangles encounter an error.<br />This can contain a list of wrangles or a dictionary of column names and values.<br />If except is not provided, the error will be logged and the recipe will continue. | object | — | No |
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
| Catalog ID | `98` |
| Catalog key | `try` |
| Recipe key | `try` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Error-control orchestration is not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.Try` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY try implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived try Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/try.md)

</details>


---

## Maths (Deprecated) <CopyableCode value="maths" /> {#maths}

:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use [`math`](/py/namespaces/other#math) for new recipes.
:::

### Behavior

Deprecated alias for `math`; evaluate an expression and write its result to an output column.

This guidance was derived from the callable signature.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: deprecated-alias:math. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).

Compatibility correction: Exclude math's catalog_id from the maths alias schema.

Compatibility correction: Exclude math's status from the maths alias schema.

```json
{
  "type": "object",
  "description": "Apply a mathematical calculation.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "The mathematical expression using column names. e.g. column1 * column2\n+ column3.  Note: spaces within column names are replaced by underscores (_).\n"
    },
    "output": {
      "type": "string",
      "description": "The column to output the results to"
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



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The mathematical expression using column names. e.g. column1 * column2<br />+ column3.  Note: spaces within column names are replaced by underscores (_).<br /> | string, integer | — | Yes |
| `output` | The column to output the results to | string | — | Yes |
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
| Catalog ID | `83` |
| Catalog key | `maths` |
| Recipe key | `maths` |
| Catalog status | active |
| Lifecycle status | deprecated |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Deprecated compatibility key; use math. |
| Replaced by | [`math`](/py/namespaces/other#math) |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.maths` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY maths implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)

</details>


---

## Standardize (Deprecated) <CopyableCode value="standardize" /> {#standardize}

:::warning Deprecated
This compatibility wrangle remains available for existing recipes. Use [`standardize.custom`](/py/namespaces/standardize#custom) for new recipes.
:::

Run a standardize wrangle, such as one that expands abbreviations. A standardization wrangle must be trained first.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "95",
  "status": "active",
  "description": "Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.",
  "required": [
    "input"
  ],
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
      "description": "Name or list of output columns"
    },
    "model_id": {
      "type": [
        "string",
        "array"
      ],
      "description": "The ID of the wrangle to use (do not include 'find' and 'replace')"
    },
    "case_sensitive": {
      "type": "boolean",
      "description": "Allows the wrangle to be case sensitive if set to True, default is False."
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
  - standardize:
      input: Abbrev
      output: Abbreviations
      model_id: code_here
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Abbrev |
| --- |
| ASAP |
| ETA |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Abbreviations |
| --- |
| As Soon As Possible |
| Estimated Time of Arrival |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `case_sensitive` | Allows the wrangle to be case sensitive if set to True, default is False. | boolean | `false` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `model_id` | The ID of the wrangle to use (do not include 'find' and 'replace') | string, array | — | No |
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
| Requires WrangleWorks account | Yes |
| Requires subscription | No |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `95` |
| Catalog key | `standardize` |
| Recipe key | `standardize` |
| Catalog status | active |
| Lifecycle status | deprecated |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Deprecated compatibility key; use standardize.custom. |
| Replaced by | [`standardize.custom`](/py/namespaces/standardize#custom) |
| Namespace | Root-level |
| Documentation group | `other` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.standardize` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `53cd3fdd-24e2-4411-8655-6014b92a3f3a` |

**Sources**

- [WranglesPY standardize implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived standardize Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/standardize.md)

</details>
