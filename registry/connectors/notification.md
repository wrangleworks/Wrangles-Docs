---
schema_version: '0.2'
type: connector
catalog_id: '123'
catalog_key: connector.notification
catalog_kind: connector
runtime_key: notification
status: active
title: Notification
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  run:
    type: object
    description: Send a notification
    required:
      - url
      - title
      - body
    properties:
      url:
        type: string
        description: Apprise notification url. See https://github.com/caronc/apprise
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
description: Send a notification
slug: connectors/notification
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/notification.md
    title: Existing connector documentation
---

# Notification

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
