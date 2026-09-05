---
title: "Create Wrangles"
description: "Create wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Create"
slug: "/namespaces/create"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Create Wrangles

Create wrangles, with recipe examples, parameters, and behavior.

## Bins {#bins}

Create a column that groups data into bins.

Creates a column that segments and sorts data values into bins. `bins` can be an integer or a list. When `bins` is an integer, the input data is split equally into that number of bins. When `bins` is a list, the input data is split based on the list boundaries.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of input column. | string, integer, array | — | Yes |
| `output` | Name of new column. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `bins` | Defines the number of equal-width bins in the range. | integer, array | — | Yes |
| `labels` | Labels for the returned bins. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - create.bins:
      input: Data
      output: Category
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
      input: Grades
      output: Letter Grade
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
| Recipe key | `create.bins` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.bins` |

**Sources**

- [WranglesPY create.bins implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.bins Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/bins.md)

</details>


---

## Column {#column}

Create column(s) with a user defined value. Defaults to None (empty).

Create column(s) with a user defined value. Defaults to `None` (empty). If you need to copy an existing column, use the copy wrangle instead.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns or column_name: value pairs. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `value` | (Optional) Value(s) to add in the new column(s). If using a dictionary in output, value can only be a string. | string, number, object, array, boolean, null | `null` | No |
| `value_if_exists` | Determines behaviour when the output column already exists. existing (default): leave the column unchanged. coalesce: fill empty/null cells with the new value, keeping non-null cells. new: overwrite the entire column with the new value. | string; one of:<ul className="ww-param-enum-values"><li>existing</li><li>coalesce</li><li>new</li></ul> | `"existing"` | No |
| `coalesce_value` | Only used when value_if_exists is coalesce. Determines which side is preferred when both the existing and new values are non-empty. existing (default): keep the existing value, only fill empty/null cells with the new value. new: keep the new value, only fall back to the existing value where the new value is empty/null. | string; one of:<ul className="ww-param-enum-values"><li>existing</li><li>new</li></ul> | `"existing"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

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
| Recipe key | `create.column` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.column` |

**Sources**

- [WranglesPY create.column implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.column Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/column.md)

</details>


---

## Embeddings {#embeddings}

Create an embedding based on text input.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | The column of text to create the embeddings for. | string | — | Yes |
| `output` | The output column the embeddings will be saved as. | string, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `task` | The task type for the embedding model. Only applicable for the Jina provider. Selects the appropriate task-specific adapter. | string, null; one of:<ul className="ww-param-enum-values"><li>retrieval.query</li><li>retrieval.passage</li><li>text-matching</li><li>classification</li><li>separation</li></ul> | `null` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `output_type` | Output the embeddings as a numpy array or a python list Default - python list. | string; one of:<ul className="ww-param-enum-values"><li>numpy array</li><li>python list</li></ul> | `"python list"` | No |
| `precision` | The precision of the embeddings. Default is float32. This should be used with output_type numpy array. | string; one of:<ul className="ww-param-enum-values"><li>float16</li><li>float32</li></ul> | `"float32"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |
| <span className="ww-param-group-label">Execution</span> |  |  |  |  |
| `batch_size` | The number of rows to submit per individual request. | integer | `100` | No |
| `threads` | The number of requests to submit in parallel. Each request contains the number of rows set as batch_size. | integer | `10` | No |
| <span className="ww-param-group-label">Errors</span> |  |  |  |  |
| `retries` | The number of times to retry if the request fails. This will apply exponential backoff to help with rate limiting. | integer | `0` | No |
| <span className="ww-param-group-label">Details</span> |  |  |  |  |
| `api_key` | The API key. | string | — | Yes |
| `model` | The specific model to use to generate the embeddings. | string | `"text-embedding-3-small"` | No |
| `url` | The endpoint to send embedding requests to. Defaults to the standard endpoint for the resolved provider. Setting a Jina URL without an explicit provider will automatically use Jina's request/response format. | string | `"https://api.openai.com/v1/embeddings"` | No |
| `provider` | Controls the request/response format for the embedding API. When omitted, inferred from url (jina.ai → jina, otherwise openai). Setting provider also sets the default url for that provider, so you only need one of provider or url for standard endpoints. Use both together only when pointing to a custom endpoint that uses a non-default provider's API format (e.g. a Jina-compatible proxy). | string, null; one of:<ul className="ww-param-enum-values"><li>openai</li><li>jina</li></ul> | `null` | No |

