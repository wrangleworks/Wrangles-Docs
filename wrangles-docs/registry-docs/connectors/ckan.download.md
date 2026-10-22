---
title: "Ckan Download"
description: "Download data from CKAN and save to the local file system"
slug: /connectors/ckan.download
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Ckan Download <CopyableCode value="ckan.download" />

Download data from CKAN and save to the local file system

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Run

Download data from CKAN and save to the local file system

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | The host name of the CKAN site. e.g. https://data.example.com |
| `dataset` | Yes | string | The name of the dataset. This should be the url version e.g. my-dataset |
| `file` | Yes | string / array | A name or list of files within the dataset. e.g. example.csv |
| `api_key` | No | string | API Key for the CKAN site. |
| `output_file` | No | string / array | A name or list of names that the output will be saved as. If omitted, defaults to the same as the file.  |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Download data from CKAN and save to the local file system",
  "required": [
    "host",
    "dataset",
    "file"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "The host name of the CKAN site. e.g. https://data.example.com"
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
      "description": "A name or list of files within the dataset. e.g. example.csv"
    },
    "api_key": {
      "type": "string",
      "description": "API Key for the CKAN site."
    },
    "output_file": {
      "type": [
        "string",
        "array"
      ],
      "description": "A name or list of names that the output will be saved as.\nIf omitted, defaults to the same as the file.\n"
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

</details>

[Machine-readable contract](/registry/connectors/ckan.download.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
