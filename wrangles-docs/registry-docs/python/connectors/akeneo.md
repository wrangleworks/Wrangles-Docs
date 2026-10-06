---
title: "Akeneo"
slug: /python/connectors/akeneo
---

> Added **v0.6**
\{.is-info\}

The Akeneo connector supports write to a PIM product list



# Tabset \{.tabset\}

## Write
### Recipe
```yaml
write:
  - akeneo:
      user: user
      password: password
      host: host_url
      client_id: client_id
      client_secret: client_secret
      locale: product_locale
      scope: product_scope
      
      # Optional
      columns:
        - column1
        - column2
```

### Function
```python
from wrangles.connectors import akeneo
akeneo.write(
      df,
      user='user'
      password='password'
      host: 'host_url'
      client_id: 'client_id'
      client_secret: 'client_secret'
      locale: 'product_locale'
      scope: 'product_scope'
)
```

### Parameters
<div className="table-scroll">

| Parameter | Required | Data Type | Notes |
| :-------- | :------: | :-------- | :---- |
| df | ✓ | DataFrame | Function only. DataFrame of contents to write to the database. Columns must match the target schema. By default, if the target collection doesn't exist, it will be created. DataFrame orient is set to 'records'. |
| user | ✓ | str | User with access to the database |
| password | ✓ | str | Password of user |
| host | ✓ | str | PIM host url |
| client id | ✓ | str | Client ID provided in *Connect* in Akeneo's Product UI |
| client secret | ✓ | str | Client ID privided in *Connect* in Akeneo's Product UI |
| locale |  | str | Product locale |
| scope | | str | Product scope |
| columns | | str | Columns to include in Write function |
</div>