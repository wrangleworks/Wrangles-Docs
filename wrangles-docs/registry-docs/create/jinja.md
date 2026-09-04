---
title: "Jinja"
description: "Output text using a jinja template."
sidebar_label: "Jinja"
slug: "/create/jinja"
---

# Jinja

Output text using a jinja template.

> Pilot Registry entry. Runtime contract status: `verified`.

## Parameters

| Parameter | Required | Accepted value | Description | Runtime default |
| --- | --- | --- | --- | --- |
| `template` | Yes | object | A dictionary which defines the template/location as well as the form which the template is input. If any keys use a space, they must be replaced with an underscore. Note: spaces within column names are replaced by underscores (_). | — |
| `output` | Yes | array | Name of the column to be output to. | — |
| `input` | No | string, null | Specify a name of column containing a dictionary of elements to be used in jinja template. Otherwise, the column headers will be used as keys. | `null` |
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

Makes use of a Jinja template to create a description, title, or summary based on your data.

:::info
Jinja templates do not allow variables with spaces. This wrangle automatically replaces spaces in column headers with underscores, so use underscores instead of spaces when referencing columns in the template.
:::

## Migrated examples
#### Creating a Jinja Description

##### Recipe

```yaml
wrangles:
  - create.jinja:
      output: Description
      template:
        string: |
          This is a {{ Brand }} {{ Item_Type }} that is {{ Size }}
```

<div className="ww-sample-grid">

<div className="ww-sample-panel">

##### Input Sample

| Size | Brand | Item Type |
| --- | --- | --- |
| 10mm | SKF | ball bearing |
| 15mm | Timken | bearing seal |

</div>

<div className="ww-sample-panel">

##### Output Sample

| Size | Brand | Item Type | Description |
| --- | --- | --- | --- |
| 10mm | SKF | ball bearing | This is a SKF ball bearing that is 10mm |
| 15mm | Timken | bearing seal | This is a Timken bearing seal that is 15mm |

</div>

</div>

Using `|` in YAML denotes a multi-line string that preserves line breaks. Use `>` for a multi-line string when line breaks should not be preserved.

## Provenance

- [WranglesPY create.jinja implementation](https://github.com/wrangleworks/WranglesPY/blob/7916bf158e8b7e561270a1bea7b808f88956edc4/wrangles/recipe_wrangles/create.py)
- [Existing create.jinja Markdown](https://github.com/wrangleworks/Wrangles-Docs/blob/main/wrangles-docs/wrangle-docs/create/_sources/jinja.md)

## Registry metadata

- Registry ID: `10fc6709-16d4-4eab-8f56-6cb5d170ea66`
- Namespace: `create`
- Recipe key: `create.jinja`
- Aliases: none
- Runtime symbol: `wrangles.recipe_wrangles.create.jinja`
- Status: `active`
- Registry version: `0.1.0-pilot`
