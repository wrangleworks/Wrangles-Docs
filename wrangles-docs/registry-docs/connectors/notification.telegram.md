---
title: "Telegram"
description: "Send a telegram message. See https://core.telegram.org/bots"
slug: /connectors/notification.telegram
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Telegram <CopyableCode value="notification.telegram" />

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

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Run

Send a telegram message. See https://core.telegram.org/bots

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `bot_token` | Yes | string | The token for the bot. See https://core.telegram.org/bots |
| `chat_id` | Yes | string | The ID of the chat. See https://core.telegram.org/bots |
| `title` | Yes | string | The title of the notification |
| `body` | Yes | string | The body of the notification |
| `attachment` | No | string / array | A file path &amp; name to attach to the message. Supports a single file or a list of files. Must be supported by the specific notification type. |
| `format` | No | string | The format of the message. One of 'text', 'markdown' or 'html'. Default is 'text' |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Send a telegram message. See https://core.telegram.org/bots",
  "required": [
    "bot_token",
    "chat_id",
    "title",
    "body"
  ],
  "properties": {
    "bot_token": {
      "type": "string",
      "description": "The token for the bot. See https://core.telegram.org/bots"
    },
    "chat_id": {
      "type": "string",
      "description": "The ID of the chat. See https://core.telegram.org/bots"
    },
    "title": {
      "type": "string",
      "description": "The title of the notification"
    },
    "body": {
      "type": "string",
      "description": "The body of the notification"
    },
    "attachment": {
      "type": [
        "string",
        "array"
      ],
      "description": "A file path & name to attach to the message. Supports a single file or a list of files. Must be supported by the specific notification type."
    },
    "format": {
      "type": "string",
      "description": "The format of the message. One of 'text', 'markdown' or 'html'. Default is 'text'",
      "default": "text"
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

</details>

[Machine-readable contract](/registry/connectors/notification.telegram.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
