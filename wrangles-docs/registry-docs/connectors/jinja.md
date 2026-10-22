---
title: "Jinja"
description: "Use a Jinja template with a context to create a file"
slug: /connectors/jinja
registry_entry: true
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import CopyableCode from '@site/src/components/CopyableCode';

# Jinja <CopyableCode value="jinja" />

Use a Jinja template with a context to create a file.

### Run
### Recipe
```yaml
run:
  on_start:
    - jinja:
        template:
          string: >-
            {% if Brand is defined %} {{ Brand }} {% endif %} {% if ProductType is defined %} {{
            ProductType }}, {% endif %}
        context:
          Brand: Brand
          ProductType: Product Type
        output_file: my_template.jinja
```

### Function
```python
from wrangles.connectors import ckan

template_string = '{% if Brand is defined %} {{ Brand }} {% endif %} {% if ProductType is defined %} {{ ProductType }}, {% endif %}'

df = jinja.run(
    template={'string': template_string},
    context={'Brand': 'Brand', 'ProductType': 'Product Type'},
    output_file='my_template.jinja'
)
```

#### Template Parameters

<details className="ww-field-disclosure">

<summary>Parameters</summary>

### Run

Use a Jinja template with a context to create a file

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `template` | Yes | object | The template to apply the values to. Either a file or string. |
| `context` | Yes | object | A dictionary used to define the output template |
| `output_file` | Yes | string | File name/path for the file to be output |
| `if` | No | string | Specify a condition to determine if this will execute or not. e.g. $&#123;variable&#125; == 1. Recipe variables $&#123;variable&#125; are parameterized and may be used within the statement. |

<details>
<summary>Full operation schema (including nested constraints)</summary>

```json
{
  "type": "object",
  "description": "Use a Jinja template with a context to create a file",
  "additionalProperties": false,
  "required": [
    "template",
    "context",
    "output_file"
  ],
  "properties": {
    "template": {
      "type": "object",
      "additionalProperties": false,
      "description": "The template to apply the values to. Either a file or string.",
      "properties": {
        "file": {
          "type": "string",
          "description": "A .jinja file containing the template"
        },
        "string": {
          "type": "string",
          "description": "A string which is used as the jinja template"
        }
      }
    },
    "context": {
      "type": "object",
      "description": "A dictionary used to define the output template"
    },
    "output_file": {
      "type": "string",
      "description": "File name/path for the file to be output"
    },
    "if": {
      "$ref": "#/$defs/run/commonProperties/if"
    }
  }
}
```

</details>

</details>

[Machine-readable contract](/registry/connectors/jinja.json) · [WranglesPY source commit](https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298)
