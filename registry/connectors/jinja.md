---
schema_version: '0.2'
type: connector
catalog_id: '117'
catalog_key: connector.jinja
catalog_kind: connector
runtime_key: jinja
status: active
title: Jinja
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  run:
    type: object
    description: Use a Jinja template with a context to create a file
    additionalProperties: false
    required:
      - template
      - context
      - output_file
    properties:
      template:
        type: object
        additionalProperties: false
        description: The template to apply the values to. Either a file or string.
        properties:
          file:
            type: string
            description: A .jinja file containing the template
          string:
            type: string
            description: A string which is used as the jinja template
      context:
        type: object
        description: A dictionary used to define the output template
      output_file:
        type: string
        description: File name/path for the file to be output
description: Use a Jinja template with a context to create a file
slug: connectors/jinja
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/jinja.md
    title: Existing connector documentation
---

# Jinja

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
