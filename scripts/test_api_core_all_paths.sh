#!/usr/bin/env bash

# Check every unique endpoint path found in the API-Core repository.
#
# Run this from a Mac connected to the WrangleWorks VPN. From the repository
# root, run: bash scripts/test_api_core_all_paths.sh
#
# The probe uses HTTP OPTIONS for every path. It does not execute the route's
# GET, POST, PUT, PATCH, or DELETE handler, so it will not modify API data.

base_url="${API_CORE_URL:-https://internal-api.wrangle.works}"
connect_timeout="${API_CORE_CONNECT_TIMEOUT:-10}"
max_time="${API_CORE_MAX_TIME:-30}"

routes='GET|/
GET|/catalog
GET|/data/catalog
GET|/data/health
GET|/data/live
GET,PATCH,PUT|/data/model
PUT|/data/model/status
POST|/data/user/model/train
GET|/data/user/models
GET|/heartbeat
POST|/metrics/hardware
DELETE,GET,POST,PUT|/model/access
GET|/model/claim
GET,POST,PUT|/model/content
DELETE,GET|/model/content/versions
PUT|/model/content/versions/notes
PUT|/model/content/versions/tags
DELETE|/model/delete
GET,PATCH,PUT|/model/metadata
PUT|/model/metadata/settings
PUT|/model/metadata/variant
PATCH|/model/preferences
PUT|/model/status
DELETE,GET,POST|/organization
GET,PATCH,PUT|/organization/children
POST|/organization/children/move
PUT|/organization/member
DELETE,GET,POST|/organization/members
GET|/organization/summary
POST|/recipe/start
DELETE,GET,PUT|/s3/file
PUT|/s3/file/complete
PUT|/s3/file/start
GET|/s3/files
GET|/sort/test
GET,POST,PUT|/user/model/train
GET|/user/models
PUT|/user/role
DELETE,GET,PUT|/user/secret
GET|/user/secret/keys
GET|/user/secret/values
GET|/user/secrets
POST|/webhook
GET|/wrangles/catalog'

printf 'API-Core endpoint visibility probe\n'
printf 'Base URL: %s\n' "$base_url"
printf 'Using safe OPTIONS requests; route handlers will not be executed.\n\n'
printf '%-7s %-37s %-19s %s\n' 'STATUS' 'PATH' 'SOURCE METHODS' 'ALLOW'
printf '%-7s %-37s %-19s %s\n' '------' '----' '--------------' '-----'

visible=0
missing=0
errors=0

while IFS='|' read -r source_methods path; do
  headers="$(curl --silent --show-error \
    --request OPTIONS \
    --connect-timeout "$connect_timeout" \
    --max-time "$max_time" \
    --dump-header - \
    --output /dev/null \
    "${base_url%/}${path}")"
  curl_status=$?

  if [ "$curl_status" -ne 0 ]; then
    printf '%-7s %-37s %-19s %s\n' 'ERROR' "$path" "$source_methods" "curl=$curl_status"
    errors=$((errors + 1))
    continue
  fi

  status="$(printf '%s\n' "$headers" | awk '/^HTTP\// {code=$2} END {print code}')"
  allow="$(printf '%s\n' "$headers" | awk '
    tolower($0) ~ /^allow:/ {
      sub(/^[^:]*:[[:space:]]*/, "")
      gsub(/\r/, "")
      value=$0
    }
    END {print value}
  ')"

  case "$status" in
    404)
      missing=$((missing + 1))
      ;;
    *)
      visible=$((visible + 1))
      ;;
  esac

  printf '%-7s %-37s %-19s %s\n' "${status:-UNKNOWN}" "$path" "$source_methods" "${allow:--}"
done <<EOF
$routes
EOF

printf '\nSummary: %s visible, %s missing, %s connection errors\n' "$visible" "$missing" "$errors"
printf '\nInterpretation:\n'
printf '  200/204/308/401/403/405 = the server recognizes the path.\n'
printf '  404                     = the deployed server does not have the path.\n'
printf '  ERROR                   = DNS, VPN, TLS, or network failure.\n'
