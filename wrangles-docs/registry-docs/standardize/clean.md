---
title: "Standardize Clean"
description: "Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally."
sidebar_label: "Standardize Clean"
slug: "/standardize/clean"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Standardize Clean <CopyableCode value="standardize.clean" />

Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.

## Behavior

Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.

This guidance was derived from the callable signature and its embedded Python schema docstring.

## Parameters

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

<details className="ww-field-disclosure">

<summary>Complete configuration schema</summary>

Schema source: upstream-docstring. Conditional and cross-parameter
rules below apply in addition to the parameter table. References resolve against
the [complete recipe schema](/schemas/recipes/registry/schema.json).



```json
{
  "type": "object",
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
| Accepted schema revision | `bd5f88fba479ec406b409cb2880689c54e72b298` |
| Legacy UUID | None |

**Sources**

- [WranglesPY standardize.clean implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py)

</details>
