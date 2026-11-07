---
title: "Standardize Wrangles"
description: "Standardize wrangles, with recipe examples, parameters, and behavior."
sidebar_label: "Standardize"
slug: "/namespaces/standardize"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';
import RegistryLocationRedirect from '@site/src/components/RegistryLocationRedirect';

<RegistryLocationRedirect from={"/py/namespaces/standardize"} routes={{}} />

# Standardize Wrangles

Standardize wrangles, with recipe examples, parameters, and behavior.

## Replace <span className="ww-legacy-help"><span className="ww-legacy-pill" tabIndex={0}>Legacy</span><span className="ww-legacy-tooltip">This wrangle is planned for deprecation. Your existing recipes will continue to work. For new recipes, use <a href="/py/namespaces/standardize#replace">standardize.replace</a>.</span></span> <CopyableCode value="replace" /> {#legacy-replace}

Quick find and replace for simple values. Can use regex in the `find` field.

:::note
Values that are not a number or a string pass through unaltered.
:::

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "90",
  "status": "legacy",
  "description": "Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.",
  "additionalProperties": false,
  "required": [
    "input",
    "find",
    "replace"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output column"
    },
    "find": {
      "type": "string",
      "description": "Pattern to find using regex"
    },
    "replace": {
      "type": "string",
      "description": "Value to replace the pattern found"
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
  - replace:
      input: Product Data
      find: brg
      replace: bearing
```

<div className="ww-sample-grid">

<div className="ww-sample-panel ww-sample-panel--input" data-sample-role="input">

| Product Data |
| --- |
| SKF ball brg |
| brg seal |

</div>

<div className="ww-sample-panel ww-sample-panel--output" data-sample-role="output">

| Product Data |
| --- |
| SKF ball bearing |
| bearing seal |

</div>

</div>

<details className="ww-field-disclosure">

<summary>Parameters</summary>

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name or list of input column | string, integer, array | — | Yes |
| `output` | Name or list of output column | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | Pattern to find using regex | string | — | Yes |
| `replace` | Value to replace the pattern found | string | — | Yes |
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
| Catalog ID | `90` |
| Catalog key | `standardize.replace` |
| Recipe key | `replace` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | Root-level |
| Documentation group | `standardize` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.replace` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | `f0ab715e-9e0e-4614-83e4-5cd8ea08a09f` |

**Sources**

- [WranglesPY replace implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Archived replace Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/6ad22fdaefc31154f38d7576e5e76746927daa69/wrangles-docs/wrangle-docs/format/_sources/replace.md)

</details>


---

## Standardize Clean <CopyableCode value="standardize.clean" /> {#clean}

### Behavior

Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.

This guidance was derived from the callable signature and its embedded Python schema docstring.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "67",
  "status": "active",
  "description": "Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.",
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
        "integer",
        "array"
      ],
      "description": "Name or list of output columns. Defaults to overwriting input."
    },
    "fix_encoding": {
      "type": "boolean",
      "default": true,
      "description": "Repair mojibake and other reversible encoding errors."
    },
    "unescape_html": {
      "anyOf": [
        {
          "type": "boolean"
        },
        {
          "type": "string",
          "enum": [
            "auto"
          ]
        }
      ],
      "default": "auto",
      "description": "Decode HTML character references. Auto avoids decoding text that appears to contain HTML markup."
    },
    "normalization": {
      "type": [
        "string",
        "null"
      ],
      "enum": [
        "NFC",
        "NFKC",
        "NFD",
        "NFKD",
        null
      ],
      "default": "NFC",
      "description": "Unicode normalization form."
    },
    "fix_character_width": {
      "type": "boolean",
      "default": true,
      "description": "Normalize fullwidth and halfwidth characters."
    },
    "uncurl_quotes": {
      "type": "boolean",
      "default": true,
      "description": "Replace typographic quotes with straight quotes."
    },
    "remove_control_chars": {
      "type": "boolean",
      "default": true,
      "description": "Remove C0 and C1 control characters."
    },
    "collapse_whitespace": {
      "type": "boolean",
      "default": true,
      "description": "Collapse runs of Unicode whitespace."
    },
    "preserve_line_breaks": {
      "type": "boolean",
      "default": false,
      "description": "Preserve line breaks while collapsing other whitespace."
    },
    "trim": {
      "type": "boolean",
      "default": true,
      "description": "Remove leading and trailing whitespace."
    },
    "unescape_unicode": {
      "type": "boolean",
      "default": false,
      "description": "Decode literal printable Unicode escapes in prose, preserving code and Markdown link destinations."
    },
    "latex_to_text": {
      "type": "boolean",
      "default": false,
      "description": "Convert supported inline LaTeX units, symbols and numeric fractions to readable text. Preserve numeric dollar amounts, ranges and explicit price qualifiers; remove extra dollar signs from other supported inline math. Preserve unsupported formulas. Set collapse_whitespace and trim to false to retain Markdown layout."
    },
    "separator": {
      "type": "string",
      "default": " ",
      "description": "Text used to join multiple input columns into one output."
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
| `input` | Name or list of input columns. | string, integer, array | — | Yes |
| `output` | Name or list of output columns. Defaults to overwriting input. | string, integer, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `fix_encoding` | Repair mojibake and other reversible encoding errors. | boolean | `true` | No |
| `unescape_html` | Decode HTML character references. Auto avoids decoding text that appears to contain HTML markup. | boolean or string; one of:<ul className="ww-param-enum-values"><li>auto</li></ul> | `"auto"` | No |
| `normalization` | Unicode normalization form. | string, null; one of:<ul className="ww-param-enum-values"><li>NFC</li><li>NFKC</li><li>NFD</li><li>NFKD</li><li>null</li></ul> | `"NFC"` | No |
| `fix_character_width` | Normalize fullwidth and halfwidth characters. | boolean | `true` | No |
| `uncurl_quotes` | Replace typographic quotes with straight quotes. | boolean | `true` | No |
| `remove_control_chars` | Remove C0 and C1 control characters. | boolean | `true` | No |
| `collapse_whitespace` | Collapse runs of Unicode whitespace. | boolean | `true` | No |
| `preserve_line_breaks` | Preserve line breaks while collapsing other whitespace. | boolean | `false` | No |
| `trim` | Remove leading and trailing whitespace. | boolean | `true` | No |
| `unescape_unicode` | Decode literal printable Unicode escapes in prose, preserving code and Markdown link destinations. | boolean | `false` | No |
| `latex_to_text` | Convert supported inline LaTeX units, symbols and numeric fractions to readable text. Preserve numeric dollar amounts, ranges and explicit price qualifiers; remove extra dollar signs from other supported inline math. Preserve unsupported formulas. Set collapse_whitespace and trim to false to retain Markdown layout. | boolean | `false` | No |
| <span className="ww-param-group-label">Formatting</span> |  |  |  |  |
| `separator` | Text used to join multiple input columns into one output. | string | `" "` | No |
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
| Catalog ID | `67` |
| Catalog key | `standardize.clean` |
| Recipe key | `standardize.clean` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `standardize` |
| Documentation group | `standardize` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.standardize.clean` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY standardize.clean implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py)

</details>


---

## Standardize Custom <CopyableCode value="standardize.custom" /> {#custom}

### Behavior

Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.

This guidance was derived from the callable signature and its embedded Python schema docstring.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "68",
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
| Requires subscription | Yes |
| Requires external API key | No |

</details>

<details className="ww-field-disclosure">

<summary>Technical details</summary>

| Field | Value |
| --- | --- |
| Catalog ID | `68` |
| Catalog key | `standardize.custom` |
| Recipe key | `standardize.custom` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | Yes |
| Namespace | `standardize` |
| Documentation group | `standardize` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.standardize.custom` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY standardize.custom implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py)

