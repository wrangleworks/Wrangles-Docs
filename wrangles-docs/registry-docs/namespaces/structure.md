---
title: "Structure Wrangles"
description: "Structure wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Structure"
slug: "/namespaces/structure"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';
import RegistryLocationRedirect from '@site/src/components/RegistryLocationRedirect';

<RegistryLocationRedirect from={"/py/namespaces/structure"} routes={{}} />

# Structure Wrangles

Structure wrangles, with recipe examples, parameters, and behavior.

## Split Dictionary <CopyableCode value="structure.split_dictionary" /> {#split-dictionary}

Split one or more dictionaries into columns.
The dictionary keys will be returned as the new column headers.
Dictionary keys are case-sensitive. With multiple input columns,
later dictionaries overwrite earlier keys before defaults are applied.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "63",
  "status": "active",
  "description": "Split one or more dictionaries into columns.\nThe dictionary keys will be returned as the new column headers.\nDictionary keys are case-sensitive. With multiple input columns,\nlater dictionaries overwrite earlier keys before defaults are applied.",
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
      "description": "Name or list of columns containing dictionaries or JSON object strings to split.\nFor overlapping keys, later input columns take precedence\nbefore defaults are applied."
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "In columns output_format, this is an optional subset of keys to extract\nfrom the dictionary. If not provided, all keys will be returned.\nColumns can be renamed with the following syntax:\noutput:\n  - key1: new_column_name1\n  - key2: new_column_name2\nIn to_lists output_format, this must be two output columns for the keys\nand values lists. If not provided, Keys and Values will be used."
    },
    "default": {
      "type": "object",
      "description": "Provide defaults for missing top-level keys or keys with null values after merging the input dictionaries. Keys use their original names before output renaming. Non-null values, including 0, false, empty strings, lists, and dictionaries, are preserved. Nested values are not filled recursively. When default is supplied (including {}), invalid or non-dictionary input cells are treated as empty dictionaries, so valid values from other input columns are retained. Without default, invalid input raises an error."
    },
    "output_format": {
      "type": "string",
      "enum": [
        "columns",
        "to_lists"
      ],
      "description": "How to split the dictionary.\ncolumns creates one output column for each dictionary key.\nIn recipes, remaining null cells are normalized to empty strings.\nto_lists creates two output columns containing lists of keys and values.\nRemaining null values inside these lists are preserved."
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
| `input` | Name or list of columns containing dictionaries or JSON object strings to split.<br />For overlapping keys, later input columns take precedence<br />before defaults are applied. | string, integer, array | — | Yes |
| `output` | In columns output_format, this is an optional subset of keys to extract<br />from the dictionary. If not provided, all keys will be returned.<br />Columns can be renamed with the following syntax:<br />output:<br />  - key1: new_column_name1<br />  - key2: new_column_name2<br />In to_lists output_format, this must be two output columns for the keys<br />and values lists. If not provided, Keys and Values will be used. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `default` | Provide defaults for missing top-level keys or keys with null values after merging the input dictionaries. Keys use their original names before output renaming. Non-null values, including 0, false, empty strings, lists, and dictionaries, are preserved. Nested values are not filled recursively. When default is supplied (including &#123;&#125;), invalid or non-dictionary input cells are treated as empty dictionaries, so valid values from other input columns are retained. Without default, invalid input raises an error. | object | `null` | No |
| `output_format` | How to split the dictionary.<br />columns creates one output column for each dictionary key.<br />In recipes, remaining null cells are normalized to empty strings.<br />to_lists creates two output columns containing lists of keys and values.<br />Remaining null values inside these lists are preserved. | string; one of:<ul className="ww-param-enum-values"><li>columns</li><li>to_lists</li></ul> | `"columns"` | No |
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
| AI-powered | Not reviewed |
| Requires WrangleWorks account | Not reviewed |
| Requires subscription | Not reviewed |
| Requires external API key | Not reviewed |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `63` |
| Catalog key | `structure.split_dictionary` |
| Recipe key | `structure.split_dictionary` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `structure` |
| Documentation group | `structure` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.structure.split_dictionary` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py)

</details>


---

## Split List <CopyableCode value="structure.split_list" /> {#split-list}

Split a list in a single column to multiple columns.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).

Compatibility correction: Normalize schema type "int" to integer.

```json
{
  "type": "object",
  "catalog_id": "64",
  "status": "active",
  "description": "Split a list in a single column to multiple columns.",
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
      "description": "Name of the column to be split"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of column(s) for the results. If providing a single column, use a wildcard (*) to indicate a incrementing integer"
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
| `input` | Name of the column to be split | string, integer | — | Yes |
| `output` | Name of column(s) for the results. If providing a single column, use a wildcard (*) to indicate a incrementing integer | string, array | — | Yes |
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
| AI-powered | Not reviewed |
| Requires WrangleWorks account | Not reviewed |
| Requires subscription | Not reviewed |
| Requires external API key | Not reviewed |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `64` |
| Catalog key | `structure.split_list` |
| Recipe key | `structure.split_list` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `structure` |
| Documentation group | `structure` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.structure.split_list` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py)

</details>


---

## Split Text <CopyableCode value="structure.split_text" /> {#split-text}

Split a string to multiple columns or a list.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "65",
  "status": "active",
  "description": "Split a string to multiple columns or a list.",
  "additionalProperties": false,
  "required": [
    "input"
  ],
  "properties": {
    "input": {
      "type": "string",
      "description": "Name of the column to be split"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column(s)\nIf a single column is provided,\nthe results will be returned as a list\nIf multiple columns are listed,\nthe results will be separated into the columns.\nIf omitted, will overwrite the input."
    },
    "char": {
      "type": "string",
      "description": "Set the character(s) to split on.\nDefault comma (,)\nCan also prefix with \"regex:\" to split on a pattern."
    },
    "pad": {
      "type": "boolean",
      "description": "Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists."
    },
    "element": {
      "type": [
        "integer",
        "string"
      ],
      "description": "Select a specific element or range after splitting using slicing syntax. e.g. 0, \":5\", \"5:\", \"2:8:2\""
    },
    "inclusive": {
      "type": "boolean",
      "description": "If true, include the split character in the output. Default False"
    },
    "skip_empty": {
      "type": "boolean",
      "description": "Whether to skip empty values",
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



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to be split | string | — | Yes |
| `output` | Name of the output column(s)<br />If a single column is provided,<br />the results will be returned as a list<br />If multiple columns are listed,<br />the results will be separated into the columns.<br />If omitted, will overwrite the input. | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `char` | Set the character(s) to split on.<br />Default comma (,)<br />Can also prefix with "regex:" to split on a pattern. | string | `","` | No |
| `pad` | Choose whether to pad to ensure a consistent length. Default true if outputting to columns, false for lists. | boolean | `null` | No |
| `element` | Select a specific element or range after splitting using slicing syntax. e.g. 0, ":5", "5:", "2:8:2" | integer, string | `null` | No |
| `inclusive` | If true, include the split character in the output. Default False | boolean | `false` | No |
| `skip_empty` | Whether to skip empty values | boolean | `false` | No |
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
| AI-powered | Not reviewed |
| Requires WrangleWorks account | Not reviewed |
| Requires subscription | Not reviewed |
| Requires external API key | Not reviewed |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `65` |
| Catalog key | `structure.split_text` |
| Recipe key | `structure.split_text` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `structure` |
| Documentation group | `structure` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.structure.split_text` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py)

</details>


---

## Tokenize <CopyableCode value="structure.tokenize" /> {#tokenize}

Split text into tokens. A variety of methods are available. The default method is to split on spaces.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "66",
  "status": "active",
  "description": "Split text into tokens. A variety of methods are available. The default method is to split on spaces.",
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
      "description": "Column(s) to be split into tokens"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name of the output column"
    },
    "method": {
      "anyOf": [
        {
          "type": "string",
          "enum": [
            "space",
            "boundary",
            "boundary_ignore_space"
          ],
          "description": "Method to split the list. Options: space, boundary, boundary_ignore_space or use a custom function with custom.<function> or use a regex pattern with regex:<pattern>"
        },
        {
          "type": "string",
          "description": "Method to split the list. Options: space, boundary, boundary_ignore_space or use a custom function with custom.<function> or use a regex pattern with regex:<pattern>"
        }
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



<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Column(s) to be split into tokens | string, integer, array | — | Yes |
| `output` | Name of the output column | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `method` | The method parameter. | string; one of:<ul className="ww-param-enum-values"><li>space</li><li>boundary</li><li>boundary_ignore_space</li></ul> or string | `"space"` | No |
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
| AI-powered | Not reviewed |
| Requires WrangleWorks account | Not reviewed |
| Requires subscription | Not reviewed |
| Requires external API key | Not reviewed |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `66` |
| Catalog key | `structure.tokenize` |
| Recipe key | `structure.tokenize` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `structure` |
| Documentation group | `structure` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.structure.tokenize` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/structure.py)

</details>
