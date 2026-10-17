---
title: "Utility Wrangles"
description: "Utility wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Utility"
slug: "/namespaces/utility"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Utility Wrangles

Utility wrangles, with recipe examples, parameters, and behavior.

## Accordion <CopyableCode value="accordion" /> {#accordion}

Apply a series of wrangles to column(s) containing lists. The wrangles will be applied to each element in the list and the results will be returned back as a list.

Apply a series of wrangles to the individual elements of one or more lists.

### Parameters

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

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
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
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.accordion` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY accordion implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived accordion Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/accordion.md)

</details>


---

## Batch <CopyableCode value="batch" /> {#batch}

Split the data into batches for executing a list of wrangles. Use this in situations such as where the intermediate data is too large to fit in memory.

Execute a series of wrangles in batches. Batches can run in parallel with `threads` and can provide fallback output when an error occurs.

### Parameters

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

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
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
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.batch` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY batch implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived batch Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/batch.md)

</details>


---

## Concurrent <CopyableCode value="concurrent" /> {#concurrent}

Run multiple wrangles concurrently rather than sequentially. Wrangles must specify output columns to be used concurrently. When using concurrent, Wrangles may not complete in a predictable order and it is not recommended to update overlapping columns with different wrangles.

Run multiple wrangles concurrently instead of sequentially. Concurrent wrangles must declare output columns, may finish in any order, and should not update overlapping columns.

See the [Concurrent connector](/py/connectors/concurrent) for the connector equivalent.

### Parameters

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

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
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
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.concurrent` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY concurrent implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived concurrent Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/concurrent.md)

</details>


---

## Log <CopyableCode value="log" /> {#log}

Log the current status of the dataframe.

Print the current status of the dataframe. Only a sample of rows is logged.

### Parameters

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

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
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

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_Logs a sample of rows or status information to the configured destination._

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

_Logging side-effect; no tabular input sample._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_Logs a sample of rows or status information to the configured destination._

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
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.log` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `6177808e-aa2d-4d0b-8385-858b16948a5d` |

**Sources**

- [WranglesPY log implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived log Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/log.md)

</details>


---

## Matrix <CopyableCode value="matrix" /> {#matrix}

Apply a matrix of wrangles to the dataframe. This will run the wrangles for each combination of the variables.

Apply a matrix of wrangles to the dataframe. Each wrangle runs for the configured combinations of variables, including recipe variables and variables declared by the `variables` parameter.

See the [Matrix connector](/py/connectors/matrix) for the connector equivalent.

### Parameters

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

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
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
def test_fn(part_code, value):
    return part_code + value
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
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.matrix` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY matrix implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived matrix Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/matrix.md)

</details>


---

## Recipe <CopyableCode value="recipe" /> {#recipe}

Run another recipe as a wrangle against the current dataframe.

### Behavior

Run another recipe as a wrangle against the current dataframe.

This guidance was derived from the callable signature and its embedded Python schema docstring.

### Parameters

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

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
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
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.recipe` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY recipe implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)

</details>


---

## Try <CopyableCode value="try" /> {#try}

Try a list of wrangles and catch any errors that occur.

Run a list of wrangles and catch errors. When `except` is provided, its wrangles or fallback column values run after an error; otherwise, the error is logged and the recipe continues.

The runtime supports both forms, but the pinned upstream schema only permits a
dictionary for `except`. Use fallback column values for schema-validated recipes.

### Parameters

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

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
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

_The input dataframe is passed to the primary wrangles._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

_The primary result is returned on success; the `except` result is returned after an error._

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
| Catalog ID | `98` |
| Catalog key | `try` |
| Recipe key | `try` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Error-control orchestration is not supported in the baseline. |
| Namespace | Root-level |
| Documentation group | `utility` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.Try` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY try implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived try Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/utility/_sources/try.md)

</details>
