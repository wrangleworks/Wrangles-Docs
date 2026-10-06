---
title: "Http"
slug: /python/connectors/http
---

The http connector allows users to issue http(s) requests.

# Tabset \{.tabset\}
## Read
Get data from a HTTP(S) endpoint.

### Recipe
```yaml
read:
  - http:
      url: https://data.example.com
      method: GET
```

### Function
```python
from wrangles.connectors import http
df = http.read(
    url='https://data.example.com',
    method='GET'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| url | ✓ | str | The URL to make the request to |
| method | | str | The http method to use (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS). Default GET.  |
| headers | | obj | Headers to pass as part of the request |
| params | | obj | Pass URL encoded parameters |
| json | | obj | Pass data as a JSON encoded request body |
| json_key | | str | Select sub-elements from the response JSON. Multiple levels can be specified with e.g. key1.key2.key3 |
| columns | | list | Subset of columns to be returned |
| oauth | | obj | Make a request to get an OAuth token prior to sending the main request. |
| orient | | str | The format of the JSON to be converted to a dataframe. Default records. |
| order_by | | str | Uses SQL syntax to sort the input. |
| if | | str | A condition that will determine whether the action runs or not as a whole. |

## Write
Write data to a HTTP(S) endpoint.

### Recipe
```yaml
read:
  - http:
      url: https://data.example.com
      method: POST
```

### Function
```python
from wrangles.connectors import http
df = http.read(
    url='https://data.example.com',
    method='POST'
)
```

### Parameters

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| url | ✓ | str | The URL to make the request to |
| method | | str | The http method to use (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS). Default POST.  |
| headers | | obj | Headers to pass as part of the request |
| orient | | str | The format of the JSON to send. Default records. |
| batch | | bool | If True, send the entire DataFrame as a single request. If False, send each row as a separate request. If an integer, send the DataFrame in batches of that size. |
| oauth | | obj | Make a request to get an OAuth token prior to sending the main request |
| if | | str | A condition that will determine whether the action runs or not as a whole. |