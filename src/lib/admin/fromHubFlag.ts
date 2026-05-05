/**
 * `kisa.admin.fromHub` — sessionStorage flag gating the BackToHubFAB.
 *
 * Writers:
 *   - `/admin/layout.tsx` on hub mount (path === "/admin").
 *   - `AdminHubCards` Link onClick (preemptive set before navigation).
 *
 * Reader:
 *   - `BackToHubFAB` (visibility gate).
 *
 * Flag persists for the session (sessionStorage clears on tab close).
 * sessionStorage may be unavailable in private mode — calls swallow errors;
 * the FAB simply won't render.
 */

const FROM_HUB_KEY = "kisa.admin.fromHub";

export function setFromHubFlag() {
  try {
    sessionStorage.setItem(FROM_HUB_KEY, "1");
  } catch {
    // no-op
  }
}

export function readFromHubFlag(): boolean {
  try {
    return sessionStorage.getItem(FROM_HUB_KEY) === "1";
  } catch {
    return false;
  }
}

export function clearFromHubFlag() {
  try {
    sessionStorage.removeItem(FROM_HUB_KEY);
  } catch {
    // no-op
  }
}
