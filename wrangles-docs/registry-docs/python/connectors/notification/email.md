---
title: "Email"
slug: /python/connectors/notification/email
---

> Added **v0.5**
\{.is-info\}

Send an email - such as to alert someone when a recipe is finished or if it fails.


# Tabset \{.tabset\}
## Run
### Recipe
```yaml
run:
  on_failure:
    - notification.email:
        user: user@domain.com
        password: password
        subject: subject
        body: body
        
        # Optional
        host: smtp.service
        to: example@email.com
        cc:
          - example@email.com
          - example2@email.com
        bcc:
        	- boss@email.com
        name: Joe Bloggs
        domain: my_domain.com
```

### Function
```python
from wrangles.connectors.notification import email
email.run(
    user = 'user@domain.com',
    password = 'password',
    subject = 'subject',
    body = 'body'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| user | ✓ | str | The user to send the email from. This may be your full email address, but depends on your service. |
| password | ✓ | str | The password for the user to send from. |
| subject | ✓ | str | The subject of the email. |
| body | ✓ | str | The body of the email. |
| host |  | str | The SMTP server for your service. This may be omitted for common services such as yahoo, gmail or hotmail but will be needed otherwise. |
| to |  | str / list | An email or list of emails to send the email to. If omitted, the email will be sent to the sender. |
| cc |  | str / list | An email or list of emails to cc the email to. |
| bcc |  | str / list | Blind Carbon Copy email address(es). |
| name |  | str | The name to show the email as being from. If omitted, defaults to the user. |
| domain |  | str | The domain to send the email under. If omitted, it will be inferred from the user |
| attachment |  | str / list | A file or list of files to send as attachments |
| if | | str | A condition that will determine whether the action runs or not as a whole. |