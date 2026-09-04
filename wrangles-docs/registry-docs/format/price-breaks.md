---
title: "Format Price Breaks"
description: "Expand non-empty price-break cells into paired category and value columns."
sidebar_label: "Format Price Breaks"
slug: "/format/price-breaks"
---

# Format Price Breaks

Expand non-empty price-break cells into paired category and value columns.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | array | Name, index, or list of input columns. | — |
| `categoryLabel` | Yes | string | Prefix for output columns that identify the source price-break category. | — |
| `valueLabel` | Yes | string | Prefix for output columns that contain the corresponding price-break value. | — |
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

Expand non-empty price-break cells into paired category and value columns.

This first-pass guidance is derived from the callable signature.

## Provenance

- [WranglesPY format.price_breaks implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/format.py)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: `format`
- Recipe key: `format.price_breaks`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.format.price_breaks`
- Status: `active`
- Registry version: `0.1.0-pilot`
