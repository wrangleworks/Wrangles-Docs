---
schema_version: '0.2'
type: connector
catalog_id: '113'
catalog_key: connector.file
catalog_kind: connector
runtime_key: file
status: active
title: File
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Import a file
    required:
      - name
    properties:
      name:
        type: string
        description: >-
          The name or path of the file to import. Accepts a string or a Path object (pathlib.Path /
          os.PathLike).
      columns:
        type: array
        description: Columns to select
      drop_empty:
        type: boolean
        description: Whether to drop columns that are completely empty, defaults to false
      nrows:
        type: integer
        description: Number of rows to read
        minimum: 1
      header:
        type: integer
        description: Set the header row number.
        minimum: 0
      sheet_name:
        type: string
        description: Used for Excel files. Specify the sheet to read.
      orient:
        type: string
        description: Used for JSON files. Specifies the input arrangement
        enum:
          - split
          - records
          - index
          - columns
          - values
      sep:
        type: string
        description: Used for CSV files. Set the separation character. Default , (comma)
      encoding:
        type: string
        description: Used for CSV files. Set the encoding used for the file. Default utf-8
      decimal:
        type: string
        description: >-
          Used for CSV files. Character to recognize as the decimal point (e.g. ',' for European
          data).
      thousands:
        type: string
        description: Used for CSV files. Character to recognize as the thousands separator
  write:
    type: object
    description: Export data to a file
    required:
      - name
    properties:
      name:
        type: string
        description: >-
          The name or path of the file to write. Accepts a string or a Path object (pathlib.Path /
          os.PathLike).
      columns:
        type: array
        description: A list of the columns to write. If omitted, all columns will be written.
      orient:
        type: string
        description: Used for JSON files. Specifies the output arrangement
        enum:
          - split
          - records
          - index
          - columns
          - values
      sheet_name:
        type: string
        description: Used for Excel files. Specify the sheet to write.
      sep:
        type: string
        description: Used for CSV files. Set the separation character. Default , (comma)
      encoding:
        type: string
        description: Used for CSV files. Set the encoding used for the file. Default utf-8
      mode:
        type: string
        description: >-
          Used for CSV files. Set whether to append to (a) or overwrite (w) the file if it already
          exists. Default w - overwrite
        enum:
          - w
          - a
      decimal:
        type: string
        description: Used for CSV files. Character to use as the decimal point (e.g. ',' for European data).
      header:
        type:
          - boolean
          - array
        description: >-
          Used for CSV files. Whether to write the column headers. Default true. Alternatively,
          provide a list to overwrite the headings.
      chunk_size:
        type: integer
        description: >-
          Used for Parquet files. Number of rows to write per chunk to limit peak memory usage.
          Defaults to an automatically calculated value that keeps each chunk under 128 MB of
          in-memory data.
description: Import a file
slug: connectors/file
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/file.md
    title: Existing connector documentation
---

# File

The file connector supports CSV, Excel and JSON files.

### Read
### Recipe
```yaml
read:
  - file:
      name: file.csv

      # Optional
      nrows: 10      	# Limit the number of rows
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import file
df = file.read('file.csv')
```

### Write
### Recipe
```yaml
write:
  - file:
      name: file.xlsx

      # Optional
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import file
file.write(df, 'file.xlsx')
```
