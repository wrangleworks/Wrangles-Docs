#!/usr/bin/env python3
"""Export the full API-Core catalog while connected to the company VPN.

Run from any directory:
    python3 /path/to/scripts/export_api_core_catalog.py

Writes api-core.json in the current directory (or pass --output PATH).
Uses only Python's standard library. No package installation required.
Optional environment variables: API_CORE_URL, API_CORE_TOKEN, API_CORE_API_KEY.
The exported JSON preserves the API response, including all catalog fields.
"""

import argparse
from collections import Counter
import json
import os
from pathlib import Path
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--url",
        default=os.environ.get("API_CORE_URL", "https://internal-api.wrangle.works"),
        help="API-Core base URL",
    )
    parser.add_argument("--output", default="api-core.json")
    args = parser.parse_args()
    url = args.url.rstrip("/") + "/catalog"
    token = os.environ.get("API_CORE_TOKEN")
    api_key = os.environ.get("API_CORE_API_KEY")
    if token and api_key:
        parser.error("Set API_CORE_TOKEN or API_CORE_API_KEY, not both.")

    headers = {"Accept": "application/json"}
    if token:
        headers["Authorization"] = "Bearer " + token
    elif api_key:
        headers["x-api-key"] = api_key

    print("Fetching " + url, flush=True)
    try:
        with urlopen(Request(url, headers=headers), timeout=60) as response:
            payload = json.load(response)
        if not isinstance(payload, dict) or not isinstance(payload.get("catalog"), list):
            raise ValueError("Expected a JSON object containing a 'catalog' array.")
        rows = payload["catalog"]
        if not rows:
            raise ValueError("The catalog is empty; no file was written.")
        for index, row in enumerate(rows):
            if not isinstance(row, dict) or not all(
                field in row for field in ("catalog_id", "catalog_key", "catalog_kind")
            ):
                raise ValueError("Catalog row %s is missing identity fields." % index)
        output = Path(args.output).expanduser().resolve()
        # Exclusive creation avoids overwriting the Registry's differently shaped snapshot.
        with output.open("x", encoding="utf-8") as destination:
            json.dump(payload, destination, indent=2, ensure_ascii=False)
            destination.write("\n")
    except HTTPError as exc:
        print("ERROR: HTTP %s. Check the endpoint and authentication." % exc.code, file=sys.stderr)
        return 1
    except (URLError, TimeoutError) as exc:
        print("ERROR: Cannot reach API-Core. Check your VPN. %s" % exc, file=sys.stderr)
        return 1
    except FileExistsError:
        print("ERROR: Output already exists. Choose another filename with --output.", file=sys.stderr)
        return 1
    except (OSError, ValueError) as exc:
        print("ERROR: %s" % exc, file=sys.stderr)
        return 1

    print("Saved %s catalog rows to %s" % (len(rows), output))
    for kind, count in sorted(Counter(str(row["catalog_kind"]) for row in rows).items()):
        print("  %s: %s" % (kind, count))
    print("Copy the complete contents of that JSON file and send them here.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
