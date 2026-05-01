"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MOCK_API !== "1") {
      setReady(true);
      return;
    }

    import("./browser").then(({ worker }) =>
      worker.start({ onUnhandledRequest: "warn" }).then(() => {
        // On first SW install, `start()` resolves once the worker is activated,
        // but this page is not yet a controlled client — `clients.claim()`
        // hasn't propagated. Subsequent fetches from this page would bypass
        // MSW and hit the network (404 against /_mock-api). Force a one-time
        // reload so the page comes up under SW control.
        if (!navigator.serviceWorker.controller) {
          window.location.reload();
          return;
        }
        setReady(true);
      })
    );
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
