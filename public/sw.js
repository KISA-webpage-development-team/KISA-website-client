// service worker testing code
// public/sw.js
const CACHE_NAME = "pocha-orders-cache-v1";
const API_CACHE_NAME = "pocha-api-cache-v1";

// Register periodic sync
self.addEventListener("periodicsync", async (event) => {
  if (event.tag === "update-orders") {
    try {
      // Get cached credentials
      const credentials = await self.registration.sync.getTags();
      const cache = await caches.open(API_CACHE_NAME);

      // Fetch new orders
      const response = await fetch("/api/orders/sync", {
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      });

      if (response.ok) {
        // Cache the new orders
        await cache.put("/api/orders", response.clone());

        // Send message to client
        const clients = await self.clients.matchAll();
        clients.forEach((client) => {
          client.postMessage({
            type: "ORDERS_UPDATED",
            orders: response.json(),
          });
        });
      }
    } catch (error) {
      console.error("Background sync failed:", error);
    }
  }
});

// Handle push notifications
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.message,
      icon: "/public/kisa_logo.png",
      badge: "/public/kisa_logo.png",
      data: data,
    };

    event.waitUntil(
      self.registration.showNotification("Order Update", options)
    );
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
