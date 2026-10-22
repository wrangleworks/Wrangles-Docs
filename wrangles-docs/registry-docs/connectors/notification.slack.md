---
title: "Slack"
description: "Send a message to Slack"
slug: /connectors/notification.slack
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Slack <CopyableCode value="notification.slack" />

> Added **v0.5**

Send a Slack notification - such as to alert someone when a recipe is finished or if it fails.

See [docs](https://slack.com/apps/new/A0F7XDUAZ-incoming-webhooks) for how to create a WebHook in Slack.

### Run
### Recipe
```yaml
run:
  on_success:
    - notification.slack:
        web_hook: Slack WebHook
        title: title
        message: message
```

### Function
```python
from wrangles.connectors.notification import slack
slack.run(
    web_hook= 'Slack WebHook',
    title='title',
    message='message'
)
```

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Run

Send a message to Slack

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `web_hook` | Yes | string | Webhook to post a message to Slack |
| `title` | Yes | string | Title of the message to send to Slack |
| `message` | Yes | string | Message to send to Slack |
| `attachment` | No | string / array | A file path &amp; name to attach to the message. Supports a single file or a list of files. Must be supported by the specific notification type. |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Send a message to Slack",
  "required": [
    "web_hook",
    "title",
    "message"
  ],
  "properties": {
    "web_hook": {
      "type": "string",
      "description": "Webhook to post a message to Slack"
    },
    "title": {
      "type": "string",
      "description": "Title of the message to send to Slack"
    },
    "message": {
      "type": "string",
      "description": "Message to send to Slack"
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

</details>

[Machine-readable contract](/registry/connectors/notification.slack.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
