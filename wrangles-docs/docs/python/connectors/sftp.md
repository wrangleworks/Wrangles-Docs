---
title: "Sftp"
slug: /python/connectors/sftp
---

The sftp connector supports reading and writing CSV, Excel and JSON files to & from an SFTP server.


# Tabset \{.tabset\}
## Read
### Recipe
```yaml
read:
  - sftp:
      host: sftp.domain
      user: user
      password: password
      file: file.csv
      
      # Optional
      columns:             # Only import select columns
        - column1
        - column2
      sheet_name: Sheet1   # Used for Excel files
      nrows: 10            # Limit the number of rows
      orient: records      # Used for JSON files - defines the structure
```

### Function
```python
from wrangles.connectors import sftp
df = sftp.read(
    host='sftp.domain',
    user='user',
    password='password',
    file='myfile.csv'
)
```

### Parameters

> The SFTP connector also supports the same optional parameters as the file connector. See the [file connector](/python/connectors/file) for more details.
\{.is-info\}

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| host | ✓ | str | Hostname or IP address of the server. |
| user | ✓ | str | The user to connect to the server as. |
| password | ✓ | str | Password for the specified user. |
| file | ✓ | str | File name (and path, if required) to read from the server. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Write
### Recipe
```yaml
# Write specific fields
write:
  - sftp:
      host: sftp.domain
      user: user
      password: password
      name: file.csv
      
      # Optional
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import sftp
sftp.write(
    df,
    host='sftp.domain',
    user='user',
    password='password',
    file='myfile.csv'
)
```

### Parameters

> The SFTP connector also supports the same optional parameters as the file connector. See the [file connector](/python/connectors/file) for more details.
\{.is-info\}

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Function only. DataFrame of contents to write to the file. |
| host | ✓ | str | Hostname or IP address of the server. |
| user | ✓ | str | The user to connect to the server as. |
| password | ✓ | str | Password for the specified user. |
| file | ✓ | str | File name (and path, if required) to write to the server. |
| order_by | | str | Uses SQL syntax to sort the output. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |