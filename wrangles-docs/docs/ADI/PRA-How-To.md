---
title: "Pra How To"
slug: /ADI/PRA-How-To
---

# About

The Product Research Agent (PRA for short) is a web scraper that searches the web and returns product data. It is triggered from the WranglesXL Excel add-in and runs in the cloud, then sends an email to users with the results attached and also uploads results to the user's folder in the wrangles file management system.

PRA performs searches based on part code, and manufacturer. Search and scrape results are scored based on content and accuracy to bring users the best results.

![pra_workflow.png](/gifs/adi-how-to/pra_workflow.png)

# How to Run the Product Research Agent (PRA)

This how-to aims to not only teach you how to run data through PRA, but also how to diagnose issues and get the best results possible.

## Starting in Excel

Start by opening the file containing the data you wish to run through PRA. Once opened, navigate to the WranglesXL add-in and click on My Wrangles to open up the add-in's task pane.

If you are not familiar with the WranglesXL add-in, now is a good time to familiarize yourself. This website has been constructed with all things Wrangles, and the [Basics & Terminology](https://wrangles.io/en/excel) page is a great place to start.

If you are not there already, you will want to navigate to the Recipes section of the add-in and find the two recipes we will be working with ("PRA Preprocess" and "Product Research Agent"). The gif below shows how to navigate to this section:

![adi_recipe_navigation.gif](/gifs/adi-how-to/adi_recipe_navigation.gif)

> **Note**: There are also Development versions that are tagged with dev. We will explain more about these below.
\{.is-info\}

## Step 1: Prep & Run Search

The first step of running PRA is to preprocess the data, and run search only. This allows users to review the preprocessed data/search results without cost, before running PRA in its entirety. This saves time, gives users an insite into the process as a whole, and allows for optimization. **It is epecially important to do some manual investigation when using site specific searches or running data that is entirely from the same manufacturer.**

### Run Preprocess Recipe

It is always a good idea to run PRA in steps to ensure that you get the best results. The PRA Preprocess recipe cleans, standardizes and formats the input data into the search queries for PRA, but it **does not run PRA**. This means that there is no cost associated with this step in the process.
  
Once you've navigated to the PRA Preprocess recipe, simply highlight your data and click the play button. You'll see a pop-up window where you will configure your search query before running the recipe (see [Variable Configuration](https://wrangles.io/en/ADI/PRA-How-To#variable-configuration) below to learn more).

![pra_preprocess.png](/adi/pra_preprocess.png)

Note that not all of the parameters for pra are included here, only the ones necessary for the search recipe.

It is important to note that this recipe (and PRA itself) require the specific columns listed below:

- Region
- PIM Brand Name
- Vendor Ordering Part Number
- Adonis

> The Adonis column simply needs to be some description of the product, not necessarily the Adonis description. This is to be used in scoring to ensure the correct product is found.
\{.is-info\}
  
The preprocessed data will appear as a new sheet named Preprocess Data.

#### Manually Check Your Queries
At this time, it is important to take some time to review the data, specifically the Query column as this is the column that contains the query to be searched. **This step is very important** as it can easily save you the time/cost of running PRA on bad search queries.

We suggest to select random queries from the preprocess results and manually search them in Google. It is a good idea to search queries that have different part code families (ie completely different products) to get a better feel for the search results as a whole.

If a site specific search is being performed, but no results are found in Google, consider switching to a different site. It can also be helpful to search that site for the item yourself to see if it exists there.

If you are not getting results with the queries that the preprocess recipe is producing, try trimming it down (ie search part code only versus part code and brand) or altering the query itself to see what you can find.

**Again, this step is especially important** because just a few minutes of manual verification can save you tons of time waiting for PRA to run and the cost associated when running on a bad set of queries. It also gives users an early insite on what to expect from the results. That is to say, if results from manual verification are poor, then you can expect poor PRA results and vice versa for good results.

### Run the Product Research Agent (Search Only)
    
Now that you've reviewed the preprocessed data and verified that everything is as it should be, you can now run the Product Research Agent recipe.

Navigate back to the original (raw) data sheet and highlight your data. Click the play button, fill in your variables on the pop up window (see Variable Configuration below), ensuring that the Variant drop down is set to "Search Only" then click the run button.

![run_search_only.gif](/adi/run_search_only.gif)

When you initially run PRA, you will see 2 new sheets, "PRA Data" and "PRA Run Log". PRA Data is simply all of the data you sent through the Product Research Agent, without any changes. The PRA Run Log is created with the first run of PRA and shows useful information about each run. See the PRA Run Log section below for more information.

> **Note**: This does not mean that the recipe has finished running, but instead that it has successfully sent the data up to the cloud to be run through the PRA.
\{.is-info\}

#### Search Results

Once the recipe has finished running in the cloud, you will receive an email with your chosen subject and a file named PRA Results.xlsx attached. Within this file, you'll find the sheets Search Results and No Results. At this point, it is a good idea to review the search results before moving on.

First, navigate to the url found in the Top Result Page column of the Search Results sheet. Questions to consider when reviewing the top url:

- **Is it the correct product?** Of course, the PRA aims to return data for the correct product, but this is not always the case. Results are scored based on whether or not the part codes and manufacturers match, but it is also helpful to verify this yourself.

- **If it is not the correct product, where could things have gone wrong?** Sometimes complex part codes will have variants that come up in the search results instead of the actual product. Part codes can sometimes be phased out, or not in use. If site specific, the site searched may not have that specific product.

- **Does the website contain useful information relevant to the product?** PRA uses web scraping to return data from the websites found through the Google search. It is important that the data is shown on that page and not in a downloadable pdf or separate web page since PRA will only be scraping that specific web page.
  
If you wish to review other results that scored lower than the top search result, you can do so by navigating to the sites found in the Sites to Scrape column.

> **Note**: The top search result is not necessarily going to be the best result after scraping, as there is additional scoring based on the contents of the webpage that will dictate the best result.
\{.is-info\}

##### Snippet, Title & Position
      
The snippet, title and position come straight from the Google search page. The image below shows where the snippet and title can be found, while position is simply the position of that particular result with the search. 

![search_example.png](/gifs/adi-how-to/search_example.png)
![snippet_title_position.png](/gifs/adi-how-to/snippet_title_position.png)

The second image above shows the corresponding columns in the Search Results file.
  
### PRA Run Log

The PRA run log gets created as a new sheet when the PRA is first run on a file. It is simply a log that keeps track of when the recipe was ran, the email subject associated with that run, as well as any file names associated with that run. The Search Only column tells the user whether the recipe was ran as the Search Only variant or not. If Search Only is set to True, then users will not receive the last two files (Page Results and Final Results). It is also important to note that data is automatically broken up into batches of 250 rows before being sent to the cloud. The log file will reflect the batch number with the number tagged at the end of each file.

![pra_run_log.png](/adi/pra_run_log.png)

## Step 2: Scrape
    
If the Search Only results all look good, then it is time to proceed with running the next step, Scrape Only.

![scrape_only.png](/adi/scrape_only.png)

The Scrape Only variant is meant to be run on the Search Results sheet and returns a file with the Page Results and No Scrape Results sheets. As before, with the No Results sheet, No Scrape Results houses all rows or items that returned search results that were not scrapeable.

### Page Results

The Page Results sheet contains all of the useful information found on the product's website. The results have been ranked/scored and the top result is now finalized.

There are 6 columns in this file that are crucial to the final recipe's data extraction:

- Product Features
- Product Specifications
- General Information
- Manufacturer & Brand
- Product IDs
- Result Product Category

This is the first place users should look when asking themselves why the final result did not have the data they had expected.

You will also find 2 helpful columns that can be used to sort or filter your results; Validation Metrics and Validation Results. **Validation Results** place results into three buckets: Validated (recieved high scores on all fields), Needs QA (results that should be verified manually), and Failed Validation (results that are likely not the same item). **Validation Metrics** show all the metrics that go into labeling the Validation Results. "PC | MFR | .7&lt;" for example means that the result had a part code match (PC), a manufacturer match (MFR) and an Overall Page Score greater than .7. Results without matches are not reported in the Validation Metrics (ie "MFR | &lt;.5" did not have a matched part code).

## Step 3: Postprocessing
The postprocessing step is where all of the attributes, features and descriptions are generated using [extract.ai](/wrangle/extract#ai). This step is meant to be run on the Page results sheet and outputs a file with General Postprocessing and Final Postprocessing sheets.

### General Postprocessing
The General Postprocessing sheet is an intermediate step between Page Results and Final Postprocessing. It works to narrow down and refine the scraped data in preperation for the final step.

### Final Postprocessing
This is where all of the attributes, features, and descriptions can be found in their final form. This step outputs many specific attributes that are not applicable to all products and therefore will look sparse in certain sections.

## Results
Results will be attached to an email that will be sent to the email address associated with the users WranglesXL account. In addition, they will also be uploaded to the WrangleWorks cloud in a user specific folder, a link to the folder can be found in the email.

# Variable Configuration
The Product Research Agent has five variables when being run: Subject, Variant, Site_Specific, Sites, PDF_Only, and File Name.

![pra_variables.png](/adi/pra_variables.png)

## Subject
This is the email subject that users will recieve when the PRA has completed. It is a good idea to give your PRA runs an intuitive subject that you will be able to distinguish from other runs in the future. The Subject passed will be tagged with the GitHub run number so that users (and the WrangleWorks team) can easily reference the log files associated with that run.

## Variant
PRA can be run in several different variations, which essentially reflects the steps discussed above. The variant dictates which step of the PRA process is run. It can be run in individual steps ("Search Only", "Scrape Only", and "Postprocess"), 2 steps at once ("Search and Scrape", and "Scrape and Postprocess"), or all three steps at once ("Full PRA").

### Search Only
This will run the preprocessing step as well as the the first step of PRA itself, the search.

With this variation, the preprocessed data will be output to a new sheet and users will recieve an email with an attached file containing the Search Results and No Results sheets. Search Results houses all of the results found, with some initial search scoring while No Results houses all the items that returned no search results.

### Scrape Only
This variation is meant to be run on the Search Results sheet of the previous step (although the results do not necessarily have to come from running the Search Only variant) and will fail if not run on this sheet (there is error handling to catch this before sending to github). Because the search has already been performed, the Site_Specific, Sites, and PDF_Only variables are irrelevant and will have no effect on the run.

Once this step of PRA has completed, users will recieve an email with a file containing the Page Results and No Scrape Results sheets. Page Results shows the final scoring and top scraped result (which is not necessarily the best search result from the prior step), while No Scrape Results houses all items where there were no scrapable search results.

### Search and Scrape
This is a combination of the first two variants, so the PRA will perform both steps. Now, users will recieve an email with a file containing the 4 previously mentioned sheets.

### Scrape and Postprocess
This step combines scraping with the final step of PRA, postprocessing. Like Scrape Only, this is also meant to be run on Search Results. This variant returns a file with the Page Results, No Scrape Results, General Postprocessing and Final Postprocessing sheets. 

### Postprocess
The postprocessing variant is where the ai extracts pull out any relevent data from the scraped results. This step is meant to be run on the Page Results sheet and returns a file with General Postprocessing and Final Postprocessing sheets.

### Full PRA
The Full PRA variant runs all of the steps mentioned above and returns a file with all 6 sheets (Search Results, No Results, Page Results, No Scrape Results, General Postprocessing, and Final Postprocessing).

## Site_Specifc
The Site_Specific (ignore the underscore) variable allows users to perform site specific searches. That is, the search returns only results from specific websites entered by the user.

**Site_Specific MUST be used in conjunction with the Sites variable**

## Sites
The Sites variable is a text box that allows users to type in the specific site or sites to scrape. It is recommended that no more than 3 websites be searched at once. 

**Sites must be used in conjunction with the Site_Specific variable.**

## PDF_Only
PDF_Only (sorry for the underscore) returns only search results that are links to pdf files. Since pdf files cannot be scraped using PRA, **PDF_Only can only be used with the Search Only Variant**.

## File Name
This allows users to set their own name for the file that is output by PRA. Like the Subject, it is a good idea to give it a unique name that is related to the data being run in some way. File Name also defaults to "PRA Results" and is tagged with the GitHub run number for bookkeeping.

# Extract AI's
PRA uses 3 different extract.ai wrangles, shown below:

- Generate Features & Description (model id 4a5856b1-510a-4399)
- Product Name Generator (model id 2cf993d4-aa3d-48d3)
- Retrieve Specific Attributes (model id 0eb9f5c5-4ad7-4994)
 
These extracts can be tested manually within excel in order to fine tune the schema in which they run on. For general information on these extracts see [here](https://wrangles.io/excel/my_wrangles/extract#ai-extract-wrangles).

When running these extracts manually it important to have Multiple Result Format set to Columns like pictured below:

![extract_settings.png](/adi/extract_settings.png)

You can find these settings in the top right of the task pane when in the Extract section of My Wrangles like shown below:

![get_to_settings.png](/adi/get_to_settings.png)

## Generate Features & Description
This extract outputs the "Features" and "Overview / Product Description" columns found in General Postprocessing. It is run on the Core Content column of the same sheet.

## Product Name Generator
This is the extract that is responsible for generating the Product Name field. It is quite complex in the way that it is run, but the recipe "Product Name Generator Test" (model id 8cac8642-237c-4b5e) takes care of the complexity for you. Simply run this recipe on the Page Results sheet and the results will be generated in a new sheet.

## Retrieve Specific Attributes
This extract is run on a combination of the output of the Product Name and Features columns (although you do not have to rerun that as the values are already in General Postprocessing). In order to replicate the input you will need to collapse the two columns to a JSON object using the stock Collapse to JSON wrangle found in the Format section of Stock Wrangles. Once you have that output, the extract can be run on it. See the gif below for a demonstration of how to perform these steps.

![retrieve_specific_attributes.gif](/adi/retrieve_specific_attributes.gif)

**Fair warning** this particular extract pull out a lot of attributes and will therefore add a lot of columns to your sheet when run. These attributes are also very specific, and the output will be sparse. N/A is the default for anything the ai cannot find, this is purposeful and removed in the recipe.

# Recent Updates (3/13/25)
## Cloud Storage
Along with the output file being emailed to the user's email account, they will also be uploaded to a user specific folder on the WrangleWorks cloud. A link to the folder will be included in the email, but new users will need to be granted access.

## Queue
PRA runs are now setup to run in a queue, with a maximum of 2 runs at a time. This may increase run time, but will allow it to be more robust and resistant to failure.

## File Name Variable
All PRA recipes (production and dev) now give users the ability to name the output file in the "File Name" variable. This is a text box that will appear at the bottom of the run pop-up. It is highly recommended that users give their file a name that is suitable for the specific batch they are running versus a generic name. The output file will be saved as the file name with the github run number attached. For example, if the file name were "Dahua Cameras" and the github run number were 123, then the output file will be named "Dahua Cameras-123.xlsx".

## Local Search
There is now a recipe calle "Search" that is tagged with "ADI" and "PRA". This can (and should for time sake) be used to perform the PRA search locally. Running the search locally is not only quicker than running through github, but it also allows users to quickly verify results.

With the local search implemented, search variants have now been removed from the dev version of the recipe.

### Verifying Results
When verifying the results of the local search recipe, users to not have to spend a lot of time combing through the search results. The results are already divided into two sheets ("Search Results", and "No Results"), which does a lot of the verification for you. If all or most of your results end up in the No Results sheet, then it is likely a bad site specific search or invalid part codes. There is also the "# of Sites to Scrape" column in the Search Results sheet. With this, users can quickly scroll through and ensure that all items have some amount of sites to scrape.

**Verifying results locally, before running PRA, is encouraged** because it prevents users from performing bad searches (ie site specific for a site that does not list products), then having to wait for PRA to finish running.

# Checking For Progress in Github
## Overview
This tutorial walks you through how to check Github for progress on a job.  Specifically, we’re looking at PRA, Product Research Agent.


## Run PRA
Select the appropriate data, Run the PRA recipe, and choose your options:
![run_pra.png](/adi/run_pra.png)

Open GitHub

Open the ADI repo (repository)
Select the Actions tab
Look for the most recent workflow, at the top of the list, called “Run Product Research”
The indicator in the margin just before the workflow will give you the status
- **Yellow**:  Still running
- **Green with check mark**:  Complete
- **Red with X**: Contains errors
- **Exclamation point**: Job was interrupted or canceled
![open_actions.png](/adi/open_actions.png)
![open_run.png](/adi/open_run.png)

## Checking progress on a large file / long run:
If the circle is yellow, indicating that the job is still running, you can click on the Matrix: recipe folder and see how many of the batches have been processed.

In this case, I ran 210 rows.  The job breaks them into batches of 50 rows each, resulting in 5 separate jobs.  The status shows Queued, indicating the jobs haven’t yet started to run.
![check_progress.png](/adi/check_progress.png)

A few minutes later, 3 of the 5 jobs are done:
![check_progress2.png](/adi/check_progress2.png)

## Job has completed - email sent

### Successful run:
![check_email.png](/adi/check_email.png)

### Failed run:
![pra_failed.png](/adi/pra_failed.png)

## Failed run - understanding the error
![check_error.png](/adi/check_error.png)

Click on the failed job name to open it up
Expand the step called, Process Batch/Run Recipe
![open_logs.png](/adi/open_logs.png)


At the very bottom will be an error message.  Not always helpful, but in this case, I can see my error (I had changed the column name).
![read_error.png](/adi/read_error.png)