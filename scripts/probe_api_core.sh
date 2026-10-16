#!/usr/bin/env bash

# Diagnose access to API-Core from a developer computer connected to the VPN.
#
# Basic usage:
#   ./scripts/probe_api_core.sh
#
# Optional authenticated usage:
#   export API_CORE_TOKEN='short-lived-access-token'
#   ./scripts/probe_api_core.sh
#   unset API_CORE_TOKEN
#
# If API-Core uses an API key instead of a bearer token:
#   export API_CORE_API_KEY='api-key'
#   ./scripts/probe_api_core.sh
#   unset API_CORE_API_KEY
#
# Overrides:
#   API_CORE_URL=https://internal-api.wrangle.works
#   API_CORE_CATALOG_PATH=/catalog
#   API_CORE_CONNECT_TIMEOUT=10
#   API_CORE_MAX_TIME=30
#   API_CORE_PROBE_OUTPUT_DIR=/path/to/output

base_url="${API_CORE_URL:-https://internal-api.wrangle.works}"
catalog_path="${API_CORE_CATALOG_PATH:-/catalog}"
connect_timeout="${API_CORE_CONNECT_TIMEOUT:-10}"
max_time="${API_CORE_MAX_TIME:-30}"

base_url="${base_url%/}"
case "$catalog_path" in
  /*) ;;
  *) catalog_path="/$catalog_path" ;;
esac

case "$base_url" in
  http://*|https://*) ;;
  *)
    printf 'ERROR: API_CORE_URL must begin with http:// or https://\n' >&2
    exit 2
    ;;
esac

if [ -n "${API_CORE_TOKEN:-}" ] && [ -n "${API_CORE_API_KEY:-}" ]; then
  printf 'ERROR: Set API_CORE_TOKEN or API_CORE_API_KEY, not both.\n' >&2
  exit 2
fi

url_without_scheme="${base_url#*://}"
host_and_port="${url_without_scheme%%/*}"
host="${host_and_port%%:*}"

timestamp="$(date -u '+%Y%m%dT%H%M%SZ')"
output_dir="${API_CORE_PROBE_OUTPUT_DIR:-api-core-probe-${timestamp}-$$}"
umask 077
mkdir -p "$output_dir"

printf 'API-Core connectivity probe\n'
printf 'Base URL:     %s\n' "$base_url"
printf 'Catalog URL:  %s%s\n' "$base_url" "$catalog_path"
printf 'Output:       %s\n' "$output_dir"
printf 'Authentication supplied: '
if [ -n "${API_CORE_TOKEN:-}" ]; then
  printf 'Bearer token (value hidden)\n'
elif [ -n "${API_CORE_API_KEY:-}" ]; then
  printf 'API key (value hidden)\n'
else
  printf 'No\n'
fi

printf '\nDNS resolution for %s:\n' "$host"
if command -v dig >/dev/null 2>&1; then
  dig +short "$host" | tee "$output_dir/dns.txt"
elif command -v dscacheutil >/dev/null 2>&1; then
  dscacheutil -q host -a name "$host" | tee "$output_dir/dns.txt"
elif command -v nslookup >/dev/null 2>&1; then
  nslookup "$host" | tee "$output_dir/dns.txt"
else
  printf 'No dig, dscacheutil, or nslookup command is available.\n' | tee "$output_dir/dns.txt"
fi

summarize_json() {
  body_file="$1"

  if ! command -v python3 >/dev/null 2>&1; then
    return
  fi

  python3 - "$body_file" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
try:
    payload = json.loads(path.read_text(encoding="utf-8"))
except Exception:
    raise SystemExit(0)

if isinstance(payload, dict):
    print("JSON top-level keys:", ", ".join(sorted(payload)))
    catalog = payload.get("catalog")
    if isinstance(catalog, list):
        print("Catalog row count:", len(catalog))
        if catalog and isinstance(catalog[0], dict):
            print("Catalog fields:", ", ".join(sorted(catalog[0])))
            safe_sample_fields = (
                "catalog_id",
                "catalog_key",
                "catalog_kind",
                "wranglesPY_key",
                "status",
            )
            sample = {
                key: catalog[0].get(key)
                for key in safe_sample_fields
                if key in catalog[0]
            }
            print("First catalog row sample:", json.dumps(sample, sort_keys=True))
elif isinstance(payload, list):
    print("JSON top-level list length:", len(payload))
PY
}

probe() {
  label="$1"
  url="$2"
  auth_mode="$3"
  headers_file="$output_dir/${label}.headers.txt"
  body_file="$output_dir/${label}.body.txt"

  printf '\n=== %s ===\n' "$label"
  printf 'GET %s\n' "$url"

  if [ "$auth_mode" = bearer ]; then
    http_code="$(curl --silent --show-error --location \
      --connect-timeout "$connect_timeout" --max-time "$max_time" \
      --header "Authorization: Bearer ${API_CORE_TOKEN}" \
      --dump-header "$headers_file" --output "$body_file" \
      --write-out '%{http_code}' "$url")"
    curl_status=$?
  elif [ "$auth_mode" = api_key ]; then
    http_code="$(curl --silent --show-error --location \
      --connect-timeout "$connect_timeout" --max-time "$max_time" \
      --header "x-api-key: ${API_CORE_API_KEY}" \
      --dump-header "$headers_file" --output "$body_file" \
      --write-out '%{http_code}' "$url")"
    curl_status=$?
  else
    http_code="$(curl --silent --show-error --location \
      --connect-timeout "$connect_timeout" --max-time "$max_time" \
      --dump-header "$headers_file" --output "$body_file" \
      --write-out '%{http_code}' "$url")"
    curl_status=$?
  fi

  printf 'curl exit status: %s\n' "$curl_status"
  printf 'HTTP status:      %s\n' "${http_code:-unknown}"

  if [ -s "$headers_file" ]; then
    printf 'Relevant response headers:\n'
    grep -Ei '^(HTTP/|content-type:|location:|server:|www-authenticate:|x-amzn-|x-request-id:|date:)' \
      "$headers_file" || true
  fi

  if [ -s "$body_file" ]; then
    printf 'Response size: %s bytes\n' "$(wc -c < "$body_file" | tr -d ' ')"
    summarize_json "$body_file"
    printf 'Body preview:\n'
    head -c 2000 "$body_file"
    printf '\n'
  else
    printf 'No response body received.\n'
  fi
}

probe root-unauthenticated "$base_url/" none
probe catalog-unauthenticated "$base_url$catalog_path" none

if [ -n "${API_CORE_TOKEN:-}" ]; then
  probe catalog-authenticated "$base_url$catalog_path" bearer
elif [ -n "${API_CORE_API_KEY:-}" ]; then
  probe catalog-authenticated "$base_url$catalog_path" api_key
fi

printf '\nInterpretation:\n'
printf '  HTTP 200       Endpoint and supplied authentication work.\n'
printf '  HTTP 401/403   Endpoint is reachable; authentication is missing or rejected.\n'
printf '  HTTP 404       Host is reachable, but the route/base path is wrong or undeployed.\n'
printf '  HTTP 000       Usually a VPN, DNS, firewall, TLS, or network-routing problem.\n'
printf '  curl status 28 Connection timed out. Confirm the VPN and VPC routes.\n'
printf '\nShare the terminal output and response headers; do not share your token or API key.\n'
printf 'Full response artifacts are in: %s\n' "$output_dir"
