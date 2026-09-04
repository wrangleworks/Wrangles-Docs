---
title: "Prerequisites"
slug: /python/prerequisites
---

# Install Python

Python 3.9-13 are currently supported and tested. Older versions of Python 3 may work but are not tested. Python 2 is not supported.

Wrangles are currently tested on Windows (Server 2022), Linux (ubuntu 24.04) and MacOS (macOS 13).

https://www.python.org/downloads/

During installation check *Add Python to PATH*.

![python-install.png](/images/python-install.png)

## MacOS M-Chips

For ARM based systems using MacOS, Python 3.11-3.13 are supported and tested. It is necessary to install freetds prior to installing wrangles.

```
brew install freetds
```

# Code Editor

Other editors will also work, but we recommend VSCode.

1. Install VSCode: https://code.visualstudio.com/
2. Once Installed, install the Python Extension.

![install-python-extension.png](/images/install-python-extension.png)

3. To enable recipe validation and code suggestions follow [these instructions](/python/recipes/schema)

> Ready to go? [Install the Wrangles package](/python/install)
\{.is-success\}