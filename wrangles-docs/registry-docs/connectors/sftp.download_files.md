---
title: "Sftp Download Files"
description: "Download files from an SFTP host and save to the local file system."
slug: /connectors/sftp.download_files
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Sftp Download Files <CopyableCode value="sftp.download_files" />

Download files from an SFTP host and save to the local file system.

## Parameters

### Run

Download files from an SFTP host and save to the local file system.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | The hostname of the SFTP server. |
| `user` | Yes | string | The user to authenticate as. |
| `password` | Yes | string | The password for the user. |
| `files` | Yes | string / array | A file, or list of files, to download. If local is not specified, they will be saved to the current directory. |
| `local` | No | string / array | (Optional) The local filename(s) to save the remote files as. |
| `port` | No | integer | The port to connect to. Default 22. |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Download files from an SFTP host and save to the local file system.",
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
      "description": "A file, or list of files, to download. If local is not specified, they will be saved to the current directory."
    },
    "local": {
      "type": [
        "string",
        "array"
      ],
      "description": "(Optional) The local filename(s) to save the remote files as."
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

[Machine-readable contract](/registry/connectors/sftp.download_files.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
