---
title: "Telegram"
slug: /python/connectors/notification/telegram
---

> Added **v0.5**
\{.is-info\}

Send a telegram notification - such as to alert someone when a recipe is finished or if it fails.

See [docs](https://core.telegram.org/bots) for how to setup and get required keys.


# Tabset \{.tabset\}
## Run
### Recipe
```yaml
run:
  on_failure:
    - notification.telegram:
        bot_token: 1234567890:AAA-a0a...
        chat_id: 1234567890
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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| bot_token | ✓ | str | The token for the bot. See [docs](https://github.com/caronc/apprise/wiki/Notify_telegram). |
| chat_id | ✓ | str | The ID of the chat. See [docs](https://github.com/caronc/apprise/wiki/Notify_telegram). |
| title | ✓ | str | The title of the notification. |
| body | ✓ | str | The body of the notification. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |