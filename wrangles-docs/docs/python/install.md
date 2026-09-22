---
title: "Install"
slug: /python/install
---

> The below presumes you already have Python and a code editor installed. If not, [start here](/python/prerequisites).

## Installation

The python package can be installed using [pip](https://pip.pypa.io/en/stable/getting-started/)

```bash
pip install wrangles --upgrade
```

Once installed, import the package into your code.

```python
import wrangles
```

## Authentication

> Create a WrangleWorks account: [Register](https://sso.wrangle.works/auth/realms/wrwx/protocol/openid-connect/registrations?client_id=account&response_type=code&scope=openid%20email&redirect_uri=https://sso.wrangle.works/auth/realms/wrwx/account/#/)

Some Wrangles use cloud based machine learning models. To use them a WrangleWorks account is required.

There are two ways to provide the credentials:

### Environment Variables

The credentials can be saved as the environment variables:

-   `WRANGLES_USER`
-   `WRANGLES_PASSWORD`

### Method

Alternatively, the credentials can be provided within the python code using the authenticate method, prior to calling other functions.

```python
wrangles.authenticate('<user>', '<password>')
```

## Schema Validation

> A schema for the recipes is available here:
> [https://public.wrangle.works/schema/recipes/schema.json](https://public.wrangle.works/schema/recipes/schema.json)
>
> Specific versions can be used by appending the version number.
> e.g. .../recipes/schema\_0.4.json

This schema can be used to provide validation and auto-complete suggestions in various code editors.

Follow these instuctions to enable in VS Code. Once added, any file named \**.recipe*, or *.wrgl.yml* will activate the schema validation.

1.  Install the YAML extension.
    ![yaml-extension-vscode.png](/images/yaml-extension-vscode.png)

2.  From the VS Code settings (Ctrl + ,), search yaml schema and click *'Edit in settings.json'*
    ![vscode-yaml-schema.png](/images/vscode-yaml-schema.png)

3.  Modify or add the yaml.schemas and file.associations sections as below

```json
"files.associations": {
   "*.recipe": "yaml"
},
"yaml.schemas": {
  "https://public.wrangle.works/schema/recipes/schema.json": ["*.recipe", "*.wrgl.yml", "*.wrgl.yaml"]
},
```

4.  Restart VS Code to ensure the new schema is loaded. If successful, validation will appear for files with the extensions .recipe, wrgl.yml, or wrgl.yaml.
    ![vscode-recipe-validation-demo.png](/vscode-recipe-validation-demo.png)

* * *

> *Successfully installed?* [Learn how to Wrangle](/python)
