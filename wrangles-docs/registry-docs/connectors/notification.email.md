---
title: "Email"
description: "Send an email"
slug: /connectors/notification.email
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Email <CopyableCode value="notification.email" />

> Added **v0.5**

Send an email - such as to alert someone when a recipe is finished or if it fails.

### Run
### Recipe
```yaml
run:
  on_failure:
    - notification.email:
        user: user@domain.com
        password: password
        subject: subject
        body: body
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

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Run

Send an email

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `user` | Yes | string | The user to send the email from. This may be your full email address, but depends on your service |
| `password` | Yes | string | The password for the user to send from |
| `subject` | Yes | string | The subject of the email |
| `body` | Yes | string | The body of the notification |
| `host` | No | string | The SMTP server for your service. This may be omitted for common services such as yahoo, gmail or hotmail but will be needed otherwise. |
| `to` | No | string / array | An email or list of emails to send the email to. If omitted, the email will be sent to the sender. |
| `cc` | No | string / array | An email or list of emails to cc the email to. |
| `bcc` | No | string / array | Blind Carbon Copy email address(es). |
| `name` | No | string | The name to show the email as being from. If omitted, defaults to the user. |
| `domain` | No | string | The domain to send the email under. If omitted, it will be inferred from the user |
| `attachment` | No | string / array | A file path &amp; name to attach to the message. Supports a single file or a list of files. Must be supported by the specific notification type. |
| `format` | No | string | The format of the message. One of 'text', 'markdown' or 'html'. Default is 'text' |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Send an email",
  "required": [
    "user",
    "password",
    "subject",
    "body"
  ],
  "properties": {
    "user": {
      "type": "string",
      "description": "The user to send the email from. This may be your full email address, but depends on your service"
    },
    "password": {
      "type": "string",
      "description": "The password for the user to send from"
    },
    "subject": {
      "type": "string",
      "description": "The subject of the email"
    },
    "body": {
      "type": "string",
      "description": "The body of the notification"
    },
    "host": {
      "type": "string",
      "description": "The SMTP server for your service. This may be omitted for common services such as yahoo, gmail or hotmail but will be needed otherwise."
    },
    "to": {
      "type": [
        "string",
        "array"
      ],
      "description": "An email or list of emails to send the email to. If omitted, the email will be sent to the sender."
    },
    "cc": {
      "type": [
        "string",
        "array"
      ],
      "description": "An email or list of emails to cc the email to."
    },
    "bcc": {
      "type": [
        "string",
        "array"
      ],
      "description": "Blind Carbon Copy email address(es)."
    },
    "name": {
      "type": "string",
      "description": "The name to show the email as being from. If omitted, defaults to the user."
    },
    "domain": {
      "type": "string",
      "description": "The domain to send the email under. If omitted, it will be inferred from the user"
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

[Machine-readable contract](/registry/connectors/notification.email.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
