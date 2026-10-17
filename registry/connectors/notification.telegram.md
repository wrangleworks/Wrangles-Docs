---
schema_version: '0.2'
type: connector
catalog_id: '126'
catalog_key: connector.notification.telegram
catalog_kind: connector
runtime_key: notification.telegram
status: active
title: Telegram
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  run:
    type: object
    description: Send a telegram message. See https://core.telegram.org/bots
    required:
      - bot_token
      - chat_id
      - title
      - body
    properties:
      bot_token:
        type: string
        description: The token for the bot. See https://core.telegram.org/bots
      chat_id:
        type: string
        description: The ID of the chat. See https://core.telegram.org/bots
      title:
        type: string
        description: The title of the notification
      body:
        type: string
        description: The body of the notification
      attachment:
        type:
          - string
          - array
        description: >-
          A file path & name to attach to the message. Supports a single file or a list of files.
          Must be supported by the specific notification type.
      format:
        type: string
        description: The format of the message. One of 'text', 'markdown' or 'html'. Default is 'text'
        default: text
description: Send a telegram message. See https://core.telegram.org/bots
slug: connectors/notification.telegram
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/notification/telegram.md
    title: Existing connector documentation
---

# Telegram

> Added **v0.5**

Send a telegram notification - such as to alert someone when a recipe is finished or if it fails.

See [docs](https://core.telegram.org/bots) for how to setup and get required keys.

### Run
### Recipe
```yaml
run:
  on_failure:
    - notification.telegram:
        bot_token: 1234567890:AAA-a0a...
        chat_id: '1234567890'
        title: title
        body: body
```

### Function
```python
from wrangles.connectors.notification import telegram
telegram.run(
    bot_token = '1234567890:AAA-a0a...',
    chat_id = '1234567890',
    title = 'title',
    body = 'body'
)
```
