---
title: "Merge Wrangles"
description: "Merge wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Merge"
slug: "/namespaces/merge"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Merge Wrangles

Merge wrangles, with recipe examples, parameters, and behavior.

## Coalesce <CopyableCode value="merge.coalesce" /> {#coalesce}

Take the first non-empty value from a series of columns.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Take the first non-empty value from a series of columns or lists.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": [
        "array",
        "string",
        "integer"
      ],
      "description": "List of input columns or a single column containing lists"
    },
    "output": {
      "type": "string",
      "description": "Name of the output columns. This is required if multiple input columns are provided."
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
  - merge.coalesce:
      input:
        - Col1
        - Col2
        - Col3
      output: Output Col
      where: Col2 = 'E'
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |
| D | E | F |
| G | H | I |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Output Col |
| --- |
|  |
| D |
|  |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns or a single column containing lists | array, string, integer | — | Yes |
| `output` | Name of the output columns. This is required if multiple input columns are provided. | string | `null` | No |
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
| Catalog ID | `40` |
| Catalog key | `merge.coalesce` |
| Recipe key | `merge.coalesce` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.coalesce` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `25c1a60d-fa48-4b9a-8c03-0921d5b31049` |

**Sources**

- [WranglesPY merge.coalesce implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.coalesce Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/coalesce.md)

</details>


---

## Concatenate <CopyableCode value="merge.concatenate" /> {#concatenate}

If the input is a list of columns, concatenate multiple columns into one as a delimited string. If the input is a single column, concatenate a list within that column into a delimited string.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Concatenate a list of columns or a list within a single column.",
  "additionalProperties": false,
  "required": [
    "input",
    "output",
    "char"
  ],
  "properties": {
    "input": {
      "type": [
        "array",
        "string",
        "integer"
      ],
      "description": "Either a single column name or list of columns"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "char": {
      "type": "string",
      "description": "(Optional) Character to add between successive values"
    },
    "skip_empty": {
      "type": "boolean",
      "desription": "Whether to skip empty values",
      "default": false
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
# Using concatenate to combine multiple columns
wrangles:
  - merge.concatenate:
      input:
        - Col1
        - Col2
        - Col3
      output: Join Col
      char: ', '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Join Col |
| --- |
| A, B, C |

</div>

</div>





```yaml
# Using concatenate to join a column that is a list
wrangles:
  - merge.concatenate:
      input: Col1
      output: Join List
      char: ' '
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 |
| --- |
| ['A', 'B', 'C'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Join List |
| --- |
| A B C |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Either a single column name or list of columns | array, string, integer | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `skip_empty` | Whether to skip empty values, defaults to false. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `char` | (Optional) Character to add between successive values | string | `","` | Yes |
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
| Catalog ID | `41` |
| Catalog key | `merge.concatenate` |
| Recipe key | `merge.concatenate` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.concatenate` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `6ff76728-e1f6-4d3d-8946-6aa3b7524b3f` |

**Sources**

- [WranglesPY merge.concatenate implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.concatenate Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/concatenate.md)

</details>


---

## Dictionaries <CopyableCode value="merge.dictionaries" /> {#dictionaries}

Take dictionaries in multiple columns and merge them to a single dictionary.

:::note
For duplicate keys, the last key in the input list takes precedence in the merged dictionary.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Take dictionaries in multiple columns and merge them to a single dictionary.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": "array",
      "description": "list of input columns"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "skip_empty": {
      "type": "boolean",
      "description": "Whether to skip empty dictionaries when merging",
      "default": false
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
  - merge.dictionaries:
      input:
        - Dict 1
        - Dict 2
      output: Merged
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Dict 1 | Dict 2 |
| --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Merged |
| --- |
| \{'First': 'One', 'Second': 'Two'\} |

</div>

</div>





```yaml
# Using a Wildcard (*)
wrangles:
  - merge.dictionaries:
      input: [Dict *]
      output: Merged
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Dict 1 | Dict 2 |
| --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Merged |
| --- |
| \{'First': 'One', 'Second': 'Two'\} |

</div>

</div>





```yaml
# Using a Wildcard (*)
wrangles:
  - merge.dictionaries:
      input:
        - Dict *
        - -Dict 2
      output: Merged
```

Note the extra dash in front of `Dict 2` excludes that column from the wildcard selection.

<div className="ww-sample-grid">

<div className="ww-sample-panel">



| Dict 1 | Dict 2 | Dict 3 |
| --- | --- | --- |
| \{'First': 'One'\} | \{'Second': 'Two'\} | \{'Third': 'Three'\} |

</div>

<div className="ww-sample-panel">



| Merged |
| --- |
| \{'First': 'One', 'Third': 'Three'\} |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | list of input columns | array | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `skip_empty` | Whether to skip empty dictionaries when merging | boolean | `false` | No |
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
| Catalog ID | `42` |
| Catalog key | `merge.dictionaries` |
| Recipe key | `merge.dictionaries` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.dictionaries` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `93e27737-e966-4ba9-8777-4e96724ebfc4` |

**Sources**

- [WranglesPY merge.dictionaries implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.dictionaries Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/dictionaries.md)

</details>


---

## Key Value Pairs <CopyableCode value="merge.key_value_pairs" /> {#key-value-pairs}

Create a dictionary from keys and values in paired columns.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Create a dictionary from keys and values in paired columns e.g. COLUMN_NAME_1, COLUMN_VALUE_1, COLUMN_NAME_2, COLUMN_VALUE_2 ...",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": "object",
      "description": "Matched pairs of key and value columns"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "skip_empty": {
      "type": "boolean",
      "description": "Whether to skip empty keys or values when creating the dictionary",
      "default": false
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
  - merge.key_value_pairs:
      input:
        Letter: Number
      output: Pairs
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Letter | Number |
| --- | --- |
| A | 1 |
| B | 2 |
| C | 3 |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Pairs |
| --- |
| \{'A': 1\} |
| \{'B': 2\} |
| \{'C': 3\} |

</div>

</div>





```yaml
# Using a Wildcard (*)
wrangles:
  - merge.key_value_pairs:
      input:
        key*: value*
      output: Object
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| key 1 | key 2 | value 1 | value 2 |
| --- | --- | --- | --- |
| A | One | a | First |
| B | Two | b | Second |
| C | three | c | Third |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Object |
| --- |
| \{'A': 'a', 'One': 'First'\} |
| \{'B': 'b', 'Two': 'Second'\} |
| \{'C': 'c', 'three': 'Third'\} |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Matched pairs of key and value columns | object | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `skip_empty` | Whether to skip empty keys or values when creating the dictionary | boolean | `false` | No |
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
| Catalog ID | `43` |
| Catalog key | `merge.key_value_pairs` |
| Recipe key | `merge.key_value_pairs` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.key_value_pairs` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `8a2cd37c-8ef7-4b05-8264-36512f5dd837` |

**Sources**

- [WranglesPY merge.key_value_pairs implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.key_value_pairs Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/key-value-pairs.md)

</details>


---

## Lists <CopyableCode value="merge.lists" /> {#lists}

Take lists in multiple columns and merge them to a single list.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Take lists in multiple columns and merge them to a single list.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": "array",
      "description": "List of input columns"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "remove_duplicates": {
      "type": "boolean",
      "description": "Whether to remove duplicates from the created list"
    },
    "ignore_case": {
      "type": "boolean",
      "description": "Ignore case when removing duplicates"
    },
    "include_empty": {
      "type": "boolean",
      "description": "Whether to include empty values in the created list"
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
  - merge.lists:
      input:
        - Col1
        - Col2
      output: Combined Col
      remove_duplicates: false
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| ['A', 'B'] | ['D', 'E'] |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Combined Col |
| --- |
| ['A', 'B', 'D', 'E'] |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns | array | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `remove_duplicates` | Whether to remove duplicates from the created list | boolean | `false` | No |
| `ignore_case` | Ignore case when removing duplicates | boolean | `false` | No |
| `include_empty` | Whether to include empty values in the created list | boolean | `true` | No |
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
| Catalog ID | `44` |
| Catalog key | `merge.lists` |
| Recipe key | `merge.lists` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.lists` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `d9978f00-b3d4-4583-884e-a53b98a43e9a` |

**Sources**

- [WranglesPY merge.lists implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.lists Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/lists.md)

</details>


---

## To Dict <CopyableCode value="merge.to_dict" /> {#to-dict}

Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Take multiple columns and merge them to a dictionary (aka object) using the column headers as keys.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "array",
        "string",
        "integer"
      ],
      "description": "List of input columns"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "include_empty": {
      "type": "boolean",
      "description": "Whether to include empty columns in the created dictionary"
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
  - merge.to_dict:
      input:
        - Col1
        - Col2
      output: Dict Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 |
| --- | --- |
| A | B |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Dict Col |
| --- |
| \{'Col1': 'A', 'Col2': 'B'\} |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns | array, string, integer | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `include_empty` | Whether to include empty columns in the created dictionary | boolean | `false` | No |
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
| Catalog ID | `45` |
| Catalog key | `merge.to_dict` |
| Recipe key | `merge.to_dict` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.to_dict` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `9b869210-0d89-403b-8409-7cecdb5f9c7c` |

**Sources**

- [WranglesPY merge.to_dict implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.to_dict Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/to-dict.md)

</details>


---

## To List <CopyableCode value="merge.to_list" /> {#to-list}

Take multiple columns and merge them to a list.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "description": "Take multiple columns and merge them to a list.",
  "additionalProperties": false,
  "required": [
    "input",
    "output"
  ],
  "properties": {
    "input": {
      "type": [
        "array",
        "string",
        "integer"
      ],
      "description": "List of input columns"
    },
    "output": {
      "type": "string",
      "description": "Name of the output column"
    },
    "include_empty": {
      "type": "boolean",
      "description": "Whether to include empty columns in the created list"
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
  - merge.to_list:
      input:
        - Col1
        - Col2
        - Col3
      output: List Col
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Col1 | Col2 | Col3 |
| --- | --- | --- |
| A | B | C |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| List Col |
| --- |
| ['A', 'B', 'C'] |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | List of input columns | array, string, integer | — | Yes |
| `output` | Name of the output column | string | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `include_empty` | Whether to include empty columns in the created list | boolean | `false` | No |
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
| Catalog ID | `46` |
| Catalog key | `merge.to_list` |
| Recipe key | `merge.to_list` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `merge` |
| Documentation group | `merge` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.merge.to_list` |
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | `d5300fe7-c8a4-4a41-8f12-f2c1698678cc` |

**Sources**

- [WranglesPY merge.to_list implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/merge.py)
- [Archived merge.to_list Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/merge/_sources/to-list.md)

</details>
