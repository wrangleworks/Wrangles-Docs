---
schema_version: '0.2'
type: connector
catalog_id: '138'
catalog_key: connector.ssh
catalog_kind: connector
runtime_key: ssh
status: active
title: SSH
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  run:
    type: object
    description: Issue commands over SSH
    required:
      - host
      - user
      - password
      - command
    properties:
      host:
        type: string
        description: Domain or IP of the host
      user:
        type: string
        description: The user to connect as
      password:
        type: string
        description: Password for the user
      key_filename:
        type: string
        description: Path to a file that contains the private key
      private_key:
        type: string
        description: Provide an RSA Private Key as a string
      command:
        type:
          - string
          - array
        description: >-
          Command or list of commands to execute. When providing a list, note that all commands are
          executed in isolation, i.e. cd /dir in a prior command will not affect the directory for
          later commands.
description: Issue commands over SSH
slug: connectors/ssh
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/ssh.md
    title: Existing connector documentation
---

# SSH

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
