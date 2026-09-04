---
title: "Recipe"
description: "Run another recipe as a wrangle against the current dataframe."
sidebar_label: "Recipe"
slug: "/recipe"
---

# Recipe

Run another recipe as a wrangle against the current dataframe.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | No | string, integer, array, null | Name, index, or list of input columns. | `null` |
| `output` | No | string, array, null | Name or list of output columns. | `null` |
| `name` | No | string, null | File name of the recipe. | `null` |
| `variables` | No | object, null | A dictionary of variables to pass to the recipe. | `null` |
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

Run another recipe as a wrangle against the current dataframe.

This first-pass guidance is derived from the callable signature and its embedded Python schema docstring.

## Provenance

- [WranglesPY recipe implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/main.py)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: root-level runtime key
- Recipe key: `recipe`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.main.recipe`
- Status: `active`
- Registry version: `0.1.0-pilot`
