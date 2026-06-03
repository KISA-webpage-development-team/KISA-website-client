#!/usr/bin/env bash
# Deterministically classify a PR's risk from its changed files.
#   Usage: classify-risk.sh <base> <head>          (base/head = ref or SHA)
#   Env (both REQUIRED):
#     REPO=owner/repo
#     GH_TOKEN=<token with contents:read>           # used by `gh api`
#   Prints exactly one of: simple | complex | human-required
#   Fails safe to human-required on an empty/unknown diff.
#
# SECURITY: only ever invoke the copy of this script from a trusted ref
# (the default branch), never from a PR checkout -- a PR could otherwise edit
# its own classifier.
set -euo pipefail

BASE="${1:?base ref/sha required}"
HEAD="${2:?head ref/sha required}"
: "${REPO:?REPO env (owner/repo) required}"
: "${GH_TOKEN:?GH_TOKEN env (contents:read) required}"

CMP="$(gh api "repos/${REPO}/compare/${BASE}...${HEAD}" 2>/dev/null || true)"
[ -n "$CMP" ] || { echo "human-required"; exit 0; }

FILES="$(printf '%s' "$CMP" | jq -r '.files[].filename // empty')"
[ -n "$FILES" ] || { echo "human-required"; exit 0; }

# Sensitive paths -> always human-required. Pattern kept in one variable so it
# cannot be accidentally line-wrapped.
SENSITIVE='(^\.github/|(^|/)package(-lock)?\.json$|(^|/)yarn\.lock$|(^|/)pnpm-lock\.yaml$|src/constants/env|pocha|auth|jwt|admin|payment|stripe|secret|migration)'
if printf '%s\n' "$FILES" | grep -qiE "$SENSITIVE"; then
  echo "human-required"; exit 0
fi

NFILES="$(printf '%s\n' "$FILES" | grep -c . || true)"
CHANGES="$(printf '%s' "$CMP" | jq -r '[.files[] | (.additions + .deletions)] | add // 0')"
if [ "${NFILES:-0}" -gt 5 ] || [ "${CHANGES:-0}" -gt 150 ]; then
  echo "complex"
else
  echo "simple"
fi
