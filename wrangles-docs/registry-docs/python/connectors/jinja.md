---
title: "Jinja"
slug: /python/connectors/jinja
---

Use a Jinja template with a context to create a file.

# Tabset \{.tabset\}
## Run
### Recipe
```yaml
run:
  on_start:
    - jinja:
        template:
          string: |
          {% if Brand is defined %} {{ Brand }} {% endif %} {% if ProductType is defined %} {{ ProductType }}, {% endif %}
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

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| template | ✓ | obj | The template to apply the values to. Either a file or string. |
| context | ✓ | obj | A dictionary used to define the output template |
| output_file | ✓ | str | File name/path for the file to be output |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

#### Template Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| file | | str | A .jinja file containing the template |
| string | | str | A string which is used as the jinja template |