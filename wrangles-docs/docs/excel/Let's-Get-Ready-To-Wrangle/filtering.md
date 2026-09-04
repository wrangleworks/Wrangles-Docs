---
title: "Filtering"
slug: /excel/Let's-Get-Ready-To-Wrangle/filtering
---

# Introduction

In the Wrangles platform, there are two main ways to filter your data, the filter wrangle and the where parameter but there are some very important differences between the two that you should know about before implementing into your recipe.

The main differences between a filter wrangle and the where parameter are that the filter wrangle filters the entire dataset, dropping everything that does not match your criteria, whereas the where parameter does not. The where parameter is used to allow wrangles (of many types) to only be ran on the data that match your criteria, while leaving the dataset intact as a whole.

This tutorial will go in depth to show you where (no pun intended) both types of filters should be used, and how to use them.

# The Filter Wrangle

The [filter wrangle](/wrangle/select#filter) is used to filter the entire dataset, and drop all rows which do not match the criteria layed out within the wrangle.

For example, if you are working with a dataset made up of all the products a company has to offer, but you only want to work with a certain category or categories. This is where the filter wrangle should be used. Example code is shown below:

```yaml
wrangles:
	- filter:
  		input: Category
      equal: Hand Tools
```

Or, if you wanted to filter on multiple categories you'd simply list them out under equals:

```yaml
wrangles:
	- filter:
  		input: Category
      equal: 
      	- Hand Tools
        - Power Tools
        - Specialty Tools
```

The first example above would output a subset of the original dataset made up of only items that had a Category of "Hand Tools." The second example would output a subset of "Hand Tools," "Power Tools," and "Specialty Tools."

There are many more ways to filter your data set other than using equal. See the parameters tab in the [filter wrangle](/wrangle/select#filter) section for more ways to use the filter wrangle. Multiple parameters can be used at once, but I would suggest against this as it becomes very easy to over filter your data.

# The Where Parameter

The where parameter is used to run wrangles on a subset of data without dropping rows. That is, it only runs the wrangle on the rows which match your criteria.

The where parameters implements [SQLite](https://www.sqlite.org/docs.html) to filter (using a where clause) datasets prior to running the wrangle. Sites like [sqlitetutorial.net](https://www.sqlitetutorial.net/sqlite-where/) can help guide you along the way of writing your where clause. When writing your where clause, keep in mind that you do not need to include "where," the wrangle will add that for you. It is important to write a valid sql statement in order for the where parameter to work. If the where clause is invalid, the wrangle will fail.

While sql is very powerful, and can be used in many ways, he where parameter is only meant to filter the data that the wrangle is meant to be ran on. To implement sql into your recipe, see the [sql wrangle](/wrangle/compute#sql).

# Using Where in a Filter Wrangle

The filter wrangle is meant to cover all possible use cases of filtering data in order to avoid having to write sql statements. For this reason, we suggest only using where in a filter wrangle when sql is absolutely necessary.

When using the filter wrangle with where and an input, the data is first filtered with the where clause *then* filtered using the input and condition given. This can get confusing and cause problems, therefore it is **not advised**. When filtering, we suggest to use where independently of all other filter parameters except where_params.

## Where Where Can't Be Used

The where parameter can be used with most wrangles, but there are a few wrangles that it cannot be used in. These wrangles are as follows:

- drop
- pandas.transpose
- reindex
- rename
- select.group_by
- split.list
- sql
- transpose