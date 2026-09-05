---
title: "Translate"
description: "Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available)."
sidebar_label: "Translate"
slug: "/translate"
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Translate

Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available).

Translate the input column to another language. Powered by DeepL.

## Parameters

<div className="ww-parameters-table">

| Name | Description | Accepted Values | Default | Required |
| --- | --- | --- | --- | --- |
| <span className="ww-param-group-label">I/O</span> |  |  |  |  |
| `input` | Name of the column to translate. | string, integer, array | — | Yes |
| `output` | Name of the output column. | string, array | — | Yes |
| <span className="ww-param-group-label">Options</span> |  |  |  |  |
| `target_language` | Code of the language to translate to. | string; one of:<ul className="ww-param-enum-values"><li>Bulgarian</li><li>Chinese</li><li>Czech</li><li>Danish</li><li>Dutch</li><li>English (American)</li><li>English (British)</li><li>Estonian</li><li>Finnish</li><li>French</li><li>German</li><li>Greek</li><li>Hungarian</li><li>Italian</li><li>Japanese</li><li>Latvian</li><li>Lithuanian</li><li>Polish</li><li>Portuguese</li><li>Portuguese (Brazilian)</li><li>Romanian</li><li>Russian</li><li>Slovak</li><li>Slovenian</li><li>Spanish</li><li>Swedish</li></ul> | — | Yes |
| `source_language` | Code of the language to translate from. If omitted, automatically detects the input language. | string; one of:<ul className="ww-param-enum-values"><li>Auto</li><li>Bulgarian</li><li>Chinese</li><li>Czech</li><li>Danish</li><li>Dutch</li><li>English</li><li>Estonian</li><li>Finnish</li><li>French</li><li>German</li><li>Greek</li><li>Hungarian</li><li>Italian</li><li>Japanese</li><li>Latvian</li><li>Lithuanian</li><li>Polish</li><li>Portuguese</li><li>Romanian</li><li>Russian</li><li>Slovak</li><li>Slovenian</li><li>Spanish</li><li>Swedish</li></ul> | `"AUTO"` | No |
| `case` | Allow changing the case of the input prior to translation. | string, null | `null` | No |
| <span className="ww-param-group-label">Conditions</span> |  |  |  |  |
| `if` | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | string | — | No |
| `where` | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | string | — | No |
| `where_params` | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | array, object | — | No |

</div>

## Examples

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
| Recipe key | `translate` |
| Lifecycle status | active |
| Namespace | Root-level |
| Documentation group | `format` |
| Aliases | None |
| Runtime symbol | `wrangles.recipe_wrangles.main.translate` |

**Sources**

- [WranglesPY translate implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing translate Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/translate.md)

</details>
