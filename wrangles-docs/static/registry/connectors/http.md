---
schema_version: '0.2'
type: connector
catalog_id: '115'
catalog_key: connector.http
catalog_kind: connector
runtime_key: http
status: active
title: HTTP
source:
  repository: https://github.com/wrangleworks/WranglesPY
  revision: bd5f88fba479ec406b409cb2880689c54e72b298
  version: 1.20.5
  extraction: static-python-ast
operations:
  read:
    type: object
    description: Get data from a HTTP(S) endpoint.
    required:
      - url
    properties:
      url:
        type: string
        description: The URL to make the request to
      method:
        type: string
        description: The http method to use. Default GET.
        enum:
          - GET
          - POST
          - PUT
          - PATCH
          - DELETE
          - HEAD
          - OPTIONS
      headers:
        type: object
        description: Headers to pass as part of the request
      params:
        type: object
        description: Pass URL encoded parameters
      json:
        type: object
        description: Pass data as a JSON encoded request body.
      json_key:
        type: string
        description: >-
          Select sub-elements from the response JSON. Multiple levels can be specified with e.g.
          key1.key2.key3
      orient:
        type: string
        description: The format of the JSON to be converted to a dataframe. Default records.
        enum:
          - records
          - columns
          - tight
      oauth:
        type: object
        required:
          - url
        description: Make a request to get an OAuth token prior to sending the main request
        properties:
          url:
            type: string
            description: The URL to make the request to
          method:
            type: string
            description: The http method to use. Default POST.
            enum:
              - GET
              - POST
              - PUT
              - PATCH
              - DELETE
              - HEAD
              - OPTIONS
          headers:
            type: object
            description: Headers to pass as part of the request
          params:
            type: object
            description: Pass URL encoded parameters
          json:
            type: object
            description: Pass data as a JSON encoded request body.
  run:
    type: object
    description: Issue a HTTP(S) request e.g. issue a request to a webhook on success or failure.
    required:
      - url
    properties:
      url:
        type: string
        description: The URL to make the request to
      method:
        type: string
        description: The http method to use. Default GET.
        enum:
          - GET
          - POST
          - PUT
          - PATCH
          - DELETE
          - HEAD
          - OPTIONS
      headers:
        type: object
        description: Headers to pass as part of the request
      params:
        type: object
        description: Pass URL encoded parameters
      json:
        type: object
        description: Pass data as a JSON encoded request body.
      oauth:
        type: object
        required:
          - url
        description: Make a request to get an OAuth token prior to sending the main request
        properties:
          url:
            type: string
            description: The URL to make the request to
          method:
            type: string
            description: The http method to use. Default POST.
            enum:
              - GET
              - POST
              - PUT
              - PATCH
              - DELETE
              - HEAD
              - OPTIONS
          headers:
            type: object
            description: Headers to pass as part of the request
          params:
            type: object
            description: Pass URL encoded parameters
          json:
            type: object
            description: Pass data as a JSON encoded request body.
  write:
    type: object
    description: Write data to a HTTP endpoint.
    required:
      - url
    properties:
      url:
        type: string
        description: The URL to make the request to
      method:
        type: string
        description: The http method to use. Default POST.
        enum:
          - GET
          - POST
          - PUT
          - PATCH
          - DELETE
          - HEAD
          - OPTIONS
      headers:
        type: object
        description: Headers to pass as part of the request
      params:
        type: object
        description: Pass URL encoded parameters
      orient:
        type: string
        description: >-
          The format of the JSON to send. Default records.

          For allowed values see:

          https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_json.html#pandas.DataFrame.to_json
        enum:
          - records
          - split
          - index
          - columns
          - values
          - table
      batch:
        type:
          - boolean
          - integer
        description: >-
          If True, send the entire DataFrame as a single request. If False, send each row as a
          separate request. If an integer, send the DataFrame in batches of that size. default: True
      oauth:
        type: object
        required:
          - url
        description: Make a request to get an OAuth token prior to sending the main request
        properties:
          url:
            type: string
            description: The URL to make the request to
          method:
            type: string
            description: The http method to use. Default POST.
            enum:
              - GET
              - POST
              - PUT
              - PATCH
              - DELETE
              - HEAD
              - OPTIONS
          headers:
            type: object
            description: Headers to pass as part of the request
          params:
            type: object
            description: Pass URL encoded parameters
          json:
            type: object
            description: Pass data as a JSON encoded request body.
description: Get data from a HTTP(S) endpoint.
slug: connectors/http
visibility: public
sources:
  - id: runtime
    resource: https://github.com/wrangleworks/WranglesPY/tree/bd5f88fba479ec406b409cb2880689c54e72b298
    title: Pinned WranglesPY connector schema
  - id: existing-docs
    resource: wrangles-docs/registry-docs/python/connectors/http.md
    title: Existing connector documentation
---

# HTTP

The http connector allows users to issue http(s) requests.

### Read
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

### Write
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
