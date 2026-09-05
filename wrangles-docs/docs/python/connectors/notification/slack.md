---
title: "Slack"
slug: /python/connectors/notification/slack
---

> Added **v0.5**
\{.is-info\}

Send a Slack notification - such as to alert someone when a recipe is finished or if it fails.

See [docs](https://slack.com/apps/new/A0F7XDUAZ-incoming-webhooks) for how to create a WebHook in Slack.


# Tabset \{.tabset\}
## Run
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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| web_hook | ✓ | str | Slack WebHook. See [docs](https://slack.com/apps/new/A0F7XDUAZ-incoming-webhooks). |
| title | ✓ | str | The title of the notification. |
| message | ✓ | str | The body of the notification. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |