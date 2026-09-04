---
title: "Run"
slug: /python/recipes/run
---

# Run

Run allows you to run a recipe from a recipe (recipe-ception). This can be executed before running the recipe (on_start), after the recipe has successfuly run (on_success), or when the recipe has failed to run (on_failure). Run executes wrangles and connectors independently of the recipe it is in, so it is important to read in any data needed before running a recipe or connector.

## On Start

Before a recipe begins running, on_start will run any connector of your choice. This can be used to read in your data from an outside source and pre-wrangle it before running your recipe.

```yaml
run:
  on_start:
    - recipe:
        name: pre_recipe_recipe.wrgl.yml

wrangles:
  - your.wrangles: {}
```

## On Success

Once a recipe has ran successfully, on_success will run a connector of your choosing. This is a good option for post-recipe formatting, sending a notification with the notification connector, or writing your data to an additional source.

```yaml
run:
  on_success:
    - s3.upload_files:
        bucket: s3-bucket
        file: example.csv
              
wrangles:
  - your.wrangles: {}
```

## On Failure

If a recipe has failed to run, on_failure can be used to run a backup recipe, or use a connector of your choice. This option is useful for setting a back-up recipe in the event that yours fails, or sending a failure notification via the notification connector.

```yaml
run:
  on_failure:
    - notification.email:
        user: user@domain.com
        password: password
        subject: subject
        body: body
        
wrangles:
  - your.broken_wrangles: {}
```