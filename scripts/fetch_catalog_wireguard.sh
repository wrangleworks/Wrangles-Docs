#!/usr/bin/env bash
# CI-only helper. The supplied config is used unchanged, including full tunnel.
set -euo pipefail

if [[ "${GITHUB_ACTIONS:-}" != true || -z "${RUNNER_TEMP:-}" ]]; then
  echo 'Run this helper only on an ephemeral GitHub Actions runner.' >&2
  exit 1
fi
if [[ -z "${WIREGUARD_CONFIG:-}" ]]; then
  echo 'Missing WIREGUARD_CONFIG Actions environment secret.' >&2
  exit 1
fi

cleanup() {
  sudo wg-quick down wg-catalog >/dev/null 2>&1 || true
  sudo rm -f /etc/wireguard/wg-catalog.conf
  rm -f "$RUNNER_TEMP/catalog-vpn.log"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

umask 077
sudo install -d -m 700 /etc/wireguard
# Never use shell tracing or print wg-quick logs: config hooks may contain secrets.
printf '%s\n' "$WIREGUARD_CONFIG" | sudo tee /etc/wireguard/wg-catalog.conf >/dev/null
sudo chmod 600 /etc/wireguard/wg-catalog.conf
unset WIREGUARD_CONFIG
if ! sudo timeout 45 wg-quick up wg-catalog >"$RUNNER_TEMP/catalog-vpn.log" 2>&1; then
  echo 'WireGuard setup failed. Check Linux compatibility, DNS and config in the protected environment.' >&2
  exit 1
fi

# Trigger traffic and wait for a real TLS/HTTP response, not just interface creation.
reachable=false
for attempt in {1..6}; do
  if curl --silent --output /dev/null --connect-timeout 5 --max-time 10 \
      "${API_CORE_URL}/catalog" 2>/dev/null; then
    reachable=true
    break
  fi
  sleep 2
done
if [[ "$reachable" != true ]]; then
  echo 'API-Core is unreachable over VPN. Check peer, routes, DNS and firewall.' >&2
  exit 1
fi

python3 scripts/export_api_core_catalog.py --output "$RUNNER_TEMP/api-core-live.json"
# EXIT trap restores networking before subsequent GitHub Actions steps.