</div>

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
| Recipe key | `create.embeddings` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.embeddings` |

**Sources**

- [WranglesPY create.embeddings implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.embeddings Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/embeddings.md)

</details>


---

## GUID {#guid}

Create column(s) with a GUID.

Create a column with a GUID (Globally Unique Identifier).

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns. | string, array | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - create.guid:
      output: GUID Column

  # OR

  - create.uuid:
      output: GUID Column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GUID Column |
| --- |
| 9a13b4dd-1993-4bd2-8974-3f9a0f006d86 |
| 1528d918-ecd7-457c-b44d-3d30705696d3 |

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
| Recipe key | `create.guid` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.guid` |

**Sources**

- [WranglesPY create.guid implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.guid Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/guid.md)

</details>


---

## Hash {#hash}

Create a hash of a column.



### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of input column. | string, integer, array | — | Yes |
| `output` | Name of new column. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The method to use to hash the input (Default: md5). | string; one of:<ul className="ww-param-enum-values"><li>md5</li><li>sha1</li><li>sha256</li><li>sha512</li></ul> | `"md5"` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

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

| New Column |
| --- |
| ce114e4501d2f4e2dcea3e17b546f339 |
| a54d88e06612d820bc3be72877c74f257b561b19 |

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
| Recipe key | `create.hash` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.hash` |

**Sources**

- [WranglesPY create.hash implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.hash Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/hash.md)

</details>


---

## Index {#index}

Create column(s) with an incremental index. e.g. 1,2,3...

Create a new incremental index.

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns. | string, array | — | Yes |
| `by` | Optional. Cluster the created indexes by one or more columns. | string, array, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `start` | (Optional; default 1) Starting number for the index. | integer | `1` | No |
| `step` | (Optional; default 1) Step between successive rows. | integer | `1` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

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

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| New Index |
| --- |
| 1 |
| 2 |

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
| Recipe key | `create.index` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.index` |

**Sources**

- [WranglesPY create.index implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.index Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/index.md)

</details>


---

## Jinja {#jinja}

Output text using a jinja template.

Makes use of a Jinja template to create a description, title, or summary based on your data.

:::info
Jinja templates do not allow variables with spaces. This wrangle automatically replaces spaces in column headers with underscores, so use underscores instead of spaces when referencing columns in the template.
:::

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name of the column to be output to. | array | — | Yes |
| `input` | Specify a name of column containing a dictionary of elements to be used in jinja template. Otherwise, the column headers will be used as keys. | string, null | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `template` | A dictionary which defines the template/location as well as the form which the template is input. If any keys use a space, they must be replaced with an underscore. Note: spaces within column names are replaced by underscores (_). | object | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

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
| Recipe key | `create.jinja` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.jinja` |

**Sources**

- [WranglesPY create.jinja implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.jinja Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/jinja.md)

</details>


---

## UUID {#uuid}

Create column(s) with a UUID.

Create a column with a UUID (Universally Unique Identifier).

### Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `output` | Name or list of names of new columns. | string, array | — | Yes |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

### Examples

```yaml
wrangles:
  - create.guid:
      output: GUID Column

  # OR

  - create.uuid:
      output: GUID Column
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

_No sample available._

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| GUID Column |
| --- |
| 9a13b4dd-1993-4bd2-8974-3f9a0f006d86 |
| 1528d918-ecd7-457c-b44d-3d30705696d3 |

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
| Recipe key | `create.uuid` |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `create` |
| Documentation group | `create` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.create.uuid` |

**Sources**

- [WranglesPY create.uuid implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.uuid Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/uuid.md)

</details>
