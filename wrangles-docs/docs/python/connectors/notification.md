---
title: "Notification"
slug: /python/connectors/notification
---

> Added **v0.5**
\{.is-info\}

Send notifications - such as to alert someone when a recipe is finished or if it fails.


# Tabset \{.tabset\}
## Run (Generic)

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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| url | ✓ | str | Apprise url. See [docs](https://github.com/caronc/apprise). |
| title | ✓ | str | The title of the notification. |
| body | ✓ | str | The body of the notification. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Specific Services

A variety of notifications for specific services are also available.

- [Email *Send an email.*](/python/connectors/notification/email)
- [Telegram *Send telegram messages.*](/python/connectors/notification/telegram)
- [Slack *Send Slack messages*](https://wrangles.io/en/python/connectors/notification/slack)
\{.links-list\}