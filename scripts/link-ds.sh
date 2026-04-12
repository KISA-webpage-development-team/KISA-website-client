#!/usr/bin/env bash
set -euo pipefail

# link-ds.sh — Symlink local DS packages into the client via npm link.
#
# Usage:
#   ./scripts/link-ds.sh              # uses default sibling path
#   ./scripts/link-ds.sh /path/to/ds  # explicit DS repo path
#
# Prerequisites:
#   Run `pnpm build` in the DS repo first — this script needs dist/ output.
#
# ⚠ Duplicate React warning:
#   npm link can cause Node to resolve two copies of React (one from the
#   client, one from the DS repo's node_modules). This breaks React hooks
#   with "Invalid hook call" errors. Fix: add a resolve.alias in
#   next.config.js that forces React to resolve from the client:
#
#     resolve: {
#       alias: {
#         react: path.resolve('./node_modules/react'),
#         'react-dom': path.resolve('./node_modules/react-dom'),
#       },
#     }
#
#   This alias is harmless when not linked. It should be added once during
#   Phase 0 setup, not by this script.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CLIENT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DS_ROOT="${1:-"$(cd "$SCRIPT_DIR/../../../umichkisa-ds" 2>/dev/null && pwd)"}"

if [ -z "$DS_ROOT" ] || [ ! -d "$DS_ROOT" ]; then
  echo "Error: DS repo not found."
  echo "Expected at: $(cd "$SCRIPT_DIR/../../.." 2>/dev/null && pwd)/umichkisa-ds"
  echo "Or pass the path explicitly: ./scripts/link-ds.sh /path/to/umichkisa-ds"
  exit 1
fi

WEB_DIST="$DS_ROOT/packages/web/dist"
FORM_DIST="$DS_ROOT/packages/form/dist"

if [ ! -d "$WEB_DIST" ] || [ ! -d "$FORM_DIST" ]; then
  echo "Error: DS packages are not built."
  [ ! -d "$WEB_DIST" ] && echo "  Missing: packages/web/dist/"
  [ ! -d "$FORM_DIST" ] && echo "  Missing: packages/form/dist/"
  echo ""
  echo "Run this in the DS repo first:"
  echo "  cd $DS_ROOT && pnpm build"
  exit 1
fi

echo "Registering DS packages for linking..."
(cd "$DS_ROOT/packages/web" && npm link)
(cd "$DS_ROOT/packages/form" && npm link)

echo "Linking into client..."
(cd "$CLIENT_ROOT" && npm link @umichkisa-ds/web @umichkisa-ds/form)

echo ""
echo "Done. Linked:"
echo "  @umichkisa-ds/web  → $DS_ROOT/packages/web"
echo "  @umichkisa-ds/form → $DS_ROOT/packages/form"
