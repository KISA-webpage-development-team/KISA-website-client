import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// Module-level dedupe. React StrictMode (and any future provider remount)
// runs MSWProvider's effect twice; both calls reach `worker.start()`. MSW
// short-circuits the second call ("redundant worker.start()") and resolves
// it immediately, **before** the first call's SW activation actually
// finishes. The second resolution then flips ready=true, children mount,
// and fetches race ahead of the not-yet-controlling worker → 404. By
// awaiting the same in-flight promise, both StrictMode runs see the real
// activation completion.
let startPromise: Promise<void> | null = null;
export function startWorkerOnce(): Promise<void> {
  if (!startPromise) {
    startPromise = worker
      .start({ onUnhandledRequest: "warn" })
      .then(() => undefined);
  }
  return startPromise;
}
