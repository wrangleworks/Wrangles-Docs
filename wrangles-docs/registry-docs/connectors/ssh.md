---
title: "SSH"
description: "Issue commands over SSH"
slug: /connectors/ssh
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# SSH <CopyableCode value="ssh" />

> Added **v0.5**

Execute commands via SSH - such as to trigger an action before or after a recipe is run.

### Run
### Recipe
```yaml
run:
  on_success:
    - ssh:
        host: host
        user: user
        password: password
        command: apt update
```

### Function
```python
from wrangles.connectors import ssh
ssh.run(
    host = 'host',
    user = 'user',
    password = 'password',
    command = 'apt update'
)
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Run

Issue commands over SSH

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | string | Domain or IP of the host |
| `user` | Yes | string | The user to connect as |
| `password` | Yes | string | Password for the user |
| `key_filename` | No | string | Path to a file that contains the private key |
| `private_key` | No | string | Provide an RSA Private Key as a string |
| `command` | Yes | string / array | Command or list of commands to execute. When providing a list, note that all commands are executed in isolation, i.e. cd /dir in a prior command will not affect the directory for later commands. |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Issue commands over SSH",
  "required": [
    "host",
    "user",
    "password",
    "command"
  ],
  "properties": {
    "host": {
      "type": "string",
      "description": "Domain or IP of the host"
    },
    "user": {
      "type": "string",
      "description": "The user to connect as"
    },
    "password": {
      "type": "string",
      "description": "Password for the user"
    },
    "key_filename": {
      "type": "string",
      "description": "Path to a file that contains the private key"
    },
    "private_key": {
      "type": "string",
      "description": "Provide an RSA Private Key as a string"
    },
    "command": {
      "type": [
        "string",
        "array"
      ],
      "description": "Command or list of commands to execute. When providing a list, note that all commands are executed in isolation, i.e. cd /dir in a prior command will not affect the directory for later commands."
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

</details>

[Machine-readable contract](/registry/connectors/ssh.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
