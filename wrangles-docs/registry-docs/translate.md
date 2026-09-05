---
title: "Translate"
description: "Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available)."
sidebar_label: "Translate"
slug: "/translate"
---

# Translate

Translate the input to a different language. Requires WrangleWorks Account and DeepL API Key (A free account for up to 500,000 characters per month is available).

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name of the column to translate. | — |
| `output` | Yes | string, array | Name of the output column. | — |
| `target_language` | Yes | string; one of: Bulgarian, Chinese, Czech, Danish, Dutch, English (American), English (British), Estonian, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Latvian, Lithuanian, Polish, Portuguese, Portuguese (Brazilian), Romanian, Russian, Slovak, Slovenian, Spanish, Swedish | Code of the language to translate to. | — |
| `source_language` | No | string; one of: Auto, Bulgarian, Chinese, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hungarian, Italian, Japanese, Latvian, Lithuanian, Polish, Portuguese, Romanian, Russian, Slovak, Slovenian, Spanish, Swedish | Code of the language to translate from. If omitted, automatically detects the input language. | `"AUTO"` |
| `case` | No | string, null | Allow changing the case of the input prior to translation. | `null` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | Yes |
| requires subscription | No |
| requires external api key | No |

## Guidance

Translate the input column to another language. Powered by DeepL.

## Migrated examples
#### Translating Spanish to English

##### Recipe

```yaml
wrangles:
  - translate:
      input: Español
      output: English
      source_language: Spanish
      target_language: English (British)
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Español |
| --- |
| ¡Hola Mundo! |

</div>

<div className="ww-sample-panel">

##### Output Sample

| English |
| --- |
| Hello World! |

</div>

</div>

## Provenance

- [WranglesPY translate implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)
- [Existing translate Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/format/_sources/translate.md)

## Registry metadata

- Registry ID: `73c3ceb6-ffd8-4d74-8389-c83b99d33bb0`
- Namespace: root-level runtime key
- Recipe key: `translate`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.translate`
- Status: `active`
- Registry version: `0.1.0-pilot`