</details>


---

## Replace <CopyableCode value="standardize.replace" /> {#replace}

Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.

Usage guidance and examples have not yet been reviewed.

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
  "catalog_id": "90",
  "status": "active",
  "description": "Quick find and replace for simple values. Can use regex if 'input' in params and isinstance(params['input'], list):in the find field.",
  "additionalProperties": false,
  "required": [
    "input",
    "find",
    "replace"
  ],
  "properties": {
    "input": {
      "type": [
        "string",
        "integer",
        "array"
      ],
      "description": "Name or list of input column"
    },
    "output": {
      "type": [
        "string",
        "array"
      ],
      "description": "Name or list of output column"
    },
    "find": {
      "type": "string",
      "description": "Pattern to find using regex"
    },
    "replace": {
      "type": "string",
      "description": "Value to replace the pattern found"
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
| `input` | Name or list of input column | string, integer, array | — | Yes |
| `output` | Name or list of output column | string, array | `null` | No |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `find` | Pattern to find using regex | string | — | Yes |
| `replace` | Value to replace the pattern found | string | — | Yes |
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
| Catalog ID | `90` |
| Catalog key | `standardize.replace` |
| Recipe key | `standardize.replace` |
| Catalog status | active |
| Lifecycle status | active |
| Recipe Writer eligible | No |
| Recipe Writer exclusion | Automatically documented from schema; execution eligibility requires review. |
| Namespace | `standardize` |
| Documentation group | `standardize` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.standardize.replace` |
| Accepted schema revision | `bb47671ab023b3d3eb76fc42f07da4aaed056e2e` |
| Legacy UUID | None |

**Sources**

- [WranglesPY schema](https://github.com/wrangleworks/WranglesPY/blob/bb47671ab023b3d3eb76fc42f07da4aaed056e2e/wrangles/recipe_wrangles/standardize.py)

</details>
