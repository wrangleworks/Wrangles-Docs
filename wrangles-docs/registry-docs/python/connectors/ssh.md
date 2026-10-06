---
title: "Ssh"
slug: /python/connectors/ssh
---

> Added **v0.5**
\{.is-info\}

Execute commands via SSH - such as to trigger an action before or after a recipe is run.


# Tabset \{.tabset\}
## Run
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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| host | ✓ | str | Hostname or IP address of the server. |
| user | ✓ | str | The user to connect as. |
| command | ✓ | str / list | Command or list of commands to execute. When providing a list, note that all commands are executed in isolation, i.e. cd /dir in a prior command will not affect the directory for later commands. |
| password |  | str | Password for the specified user. |
| key_filename |  | str | Path to a file that contains the private key. Either this or password must be provided. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |