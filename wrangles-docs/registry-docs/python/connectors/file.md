---
title: "File"
slug: /python/connectors/file
---

The file connector supports CSV, Excel and JSON files.


# Tabset \{.tabset\}
## Read
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

### Parameters

<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| name | ✓ | str | The file name (and path, if required) to read. |
| columns | | list | A list with a subset of the columns to import. |
| not_columns | | list | Subset of columns to be left out of the read. |
| decimal | | str | Used for CSV files. Character to recognize as the decimal point (e.g. ',' for European data). |
| encoding | | str | Used for CSV files. Set the encoding used for the file. Default utf-8. |
| file_object | | BytesIO | **Function Only.** Pass in a file object from memory instead of reading from the file system. If this is provided a name is still required to indicate the file type, but won't be read. |
| header | | int | Set the header row number. |
| nrows |  | int | Limit the number of rows. |
| orient | | (str) - split / records / index / columns / values | Used for JSON files. Specifies the input arrangement. [See pandas docs for details](https://pandas.pydata.org/docs/reference/api/pandas.read_json.html) |
| sep | | str | Used for CSV files. Set the separation character. Default , (comma). |
| sheet_name | | str | Used for Excel files. Specify the sheet to read. |
| thousands | | str | Used for CSV files. Character to recognize as the thousands separator. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

</div>

## Write
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

### Parameters

<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| name | ✓ | str | The file name (and path, if required) to write. |
| columns | | list | Subset of the columns to be written. If not provided, all columns will be output. |
| not_columns | | list | Subset of columns to be left out. |
| decimal | | str | Used for CSV files. Character to recognize as the decimal point (e.g. ',' for European data). |
| encoding | | str | Used for CSV files. Set the encoding used for the file. Default utf-8. |
| file_object | | BytesIO | **Function Only.** Pass in a file object from memory instead of reading from the file system. If this is provided a name is still required to indicate the file type, but won't be read. |
| header | | int | Set the header row number. |
| index | | boolean | Include a column with the row index in the output. Default false. |
| mode | | str | Used for CSV files. Set whether to append to (a) or overwrite (w) the file if it already exists. Default w - overwrite |
| nrows |  | int | Limit the number of rows. |
| orient | | (str) - split / records / index / columns / values | Used for JSON files. Specifies the input arrangement. [See pandas docs for details](https://pandas.pydata.org/docs/reference/api/pandas.read_json.html) |
| sep | | str | Used for CSV files. Set the separation character. Default , (comma). |
| sheet_name | | str | Used for Excel files. Specify the sheet name. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

</div>