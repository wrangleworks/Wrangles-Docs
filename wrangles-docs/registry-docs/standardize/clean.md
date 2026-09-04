---
title: "Standardize Clean"
description: "Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally."
sidebar_label: "Standardize Clean"
slug: "/standardize/clean"
---

# Standardize Clean

Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or list of input columns. | — |
| `output` | No | string, integer, array, null | Name or list of output columns. Defaults to overwriting input. | `null` |
| `fix_encoding` | No | boolean | Repair mojibake and other reversible encoding errors. | `true` |
| `unescape_html` | No | boolean or string; one of: auto | Decode HTML character references. Auto avoids decoding text that appears to contain HTML markup. | `"auto"` |
| `normalization` | No | string; one of: NFC, NFKC, NFD, NFKD, null | Unicode normalization form. | `"NFC"` |
| `fix_character_width` | No | boolean | Normalize fullwidth and halfwidth characters. | `true` |
| `uncurl_quotes` | No | boolean | Replace typographic quotes with straight quotes. | `true` |
| `remove_control_chars` | No | boolean | Remove C0 and C1 control characters. | `true` |
| `collapse_whitespace` | No | boolean | Collapse runs of Unicode whitespace. | `true` |
| `preserve_line_breaks` | No | boolean | Preserve line breaks while collapsing other whitespace. | `false` |
| `trim` | No | boolean | Remove leading and trailing whitespace. | `true` |
| `separator` | No | string | Text used to join multiple input columns into one output. | `" "` |
| `if` | No | string | Condition that determines whether the wrangle runs as a whole. Recipe variables may be referenced with `${variable}`. | — |
| `where` | No | string | Filter rows before applying the wrangle using SQL-like criteria, such as `column1 = 123 OR column2 = 'abc'`. | — |
| `where_params` | No | array, object | Values used with `where` for parameterized criteria. Uses SQLite placeholder syntax such as `?` or `:name`. | — |

## Verified examples

_No fixture-backed examples are currently available. See migrated examples under Guidance where present._

## Access

| Requirement | Value |
| --- | --- |
| ai powered | No |
| requires account | No |
| requires subscription | No |
| requires external api key | No |

## Guidance

## Behavior

Repair common encoding, Unicode, HTML character reference, control character, and whitespace problems locally.

This first-pass guidance is derived from the callable signature and its embedded Python schema docstring.

## Provenance

- [WranglesPY standardize.clean implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: `standardize`
- Recipe key: `standardize.clean`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.standardize.clean`
- Status: `active`
- Registry version: `0.1.0-pilot`
