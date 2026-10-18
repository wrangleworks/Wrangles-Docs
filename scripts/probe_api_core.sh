#!/usr/bin/env bash

# Diagnose access to API-Core from a developer computer connected to the VPN.
# GET only root/catalog aliases; OPTIONS for the previously observed API routes.
# This is a known-route inventory, not automatic discovery of all server routes.
# Redirects are deliberately not followed (especially with API credentials).
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
mkdir -p "$output_dir" || exit 1
printf 'STATUS\tMETHOD\tPATH\tAUTH\tCURL_EXIT\tALLOW\n' > "$output_dir/summary.tsv"

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
  local label="$1" url="$2" auth_mode="$3" method="${4:-GET}"
  local headers_file="$output_dir/${label}.headers.txt"
  local body_file="$output_dir/${label}.body.txt"
  local http_code curl_status allow

  printf '\n=== %s ===\n' "$label"
  printf '%s %s\n' "$method" "$url"

  if [ "$auth_mode" = bearer ]; then
    http_code="$(curl --silent --show-error --request "$method" \
      --connect-timeout "$connect_timeout" --max-time "$max_time" \
      --header "Authorization: Bearer ${API_CORE_TOKEN}" \
      --dump-header "$headers_file" --output "$body_file" \
      --write-out '%{http_code}' "$url")"
    curl_status=$?
  elif [ "$auth_mode" = api_key ]; then
    http_code="$(curl --silent --show-error --request "$method" \
      --connect-timeout "$connect_timeout" --max-time "$max_time" \
      --header "x-api-key: ${API_CORE_API_KEY}" \
      --dump-header "$headers_file" --output "$body_file" \
      --write-out '%{http_code}' "$url")"
    curl_status=$?
  else
    http_code="$(curl --silent --show-error --request "$method" \
      --connect-timeout "$connect_timeout" --max-time "$max_time" \
      --dump-header "$headers_file" --output "$body_file" \
      --write-out '%{http_code}' "$url")"
    curl_status=$?
  fi

  printf 'curl exit status: %s\n' "$curl_status"
  printf 'HTTP status:      %s\n' "${http_code:-unknown}"
  allow="$(awk 'tolower($0) ~ /^allow:/ {sub(/^[^:]*:[ ]*/, ""); gsub(/\r/, ""); print}' "$headers_file" 2>/dev/null)"
  printf '%s\t%s\t%s\t%s\t%s\t%s\n' "${http_code:-000}" "$method" \
    "${url#"$base_url"}" "$auth_mode" "$curl_status" "${allow:--}" >> "$output_dir/summary.tsv"

  if [ -s "$headers_file" ]; then
    printf 'Relevant response headers:\n'
    grep -Ei '^(HTTP/|allow:|content-type:|location:|server:|www-authenticate:|x-amzn-|x-request-id:|date:)' \
      "$headers_file" || true
  fi

  if [ "$method" = OPTIONS ]; then
    printf 'OPTIONS checks route visibility only; it does not prove GET works.\n'
  elif [ -s "$body_file" ]; then
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
auth_mode=none
if [ -n "${API_CORE_TOKEN:-}" ]; then
  auth_mode=bearer
elif [ -n "${API_CORE_API_KEY:-}" ]; then
  auth_mode=api_key
fi

catalog_paths=("$catalog_path")
for route in /catalog /data/catalog /wrangles/catalog; do
  if [ "$route" != "$catalog_path" ]; then
    catalog_paths+=("$route")
  fi
done
index=0
for route in "${catalog_paths[@]}"; do
  index=$((index + 1))
  probe "catalog-${index}-unauthenticated" "$base_url$route" none
  if [ "$auth_mode" != none ]; then
    probe "catalog-${index}-authenticated" "$base_url$route" "$auth_mode"
  fi
  probe "catalog-${index}-options" "$base_url$route" "$auth_mode" OPTIONS
done

# Previously observed routes. Do not GET model/secret/train/delete endpoints:
# use OPTIONS only, without a request body or any modifying HTTP methods.
routes=(
  /data/health /data/live /data/model /data/model/status
  /data/user/model/train /data/user/models /heartbeat /metrics/hardware
  /model/access /model/claim /model/content /model/content/versions
  /model/content/versions/notes /model/content/versions/tags /model/delete
  /model/metadata /model/metadata/settings /model/metadata/variant
  /model/preferences /model/status /organization /organization/children
  /organization/children/move /organization/member /organization/members
  /organization/summary /recipe/start /s3/file /s3/file/complete /s3/file/start
  /s3/files /sort/test /user/model/train /user/models /user/role /user/secret
  /user/secret/keys /user/secret/values /user/secrets /webhook
)
for route in "${routes[@]}"; do
  index=$((index + 1))
  probe "route-${index}-options" "$base_url$route" "$auth_mode" OPTIONS
done

printf '\nEndpoint summary:\n'
if command -v column >/dev/null 2>&1; then
  column -t -s $'\t' "$output_dir/summary.tsv"
else
  cat "$output_dir/summary.tsv"
fi
printf '\nInterpretation:\n'
printf '  GET 200        Inspect JSON/content type to confirm the expected response.\n'
printf '  OPTIONS 2xx    OPTIONS is handled; not proof that GET/authentication works.\n'
printf '  HTTP 3xx       Redirect returned, deliberately not followed.\n'
printf '  HTTP 401/403   Server or gateway rejected access; route existence is not certain.\n'
printf '  HTTP 404       Not found at this URL; route may be absent, hidden, or misrouted.\n'
printf '  HTTP 405       Method not allowed; inspect Allow header.\n'
printf '  HTTP 000       Usually a VPN, DNS, firewall, TLS, or network-routing problem.\n'
printf '  curl status 28 Connection timed out. Confirm the VPN and VPC routes.\n'
printf '\nShare summary.tsv first. Review headers/bodies for sensitive data before sharing.\n'
printf 'Full response artifacts are in: %s\n' "$output_dir"
