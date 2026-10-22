---
schema_version: '0.2'
type: connector
catalog_id: '125'
catalog_key: connector.notification.slack
catalog_kind: connector
runtime_key: notification.slack
status: active
title: Slack
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  run:
    type: object
    description: Send a message to Slack
    required:
      - web_hook
      - title
      - message
    properties:
      web_hook:
        type: string
        description: Webhook to post a message to Slack
      title:
        type: string
        description: Title of the message to send to Slack
      message:
        type: string
        description: Message to send to Slack
      attachment:
        type:
          - string
          - array
        description: >-
          A file path & name to attach to the message. Supports a single file or a list of files.
          Must be supported by the specific notification type.
description: Send a message to Slack
slug: connectors/notification.slack
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/notification/slack.md
    title: Existing connector documentation
---

# Slack

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
