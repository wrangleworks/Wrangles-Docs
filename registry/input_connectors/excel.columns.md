---
schema_version: '0.2'
type: connector
catalog_id: '110'
catalog_key: connector.excel.columns
catalog_kind: connector
runtime_key: excel.columns
status: active
title: Excel Columns
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  write:
    type: object
    description: >-
      Spreadsheet write mode: columns. Insert new or changed output columns alongside the selected
      rows in Excel. The output must retain row alignment with the selection. Unchanged input
      columns are not duplicated.
    additionalProperties: false
    properties: {}
description: >-
  Spreadsheet write mode: columns. Insert new or changed output columns alongside the selected rows
  in Excel. The output must retain row alignment with the selection. Unchanged input columns are not
  duplicated.
slug: connectors/excel.columns
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: documentation-search
    resource: https://wrangles.io/python/connectors/excel/columns
    title: >-
      Checked for matching guide; no matching material retrieved. Description derived from pinned
      schema.
---

# Excel Columns

Spreadsheet write mode: columns. Insert new or changed output columns alongside the selected rows in Excel. The output must retain row alignment with the selection. Unchanged input columns are not duplicated.
