---
title: "Concurrent"
slug: /python/connectors/concurrent
---

By default, all functions executed by a recipe happen sequentially. The concurrent connector allows functions to be executed in parallel.


Click [here](https://wrangles.io/python/recipes/wrangles/utilities#concurrent) to learn about the concurrent wrangle.

# Tabset \{.tabset\}
## Read
### Recipe
```yaml
read:
  - union:
  	  sources:
      	- concurrent:
        		read:
            	- file:
              		name: file1.xlsx
              - file:
                  name: file2.xlsx
              - file:
                  name: file3.csv
```


### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| read | ✓ | list | List of read connectors to run concurrently. |
| max_concurrency | | str | The maximum number to execute in parallel. If there are more than this, the rest will be queued. |
| use_multiprocessing | | str | Use multiprocessing instead of threading. Default is False. |
| functions | | str | Custom functions to make available downstream. |
| variables | | int | Variables to make available downstream. |
</div>

## Write
### Recipe
```yaml
write:
  - concurrent:
      write:
      	- file:
        		name: file1.xlsx
            columns:
            	- col1
              - col2
        - file:
        		name: file2.xlsx
            columns:
            	- col3
              - col4
```


### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Dataframe to write. |
| write | ✓ | list | List of write connectors to run concurrently. |
| max_concurrency | | int | The maximum number to execute in parallel. If there are more than this, the rest will be queued. |
| variables | | str | Variables to pass to any downstream recipes. |
| functions | | str | Custom functions to pass to any downstream recipes. |
| use_multiprocessing | | str | Use multiprocessing instead of threading. Default is False. |
</div>

## Run

Run multiple actions concurrently.

### Recipe
```yaml
run:
  on_start:
    - concurrent:
    		run:
        	- custom.my_function:
          		category: Hand Tools
        	- custom.my_function:
          		category: Power Tools
        	- custom.my_function:
          		category: Hardware
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| run | ✓ | list | List of actions to run concurrently. |
| max_concurrency | | str | The maximum number to execute in parallel. If there are more than this, the rest will be queued. |
| variables | | str | Variables to pass to any downstream recipes. |
| functions | | str | Custom functions to pass to any downstream recipes. |
| use_multiprocessing | | int | Use multiprocessing instead of threading. Default is False. |
</div>