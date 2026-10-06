---
title: "Schema"
slug: /python/recipes/schema
---

> A schema for the recipes is available here:
> https://public.wrangle.works/schema/recipes/schema.json
>
> Specific versions can be used by appending the version number.
> e.g. .../recipes/schema_0.4.json
\{.is-info\}

This schema can be used to provide validation and auto-complete suggestions in various code editors.

# VS Code

Follow these instuctions to enable in VS Code. Once added, any file named *.wrgl.yml* will trigger the validation.

1. Install the YAML extension.
![yaml-extension-vscode.png](/images/yaml-extension-vscode.png)

1. From the VS Code settings (Ctrl + ,), search yaml schema and click *'Edit in settings.json'*
  ![vscode-yaml-schema.png](/images/vscode-yaml-schema.png)

1. Modify or add the yaml.schemas section as below
```json
"yaml.schemas": {
  "https://public.wrangle.works/schema/recipes/schema.json": ["*.wrgl.yml", "*.wrgl.yaml"]
},
```

4. Restart VS Code to ensure the new schema is loaded. If successful, validation will appear for files with the extensions wrgl.yml or wrgl.yaml.
![vscode-recipe-validation-demo.png](/images/vscode-recipe-validation-demo.png)