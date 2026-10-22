---
title: "Create Wrangles"
description: "Create wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Create"
slug: "/namespaces/create"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Create Wrangles

Create wrangles, with recipe examples, parameters, and behavior.

## Bins <CopyableCode value="create.bins" /> {#bins}

Creates a column that segments and sorts data values into bins. `bins` can be an integer or a list. When `bins` is an integer, the input data is split equally into that number of bins. When `bins` is a list, the input data is split based on the list boundaries.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create a column that groups data into bins",
  "additionalProperties": false,
  "required": [
    "input",
    "output",
    "bins"
  ],
  "properties": {
    "input": {
      "type": [
        "array"
      ],
      "description": "Name of input column"
    },
    "output": {
      "type": [
        "array"
      ],
      "description": "Name of new column"
    },
    "bins": {
      "type": [
        "integer",
        "array"
      ],
      "description": "Defines the number of equal-width bins in the range"
    },
    "labels": {
      "type": [
        "string",
        "array"
      ],
      "description": "Labels for the returned bins"
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
  - create.bins:
      input: [Data]
      output: [Category]
      bins: 3
      labels:
        - Bad
        - Medium
        - Good
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Data |
| --- |
| 1 |
| 7 |
| 5 |
| 4 |
| 6 |
| 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Category |
| --- |
| Bad |
| Good |
| Medium |
| Medium |
| Good |
| Bad |

</div>

</div>





```yaml
wrangles:
  - create.bins:
      input: [Grade]
      output: [Letter Grade]
      bins:
        - 0
        - 60
        - 70
        - 80
        - 90
        - 100
      labels:
        - F
        - D
        - C
        - B
        - A
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Grade | Student |
| --- | --- |
| 64 | Charles |
| 92 | Sabrina |
| 76 | Edward |
| 84 | Wendy |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Letter Grade |
| --- |
| D |
| A |
| C |
| B |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of input column | array | — | Yes |
| `output` | Name of new column | array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `bins` | Defines the number of equal-width bins in the range | integer, array | — | Yes |
| `labels` | Labels for the returned bins | string, array | `null` | No |
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
| Catalog ID | `12` |
| Catalog key | `create.bins` |
| Recipe key | `create.bins` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.bins` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `232e3ba0-4735-4934-88aa-0163181abb3f` |

**Sources**

- [WranglesPY create.bins implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.bins Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/bins.md)

</details>


---

## Column <CopyableCode value="create.column" /> {#column}

Create column(s) with a user defined value. Defaults to `None` (empty). If you need to copy an existing column, use the copy wrangle instead.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create column(s) with a user defined value. Defaults to None (empty).",
  "additionalProperties": false,
  "required": [
    "output"
  ],
  "properties": {
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of names of new columns or column_name: value pairs."
    },
    "value": {
      "type": [
        "string",
        "number",
        "object",
        "array",
        "boolean"
      ],
      "description": "(Optional) Value(s) to add in the new column(s). If using a dictionary in output, value can only be a string."
    },
    "value_if_exists": {
      "type": "string",
      "description": "Determines behaviour when the output column already exists. existing (default): leave the column unchanged. coalesce: fill empty/null cells with the new value, keeping non-null cells. new: overwrite the entire column with the new value.",
      "enum": [
        "existing",
        "coalesce",
        "new"
      ]
    },
    "coalesce_value": {
      "type": "string",
      "description": "Only used when value_if_exists is coalesce. Determines which side is preferred when both the existing and new values are non-empty. existing (default): keep the existing value, only fill empty/null cells with the new value. new: keep the new value, only fall back to the existing value where the new value is empty/null.",
      "enum": [
        "existing",
        "new"
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
  - create.column:
      output: New Column
      value: new value      # Optional, otherwise empty
      where: column > 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Column |
| --- |
|  |
| new value |
| new value |

</div>

</div>





```yaml
wrangles:
  - create.column:
      output:
        - New Column 1: new value 1 # Optional, otherwise empty
        - New Column 2: new value 2
        - New Column 3: new value 1
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Column 1 | New Column 2 | New Column 3 |
| --- | --- | --- |
| new value 1 | new value 2 | new value 1 |
| new value 1 | new value 2 | new value 1 |
| new value 1 | new value 2 | new value 1 |

</div>

</div>





```yaml
wrangles:
  - create.column:
      output:
        - New Column:
            - 4
            - 5
            - 6
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| column |
| --- |
| 1 |
| 2 |
| 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Column |
| --- |
| [4, 5, 6] |
| [4, 5, 6] |
| [4, 5, 6] |

</div>

</div>

Columns of empty lists can also be created by passing an empty list (`[]`) as the column value.

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns or column_name: value pairs. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `value` | (Optional) Value(s) to add in the new column(s). If using a dictionary in output, value can only be a string. | string, number, object, array, boolean | `null` | No |
| `value_if_exists` | Determines behaviour when the output column already exists. existing (default): leave the column unchanged. coalesce: fill empty/null cells with the new value, keeping non-null cells. new: overwrite the entire column with the new value. | string; one of:<ul className="ww-param-enum-values"><li>existing</li><li>coalesce</li><li>new</li></ul> | `"existing"` | No |
| `coalesce_value` | Only used when value_if_exists is coalesce. Determines which side is preferred when both the existing and new values are non-empty. existing (default): keep the existing value, only fill empty/null cells with the new value. new: keep the new value, only fall back to the existing value where the new value is empty/null. | string; one of:<ul className="ww-param-enum-values"><li>existing</li><li>new</li></ul> | `"existing"` | No |
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
| Catalog ID | `13` |
| Catalog key | `create.column` |
| Recipe key | `create.column` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.column` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `5a18e2c8-ec7c-45f5-88fd-bb5c358a8b40` |

**Sources**

- [WranglesPY create.column implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.column Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/column.md)

</details>


---

## Embeddings <CopyableCode value="create.embeddings" /> {#embeddings}

Create an embedding based on text input.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create an embedding based on text input.",
  "required": [
    "input",
    "api_key"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "The column of text to create the embeddings for."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "The output column the embeddings will be saved as."
    },
    "api_key": {
      "type": "string",
      "description": "The API key."
    },
    "model": {
      "type": "string",
      "description": "The embedding model. Defaults to the AI configuration for the resolved provider. Jina requires an explicit model unless a default is configured."
    },
    "batch_size": {
      "type": "integer",
      "description": "The number of rows to submit per individual request."
    },
    "threads": {
      "type": "integer",
      "description": "The number of requests to submit in parallel. Each request contains the number of rows set as batch_size."
    },
    "output_type": {
      "type": "string",
      "description": "Output the embeddings as a numpy array or a python list Default - python list.",
      "enum": [
        "numpy array",
        "python list"
      ]
    },
    "retries": {
      "type": "integer",
      "minimum": 0,
      "description": "Additional attempts after transient transport or HTTP errors. Defaults to the AI configuration. Retries use exponential backoff and respect Retry-After. Permanent errors fail immediately."
    },
    "timeout": {
      "type": "number",
      "exclusiveMinimum": 0,
      "description": "Request timeout in seconds for each attempt. Defaults to the AI configuration. Each retry receives the full timeout; this is not a total batch deadline."
    },
    "provider": {
      "type": "string",
      "description": "Controls the request/response format for the embedding API. When omitted, inferred from an explicit url (jina.ai → jina, otherwise openai), or the AI configuration when no url is supplied. Setting provider also sets the default url for that provider, so you only need one of provider or url for standard endpoints. Use both together only when pointing to a custom endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy).",
      "enum": [
        "openai",
        "jina"
      ]
    },
    "url": {
      "type": "string",
      "description": "The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved provider. Setting a Jina URL without an explicit provider will automatically use Jina's request/response format."
    },
    "precision": {
      "type": "string",
      "description": "The precision of the embeddings. Defaults to the AI configuration. This should be used with output_type numpy array.",
      "enum": [
        "float16",
        "float32"
      ]
    },
    "task": {
      "type": "string",
      "description": "The task type for the embedding model. Only applicable for the Jina provider. Selects the appropriate task-specific adapter. Defaults and allowed values come from the selected model's AI configuration. Jina v5 supports retrieval.query, retrieval.passage, text-matching, classification, and clustering. Legacy models without a configured task enum also support retrieval.query, retrieval.passage, text-matching, and classification, but use separation for clustering."
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
      input: my_column
      api_key: ${my_key}
      output: embeddings
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| my_column |
| --- |
| angle grinder |
| jig saw |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| embeddings |
| --- |
| [0.010793785, -0.010007165, 0.0028609, -0.0139...] |
| [-0.008975127, 0.009314879, -0.024150735, -0.0...] |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The column of text to create the embeddings for. | string, integer, array | — | Yes |
| `output` | The output column the embeddings will be saved as. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `task` | The task type for the embedding model. Only applicable for the Jina provider. Selects the appropriate task-specific adapter. Defaults and allowed values come from the selected model's AI configuration. Jina v5 supports retrieval.query, retrieval.passage, text-matching, classification, and clustering. Legacy models without a configured task enum also support retrieval.query, retrieval.passage, text-matching, and classification, but use separation for clustering. | string | `null` | No |
| `timeout` | Request timeout in seconds for each attempt. Defaults to the AI configuration. Each retry receives the full timeout; this is not a total batch deadline. | number | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_type` | Output the embeddings as a numpy array or a python list Default - python list. | string; one of:<ul className="ww-param-enum-values"><li>numpy array</li><li>python list</li></ul> | `"python list"` | No |
| `precision` | The precision of the embeddings. Defaults to the AI configuration. This should be used with output_type numpy array. | string; one of:<ul className="ww-param-enum-values"><li>float16</li><li>float32</li></ul> | `null` | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `batch_size` | The number of rows to submit per individual request. | integer | `null` | No |
| `threads` | The number of requests to submit in parallel. Each request contains the number of rows set as batch_size. | integer | `null` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | Additional attempts after transient transport or HTTP errors. Defaults to the AI configuration. Retries use exponential backoff and respect Retry-After. Permanent errors fail immediately. | integer | `null` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_key` | The API key. | string | — | Yes |
| `model` | The embedding model. Defaults to the AI configuration for the resolved provider. Jina requires an explicit model unless a default is configured. | string | `null` | No |
| `url` | The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved provider. Setting a Jina URL without an explicit provider will automatically use Jina's request/response format. | string | `null` | No |
| `provider` | Controls the request/response format for the embedding API. When omitted, inferred from an explicit url (jina.ai → jina, otherwise openai), or the AI configuration when no url is supplied. Setting provider also sets the default url for that provider, so you only need one of provider or url for standard endpoints. Use both together only when pointing to a custom endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy). | string; one of:<ul className="ww-param-enum-values"><li>openai</li><li>jina</li></ul> | `null` | No |
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
| Catalog ID | `14` |
| Catalog key | `create.embeddings` |
| Recipe key | `create.embeddings` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.embeddings` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `e3518afd-a819-40ec-8b49-eb25690220c1` |

**Sources**

- [WranglesPY create.embeddings implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.embeddings Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/embeddings.md)

</details>


---

## GUID <CopyableCode value="create.guid" /> {#guid}

Create a column with a GUID (Globally Unique Identifier).

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create column(s) with a GUID.",
  "additionalProperties": false,
  "required": [
    "output"
  ],
  "properties": {
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of names of new columns"
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

A new random UUID is generated for each input row. The values below are illustrative and change on every run.



```yaml
wrangles:
  - create.guid:
      output: GUID Column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| Hammer |
| Drill |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GUID Column |
| --- |
| 9a13b4dd-1993-4bd2-8974-3f9a0f006d86 |
| 1528d918-ecd7-457c-b44d-3d30705696d3 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns | string, array | — | Yes |
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
| Catalog ID | `15` |
| Catalog key | `create.guid` |
| Recipe key | `create.guid` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.guid` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `cf3aaab2-3d5b-4c9b-826e-7af7510521c9` |

**Sources**

- [WranglesPY create.guid implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.guid Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/guid.md)

</details>


---

## Hash <CopyableCode value="create.hash" /> {#hash}

Create a hash of a column.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create a hash of a column",
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
      "description": "Name of input column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of new column"
    },
    "method": {
      "type": "string",
      "description": "The method to use to hash the input (Default: md5)",
      "enum": [
        "md5",
        "sha1",
        "sha256",
        "sha512"
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
  - create.hash:
      input: Description
      output: hash
      method: md5
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Description |
| --- |
| The wrench is blue |
| The hammer is yellow |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| hash |
| --- |
| 512612f9ed5f71c9c13bd63eb140783a |
| 65820c4addbaaef6a067cdcf5c856706 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of input column | string, integer, array | — | Yes |
| `output` | Name of new column | string, array | — | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The method to use to hash the input (Default: md5) | string; one of:<ul className="ww-param-enum-values"><li>md5</li><li>sha1</li><li>sha256</li><li>sha512</li></ul> | `"md5"` | No |
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
| Catalog ID | `16` |
| Catalog key | `create.hash` |
| Recipe key | `create.hash` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.hash` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `11e8fc13-00d2-4779-8d87-6288b07de7e7` |

**Sources**

- [WranglesPY create.hash implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.hash Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/hash.md)

</details>


---

## Index <CopyableCode value="create.index" /> {#index}

Create a new incremental index.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create column(s) with an incremental index. e.g. 1,2,3...",
  "additionalProperties": false,
  "required": [
    "output"
  ],
  "properties": {
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of names of new columns"
    },
    "start": {
      "type": "integer",
      "description": "(Optional; default 1) Starting number for the index"
    },
    "step": {
      "type": "integer",
      "description": "(Optional; default 1) Step between successive rows"
    },
    "by": {
      "type": [
        "string",
        "array"
      ],
      "description": "Optional. Cluster the created indexes by one or more columns"
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
  - create.index:
      output: New Index
      start: 1    # optional
      step: 1     # optional
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| Hammer |
| Drill |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Index |
| --- |
| 1 |
| 2 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns | string, array | — | Yes |
| `by` | Optional. Cluster the created indexes by one or more columns | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `start` | (Optional; default 1) Starting number for the index | integer | `1` | No |
| `step` | (Optional; default 1) Step between successive rows | integer | `1` | No |
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
| Catalog ID | `17` |
| Catalog key | `create.index` |
| Recipe key | `create.index` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.index` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `0a4909ca-6e14-4da7-8a70-a7fd106d6944` |

**Sources**

- [WranglesPY create.index implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.index Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/index.md)

</details>


---

## Jinja <CopyableCode value="create.jinja" /> {#jinja}

Makes use of a Jinja template to create a description, title, or summary based on your data.

:::info
Jinja templates do not allow variables with spaces. This wrangle automatically replaces spaces in column headers with underscores, so use underscores instead of spaces when referencing columns in the template.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Output text using a jinja template",
  "additionalProperties": false,
  "required": [
    "output",
    "template"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer"
      ],
      "description": "Specify a name of column containing a dictionary of elements to be used in jinja template.\nOtherwise, the column headers will be used as keys.\n"
    },
    "output": {
      "type": "string",
      "description": "Name of the column to be output to."
    },
    "template": {
      "type": "object",
      "description": "A dictionary which defines the template/location as well as the form which the template is input.\nIf any keys use a space, they must be replaced with an underscore.  Note: spaces within column names\nare replaced by underscores (_).\n",
      "additionalProperties": false,
      "properties": {
        "file": {
          "type": "string",
          "description": "A .jinja file containing the template"
        },
        "column": {
          "type": "string",
          "description": "A column containing the jinja template - this will apply to the corresponding row."
        },
        "string": {
          "type": "string",
          "description": "A string which is used as the jinja template"
        }
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

```yaml
wrangles:
  - create.jinja:
      output: Description
      template:
        string: |
          This is a {{ Brand }} {{ Item_Type }} that is {{ Size }}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Size | Brand | Item Type |
| --- | --- | --- |
| 10mm | SKF | ball bearing |
| 15mm | Timken | bearing seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Description |
| --- |
| This is a SKF ball bearing that is 10mm |
| This is a Timken bearing seal that is 15mm |

</div>

</div>

Using `|` in YAML denotes a multi-line string that preserves line breaks. Use `>` for a multi-line string when line breaks should not be preserved.

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name of the column to be output to. | string | — | Yes |
| `input` | Specify a name of column containing a dictionary of elements to be used in jinja template.<br />Otherwise, the column headers will be used as keys.<br /> | string, integer | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `template` | A dictionary which defines the template/location as well as the form which the template is input.<br />If any keys use a space, they must be replaced with an underscore.  Note: spaces within column names<br />are replaced by underscores (_).<br /> | object | — | Yes |
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
| Catalog ID | `18` |
| Catalog key | `create.jinja` |
| Recipe key | `create.jinja` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.jinja` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `10fc6709-16d4-4eab-8f56-6cb5d170ea66` |

**Sources**

- [WranglesPY create.jinja implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.jinja Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/jinja.md)

</details>


---

## UUID <CopyableCode value="create.uuid" /> {#uuid}

Create a column with a UUID (Universally Unique Identifier).

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create column(s) with a UUID.",
  "additionalProperties": false,
  "required": [
    "output"
  ],
  "properties": {
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of names of new columns"
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

A new random UUID is generated for each input row. The values below are illustrative and change on every run.



```yaml
wrangles:
  - create.uuid:
      output: GUID Column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product |
| --- |
| Hammer |
| Drill |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GUID Column |
| --- |
| 9a13b4dd-1993-4bd2-8974-3f9a0f006d86 |
| 1528d918-ecd7-457c-b44d-3d30705696d3 |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns | string, array | — | Yes |
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
| Catalog ID | `19` |
| Catalog key | `create.uuid` |
| Recipe key | `create.uuid` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.uuid` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `c376f3ff-2283-4c4c-8d7f-70db6f53ed19` |

**Sources**

- [WranglesPY create.uuid implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Archived create.uuid Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/create/_sources/uuid.md)

</details>
