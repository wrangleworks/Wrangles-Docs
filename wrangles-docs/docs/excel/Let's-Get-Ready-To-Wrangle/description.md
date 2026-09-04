---
title: "Description"
slug: /excel/Let's-Get-Ready-To-Wrangle/description
---

# Creating a Description

This tutorial will show you how to create a customized description from dataframe columns with a jinja template. We will start by using a simple, hard coded, jinja template then show how to create and use a dynamic template.

We will largely be working with the [create.jinja](/wrangle/create#jinja) wrangle if you are unfamiliar with it.

## Hard Coded Template

The easiest way to create a new description is to hard code a jinja template that can be used across the entire dataset. We will use the table below as a example.

| Brand | Product Type | Features |
|:-----:|:------------:|:--------:|
| Bosch | Angle Grinder | 4.5", 120v |
| Makita | Impact Driver | |
| DeWalt | Reciprocating Saw | 20v |
| Milwaukee | Orbital Sander | With dust extraction |

```yaml
wrangles:
  - rename:
      Product Type: Product_Type
      
  - create.jinja:
      output: Description
      template:
        string: {{ Brand }} {{ Product_Type }} ({{ Features }})
        
  - rename:
      Product_Type: Product Type
```

In the recipe above, we first renamed the Product Type column to Product_Type because jinja does not allow variables to contain spaces. The jinja templated uses variables (wrapped in double squigly brackets) which correspond to column names. Notice that anything not wrapped in double squigly brackets is passed through to the output, in this case parenthesis.

| Brand | Product Type | Features | Description |
|:-----:|:------------:|:--------:|:-----------:|
| Bosch | Angle Grinder | 4.5", 120v | Bosch Angle Grinder (4.5", 120v) |
| Makita | Impact Driver | | Makita Impact Driver () |
| DeWalt | Reciprocating Saw | 20v | DeWalt Reciprocating Saw (20v) |
| Milwaukee | Orbital Sander | With dust extraction | Milwaukee Orbital Sander (With dust extraction) |

As you can see in the second row, the Features column is empty which resulted in an empty set of parenthesis. Let's add an if statement to our template to deal with empty Features.

```yaml
wrangles:
  - rename:
      Product Type: Product_Type
      
  - create.jinja:
      output: Description
      template:
        string: {{ Brand }} {{ Product_Type }} {% if Features %} ({{ Features }}) {% endif %}
        
  - rename:
      Product_Type: Product Type
```

In the new template, we used a conditional [control structure](https://jinja.palletsprojects.com/en/3.1.x/templates/#list-of-control-structures) (ie if statement) to keep from outputting empty parenthesis. In jinja, control structures are wrapped in "\{% %\}".

| Brand | Product Type | Features | Description |
|:-----:|:------------:|:--------:|:-----------:|
| Bosch | Angle Grinder | 4.5", 120v | Bosch Angle Grinder (4.5", 120v) |
| Makita | Impact Driver | | Makita Impact Driver |
| DeWalt | Reciprocating Saw | 20v | DeWalt Reciprocating Saw (20v) |
| Milwaukee | Orbital Sander | With dust extraction | Milwaukee Orbital Sander (With dust extraction) |

## Dynamic Template

By emplementing yaml aliases, along with a custom python function, we can utilize different templates for different categories of data. In this example, we will use Product Category to decide what sort of template we want to emplement.

The table below illustrates our example data:

| Brand | Product Type | Product Category | Voltage | Handle Length | TPI |
|:-----:|:------------:|:----------------:|:-------:|:-------------:|:---:|
| Makita | Impact Driver | Power Tools | 18v | | |
| Klein | Diagonal Cutting Pliers | Hand Tools | | 4.5" | |
| Diablo | Reciprocating Saw Blade | Power Tool Accessories | | | 11 |

```yaml
alias:
  - &Templates {
      Power Tools: '{{ Brand }} {{ Product_Type }} ({{ Voltage }})',
      Hand Tools: '{{ Brand }} {{ Product_Type }} ({{ Handle_Length }})',
      Power Tool Accessories: '{{ Brand }} {{ Product_Type }} ({{ TPI }}tpi)'
  }

wrangles:
  - rename:
      Product Type: Product_Type
      Product Category: Product_Category
      Handle Length: Handle_Length

  - custom.template_builder:
      category: Product_Category
      alias: *Templates
      output: Template

  - create.jinja:
      output: Description
      template: 
        column: Template

  - rename:
      Product_Type: Product Type
      Product_Category: Product Category
      Handle_Length: Handle Length

write:
  - dataframe:
      not_columns:
        - Template
```

```python
def template_builder(df, category, alias, output):
    temp_list = []
    for i in range(len(df)):
        temp_list.append(alias[df[Category][i]])
    df[output] = temp_list
    return df

df = wrangles.recipe.run(recipe='temporary.wrgl.yml', dataframe=data, functions=template_builder)
```

In the above code, a custom function (template_builder) is used to step into the alias and output a column of templates based on category.

| Brand | Product Type | Product Category | Voltage | Handle Length | TPI | Description |
|:-----:|:------------:|:----------------:|:-------:|:-------------:|:---:|:-----------:|
| Makita | Impact Driver | Power Tools | 18v | | | Makita Impact Driver (18v) |
| Klein | Diagonal Cutting Pliers | Hand Tools | | 4.5" | | Klein Diagonal Cutting Pliers (4.5") |
| Diablo | Reciprocating Saw Blade | Power Tool Accessories | | | 11 | Diablo Reciprocating Saw Blade (11tpi) |

As you can see in our output, each product utilizes a different template based on their respective category. 

There are many ways to implement jinja templates to write descriptions, and this is a very simple example. For loops, if statements and many more python-like functions can be used in jinja to taylor your output to your needs. See the [jinja documentation](https://jinja.palletsprojects.com/en/3.1.x/templates/) if this example does not fit your needs.