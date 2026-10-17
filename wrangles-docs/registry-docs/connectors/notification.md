---
title: "Notification"
description: "Send a notification"
slug: /connectors/notification
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Notification <CopyableCode value="notification" />

> Added **v0.5**

Send notifications - such as to alert someone when a recipe is finished or if it fails.

### Run (Generic)

Notifications use the Apprise python package. The default notification requires an apprise formatted url, see the [apprise documentation](https://github.com/caronc/apprise) for specifics of how to form an appropriate url.

### Recipe
```yaml
run:
  on_failure:
    - notification:
        url: apprise://hostname/Token
        title: title
        body: body
```

### Function
```python
from wrangles.connectors import notification
notification.run(
    url = 'apprise://hostname/Token',
    title = 'title',
    body = 'body'
)
```

### Specific Services

A variety of notifications for specific services are also available.

- [Email *Send an email.*](/py/connectors/notification.email)
- [Telegram *Send telegram messages.*](/py/connectors/notification.telegram)
- [Slack *Send Slack messages*](/py/connectors/notification.slack)

## Parameters

### Run

Send a notification

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `url` | Yes | string | Apprise notification url. See https://github.com/caronc/apprise |
| `title` | Yes | string | The title of the notification |
| `body` | Yes | string | The body of the notification |
| `attachment` | No | string / array | A file path &amp; name to attach to the message. Supports a single file or a list of files. Must be supported by the specific notification type. |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Send a notification",
  "required": [
    "url",
    "title",
    "body"
  ],
  "properties": {
    "url": {
      "type": "string",
      "description": "Apprise notification url. See https://github.com/caronc/apprise"
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
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

[Machine-readable contract](/registry/connectors/notification.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
