#!/usr/bin/env bash

# Run this from a Mac terminal while connected to the WrangleWorks VPN.
# It checks the likely API-Core catalog paths and prints their HTTP status.
# From the repository root, run: bash scripts/test_api_core_paths.sh

base_url="${API_CORE_URL:-https://internal-api.wrangle.works}"

for path in \
  catalog/ \
  data/catalog \
  wrangles/catalog \
  api/catalog \
  api/catalog/ \
  v1/catalog \
  api/v1/catalog \
  api-core/catalog
do
  code="$(curl --silent --show-error \
    --connect-timeout 10 \
    --max-time 30 \
    --output /dev/null \
    --write-out '%{http_code}' \
    "${base_url%/}/$path")"
  printf '/%s -> %s\n' "$path" "$code"
done
