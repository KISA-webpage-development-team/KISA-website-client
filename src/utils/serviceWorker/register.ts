// src/utils/serviceWorker.ts

// Add type definitions for Periodic Background Sync API
interface PeriodicSyncManager {
  register(tag: string, options?: { minInterval: number }): Promise<void>;
  unregister(tag: string): Promise<void>;
  getTags(): Promise<string[]>;
}

// Extend ServiceWorkerRegistration interface
declare global {
  interface ServiceWorkerRegistration {
    periodicSync: {
      register(tag: string, options?: { minInterval: number }): Promise<void>;
      unregister(tag: string): Promise<void>;
      getTags(): Promise<string[]>;
    };
  }
}

export function registerServiceWorker() {
  if (
    "serviceWorker" in navigator &&
    "periodicsync" in navigator.serviceWorker
  ) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");

        // Register periodic sync
        const status = await navigator.permissions.query({
          name: "periodic-background-sync" as PermissionName,
        });

        if (status.state === "granted") {
          await registration.periodicSync.register("update-orders", {
            minInterval: 15 * 60 * 1000, // Minimum 15 minutes
          });
        }

        console.log("ServiceWorker registration successful");
      } catch (error) {
        console.error("ServiceWorker registration failed:", error);
      }
    });
  }
}
