---
schema_version: '0.2'
type: connector
catalog_id: '111'
catalog_key: connector.excel.selected_data
catalog_kind: connector
runtime_key: excel.selected_data
status: active
title: Excel Selected Data
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: >-
      Read the selected Excel data supplied to this recipe invocation. Grid applications supply the
      current batch of selected rows. Within a recipe wrangle, this is the current parent dataframe,
      including any preceding transformations. Missing or empty selected data raises an error.
    additionalProperties: false
    properties: {}
description: >-
  Read the selected Excel data supplied to this recipe invocation. Grid applications supply the
  current batch of selected rows. Within a recipe wrangle, this is the current parent dataframe,
  including any preceding transformations. Missing or empty selected data raises an error.
slug: connectors/excel.selected_data
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: documentation-search
    resource: https://wrangles.io/python/connectors/excel/selected_data
    title: >-
      Checked for matching guide; no matching material retrieved. Description derived from pinned
      schema.
---

# Excel Selected Data

Read the selected Excel data supplied to this recipe invocation. Grid applications supply the current batch of selected rows. Within a recipe wrangle, this is the current parent dataframe, including any preceding transformations. Missing or empty selected data raises an error.
