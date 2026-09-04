---
title: "Install"
slug: /python/install
---

> The below presumes you already have Python and a code editor installed. If not, [start here](/python/prerequisites).
\{.is-info\}

# Installation
The python package can be installed using [pip](https://pip.pypa.io/en/stable/getting-started/)
```bash
pip install wrangles --upgrade
```

Once installed, import the package into your code.
```python
import wrangles
```

# Authentication
Some Wrangles use cloud based machine learning models. To use them a WrangleWorks account is required.
> Create a WrangleWorks account: [Register](https://sso.wrangle.works/auth/realms/wrwx/protocol/openid-connect/registrations?client_id=account&response_type=code&scope=openid%20email&redirect_uri=https://sso.wrangle.works/auth/realms/wrwx/account/#/)
\{.is-warning\}

There are two ways to provide the credentials:

## Environment Variables
The credentials can be saved as the environment variables:

- `WRANGLES_USER`
- `WRANGLES_PASSWORD`

## Method
Alternatively, the credentials can be provided within the python code using the authenticate method, prior to calling other functions.
```python
wrangles.authenticate('<user>', '<password>')
```

---
> *Successfully installed?* [Learn how to Wrangle](/python)
\{.is-success\}