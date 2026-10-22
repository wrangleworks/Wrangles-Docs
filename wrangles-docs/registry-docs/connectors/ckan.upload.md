---
title: "Ckan Upload"
description: "Upload a file or list of files to a CKAN dataset"
slug: /connectors/ckan.upload
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Ckan Upload <CopyableCode value="ckan.upload" />

Upload a file or list of files to a CKAN dataset

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Run

Upload a file or list of files to a CKAN dataset

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | The host name of the CKAN site. e.g. https://data.example.com |
| `api_key` | Yes | string | API Key for the CKAN site. |
| `dataset` | Yes | string | The name of the dataset. This should be the url version e.g. my-dataset |
| `file` | Yes | string / array | The name of the specific file within the dataset. e.g. example.csv |
| `output_file` | No | string / array | A name or list of names that the files will be saved as. If omitted, defaults to the original filename.  |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Upload a file or list of files to a CKAN dataset",
  "required": [
    "host",
    "api_key",
    "dataset",
    "file"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "The host name of the CKAN site. e.g. https://data.example.com"
    },
    "api_key": {
      "type": "string",
      "description": "API Key for the CKAN site."
    },
    "dataset": {
      "type": "string",
      "description": "The name of the dataset. This should be the url version e.g. my-dataset"
    },
    "file": {
      "type": [
        "string",
        "array"
      ],
      "description": "The name of the specific file within the dataset. e.g. example.csv"
    },
    "output_file": {
      "type": [
        "string",
        "array"
      ],
      "description": "A name or list of names that the files will be saved as.\nIf omitted, defaults to the original filename.\n"
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

</details>

[Machine-readable contract](/registry/connectors/ckan.upload.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
