---
title: "Standardize Custom"
description: "Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription."
sidebar_label: "Standardize Custom"
slug: "/standardize/custom"
---

# Standardize Custom

Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `input` | Yes | string, integer, array | Name or list of input columns. | — |
| `model_id` | Yes | string, array | The ID of the wrangle to use (do not include 'find' and 'replace'). | — |
| `output` | No | string, array, null | Name or list of output columns. | `null` |
| `case_sensitive` | No | boolean | Allows the wrangle to be case sensitive if set to True, default is False. | `false` |
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
| requires subscription | Yes |
| requires external api key | No |

## Guidance

## Behavior

Standardize data using a DIY or bespoke standardization wrangle. Requires WrangleWorks Account and Subscription.

This first-pass guidance is derived from the callable signature and its embedded Python schema docstring.

## Provenance

- [WranglesPY standardize.custom implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/standardize.py)

## Registry metadata

- Registry ID: pending database assignment
- Namespace: `standardize`
- Recipe key: `standardize.custom`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.standardize.custom`
- Status: `active`
- Registry version: `0.1.0-pilot`
