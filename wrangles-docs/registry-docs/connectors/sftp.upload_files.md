---
title: "Sftp Upload Files"
description: "Upload files from the local file system to an SFTP host."
slug: /connectors/sftp.upload_files
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Sftp Upload Files <CopyableCode value="sftp.upload_files" />

Upload files from the local file system to an SFTP host.

## Parameters

### Run

Upload files from the local file system to an SFTP host.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | The hostname of the SFTP server. |
| `user` | Yes | string | The user to authenticate as. |
| `password` | Yes | string | The password for the user. |
| `files` | Yes | string / array | A file, or list of files, to upload. If remote is not specified, they will be saved to the SFTP user's default directory. |
| `remote` | No | string / array | (Optional) The remote filename(s) to save the files as. |
| `port` | No | integer | The port to connect to. Default 22. |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Upload files from the local file system to an SFTP host.",
  "required": [
    "host",
    "user",
    "password",
    "files"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "The hostname of the SFTP server.",
      "examples": [
        "sftp.domain.com"
      ]
    },
    "user": {
      "type": "string",
      "description": "The user to authenticate as."
    },
    "password": {
      "type": "string",
      "description": "The password for the user."
    },
    "files": {
      "type": [
        "string",
        "array"
      ],
      "description": "A file, or list of files, to upload. If remote is not specified, they will be saved to the SFTP user's default directory."
    },
    "remote": {
      "type": [
        "string",
        "array"
      ],
      "description": "(Optional) The remote filename(s) to save the files as."
    },
    "port": {
      "type": "integer",
      "description": "The port to connect to. Default 22."
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

[Machine-readable contract](/registry/connectors/sftp.upload_files.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
