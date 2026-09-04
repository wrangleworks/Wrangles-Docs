---
title: Classify
slug: /excel/classify
---

- [Basics *Unsure how to start? Learn how.*](/excel)
\{.links-list\}

---

Classify Wrangles use an AI model to categorize your data. They can be used for scenarios such as predicting which categories products belong to or which marketing campaigns customers should be assigned to.

You can train Classify Wrangles from Excel.  If you need a more advanced model, WrangleWorks offer a fast, cost-effective service to design Bespoke Wrangles to meet your requirements.

# Create a New Classify Wrangle
A Classification Wrangle must be trained before being used. Classification Wrangles use 'supervised' learning, by providing a set of examples and the categories they belong to. The greater the variety and number of examples you provide, the better the model will become.

Click the '+' button and add the training data onto the sheet. A notes column is provided, but is not used as part of the training. Add a name and click Submit to train the new Wrangle.

## Example
This is an example of data that could be use to train a Classify Wrangle to predict which categories different foods belong to.

| Example | Category |
| :-- | :-- |
| rice | Grains |
| cereal | Grains |
| flour | Grains |
| milk | Dairy |
| cheese | Dairy |
| yoghurt | Dairy |
| beef | Meat |
| chicken | Meat |
| lamb | Meat |
| strawberry | Fruit |
| grapes | Fruit | 
| apple | Fruit |
| potato | Vegetable |
| carrot | Vegetable |
| broccoli | Vegetable |

## Limitations

- Maximum 50,000 rows of training data.
- Maximum 10mb total training data.
- Maximum 500 unique categories.
- Only a single tier hierarchy is supported, multi-level hierarchies can be trained as a Bespoke Wrangle.

# Update an Existing Classify Wrangle

To update an existing Classify Wrangle, click on the extra menu (...) for the relevant Wrangle and choose Edit. The previous training data will be shown and can be added to or updated. Click Submit when finished to retrain the Wrangle.

# Use a Classify Wrangle
<!-- wrangle: {"type":"classify","model_id":"06669ef8-cdd1-42f7-8078-98e0b7a42c30"} -->

> Click [here](/wrangle/ai#classify) to learn how to use Classify Wrangles in a recipe.
\{.is-success\}

To use your trained Classify Wrangle, select the column of data that you wish to classify and click the run button (⏵). The predicted categories will be inserted as a column to the right of your inputs.

Classify Wrangles can predict from the examples you have given, but also infer for new examples that are related.

These are some predictions for a model trained with the earlier data.

| Input | | Prediction |
| :-- | :-- | :-- |
| orange | → | Fruit |
| cauliflower | → | Vegetable |
| ice cream | → | Dairy |
| wheat | → |Grains |
| venison | → | Meat |

The following gif demonstrates using a trained Classify Wrangle to predict which categories products belong to based on their descriptions.

![product_categories.gif](/gifs/product_categories.gif)


# Bespoke

WrangleWorks can train bespoke models that exceed the limitations of Classification Wrangles trained from Excel.

> This is an example bespoke model for predicting the UNSPSC for products. 
[Contact Us](https://www.wrangleworks.com/contact.html) if you'd like to learn more.
\{.is-info\}

[UNSPSC^®^](https://www.unspsc.org/) is an open, global, multi-level classification for products and services. It is a "multi sector" standard designed to cover all products and services, with more than 100,000 distinct categories.

This bespoke model offers a high level of detail, along with multi-level categorisation allowing it to vary the level of specificity depending on the confidence of the prediction.

![unspsc.gif](/gifs/unspsc.gif)