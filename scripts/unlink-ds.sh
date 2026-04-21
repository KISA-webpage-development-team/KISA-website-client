#!/usr/bin/env bash
set -euo pipefail

# unlink-ds.sh — Remove DS symlinks and restore registry versions.
#
# Usage:
#   ./scripts/unlink-ds.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CLIENT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Unlinking DS packages..."
(cd "$CLIENT_ROOT" && npm unlink @umichkisa-ds/web @umichkisa-ds/form 2>/dev/null) || true

echo "Restoring registry versions..."
(cd "$CLIENT_ROOT" && npm install)

echo ""
echo "Done. DS packages restored to registry versions."
