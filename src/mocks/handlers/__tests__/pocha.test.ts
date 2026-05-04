import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import {
  pochaHandlers,
  resetCartStore,
  resetOrderStore,
  resetPochaStore,
} from "../pocha";
import { MOCK_USER_EMAIL } from "../../fixtures/pocha";

const server = setupServer(...pochaHandlers);

const AUTH_HEADER = { Authorization: "Bearer mock-access-token" };

const validBody = () => ({
  email: "tester@umich.edu",
  startDate: new Date("2030-01-01T00:00:00.000Z").toISOString(),
  endDate: new Date("2030-01-02T00:00:00.000Z").toISOString(),
  title: "New Test Pocha",
  description: "A pocha created for test purposes",
  menus: [
    {
      nameKor: "소주",
      nameEng: "Soju",
      category: "drink",
      description: "Classic",
      price: 10,
      stock: 100,
      isImmediatePrep: true,
      ageCheckRequired: true,
    },
  ],
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  resetPochaStore();
  resetOrderStore();
  resetCartStore();
});
afterAll(() => server.close());

describe("MSW pocha handlers", () => {
  describe("GET /pocha/status-info/", () => {
    it("returns 200 with the active pocha when date falls within its window", async () => {
      // Fixture contract: one active pocha covers today (2026-04-23).
      const today = new Date("2026-04-23T12:00:00.000Z").toISOString();
      const res = await fetch(
        `http://localhost/pocha/status-info/?date=${encodeURIComponent(today)}`
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(typeof body.pochaID).toBe("number");
      expect(typeof body.title).toBe("string");
      expect(body.title.length).toBeGreaterThan(0);
    });

    it("returns 200 with empty object when date is outside all fixture windows", async () => {
      const farFuture = new Date("2099-01-01T00:00:00.000Z").toISOString();
      const res = await fetch(
        `http://localhost/pocha/status-info/?date=${encodeURIComponent(farFuture)}`
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toEqual({});
    });
  });

  describe("GET /pocha/previous/", () => {
    it("returns 200 with a list of 3-5 historical pochas all ending before the queried date", async () => {
      const today = new Date("2026-04-23T12:00:00.000Z");
      const res = await fetch(
        `http://localhost/pocha/previous/?date=${encodeURIComponent(today.toISOString())}`
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThanOrEqual(3);
      expect(body.length).toBeLessThanOrEqual(5);
      for (const pocha of body) {
        expect(typeof pocha.pochaID).toBe("number");
        expect(typeof pocha.title).toBe("string");
        expect(new Date(pocha.endDate).getTime()).toBeLessThan(today.getTime());
      }
    });
  });

  describe("POST /pocha/", () => {
    it("returns 200 with { pochaID, message } when called with Authorization + valid body and appends to store", async () => {
      const res1 = await fetch("http://localhost/pocha/", {
        method: "POST",
        headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
        body: JSON.stringify(validBody()),
      });
      expect(res1.status).toBe(200);
      const body1 = await res1.json();
      expect(typeof body1.pochaID).toBe("number");
      expect(typeof body1.message).toBe("string");

      // Second POST: the store should have grown — pochaID increments.
      const res2 = await fetch("http://localhost/pocha/", {
        method: "POST",
        headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
        body: JSON.stringify(validBody()),
      });
      expect(res2.status).toBe(200);
      const body2 = await res2.json();
      expect(body2.pochaID).toBe(body1.pochaID + 1);
    });

    it("returns 401 when Authorization header is missing", async () => {
      const res = await fetch("http://localhost/pocha/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validBody()),
      });
      expect(res.status).toBe(401);
    });
  });

  describe("PUT /pocha/:id/", () => {
    it("returns 200 with { pochaID, message } when updating an existing pocha (fixture id=1)", async () => {
      const res = await fetch("http://localhost/pocha/1/", {
        method: "PUT",
        headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
        body: JSON.stringify(validBody()),
      });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.pochaID).toBe(1);
      expect(typeof body.message).toBe("string");
    });

    it("returns 404 when updating a non-existent pocha", async () => {
      const res = await fetch("http://localhost/pocha/99999/", {
        method: "PUT",
        headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
        body: JSON.stringify(validBody()),
      });
      expect(res.status).toBe(404);
    });
  });

  describe("GET /pocha/menu/:pochaID/", () => {
    it("returns 200 with MenuByCategory[] for a pocha that has a menu fixture (pochaID=1)", async () => {
      const res = await fetch("http://localhost/pocha/menu/1/", {
        headers: AUTH_HEADER,
      });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);

      for (const group of body) {
        expect(typeof group.category).toBe("string");
        expect(group.category.length).toBeGreaterThan(0);
        expect(Array.isArray(group.menusList)).toBe(true);
        expect(group.menusList.length).toBeGreaterThan(0);
        for (const item of group.menusList) {
          expect(typeof item.menuID).toBe("number");
          expect(typeof item.nameKor).toBe("string");
          expect(typeof item.nameEng).toBe("string");
          expect(typeof item.price).toBe("number");
          expect(typeof item.stock).toBe("number");
          expect(typeof item.isImmediatePrep).toBe("boolean");
          expect(typeof item.ageCheckRequired).toBe("boolean");
        }
      }
    });

    it("returns at least 2 categories and every item category matches its group", async () => {
      const res = await fetch("http://localhost/pocha/menu/1/", {
        headers: AUTH_HEADER,
      });
      const body = await res.json();
      expect(body.length).toBeGreaterThanOrEqual(2);
      const categories = new Set(body.map((g: { category: string }) => g.category));
      expect(categories.size).toBe(body.length); // no duplicate category groups
    });

    it("returns 200 with [] for a pochaID that has no menu fixture", async () => {
      const res = await fetch("http://localhost/pocha/menu/99999/", {
        headers: AUTH_HEADER,
      });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toEqual([]);
    });

    it("returns 401 when Authorization header is missing", async () => {
      const res = await fetch("http://localhost/pocha/menu/1/");
      expect(res.status).toBe(401);
    });
  });
});

describe("MSW pocha dashboard handlers", () => {
  // Active fixture pocha used for all dashboard endpoints.
  const POCHA_ID = 1;

  describe("GET /pocha/dashboard/:pochaID/ (active orders)", () => {
    it("returns 200 with { pending, preparing, ready } populated from non-closed fixtures", async () => {
      const res = await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`, {
        headers: AUTH_HEADER,
      });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body.pending)).toBe(true);
      expect(Array.isArray(body.preparing)).toBe(true);
      expect(Array.isArray(body.ready)).toBe(true);
      // None of the active buckets contain a `closed` item.
      const all = [...body.pending, ...body.preparing, ...body.ready];
      expect(all.length).toBeGreaterThan(0);
      for (const item of all) {
        expect(item.status).not.toBe("closed");
        expect(typeof item.orderItemID).toBe("number");
        expect(typeof item.menu).toBe("object");
        expect(typeof item.ordererName).toBe("string");
        expect(typeof item.ordererEmail).toBe("string");
        expect(typeof item.quantity).toBe("number");
      }
    });

    it("returns 401 when Authorization header is missing", async () => {
      const res = await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`);
      expect(res.status).toBe(401);
    });
  });

  describe("GET /pocha/dashboard/:pochaID/closed/ (closed orders)", () => {
    it("returns 200 with { closed } populated from closed fixtures", async () => {
      const res = await fetch(
        `http://localhost/pocha/dashboard/${POCHA_ID}/closed/`,
        { headers: AUTH_HEADER }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body.closed)).toBe(true);
      expect(body.closed.length).toBeGreaterThan(0);
      for (const item of body.closed) {
        expect(item.status).toBe("closed");
      }
    });
  });

  describe("PUT /pocha/dashboard/:orderItemID/change-status/", () => {
    it("food (isImmediatePrep=false) advances pending → preparing → ready → closed", async () => {
      // Find a food item in pending status from the active fixture.
      const orders = await (
        await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      const food = orders.pending.find(
        (o: { menu: { isImmediatePrep: boolean } }) => o.menu.isImmediatePrep === false
      );
      expect(food).toBeDefined();
      const id = food.orderItemID;

      const step = async () => {
        const res = await fetch(
          `http://localhost/pocha/dashboard/${id}/change-status/`,
          { method: "PUT", headers: AUTH_HEADER }
        );
        expect(res.status).toBe(200);
        return (await res.json()).newStatus;
      };

      expect(await step()).toBe("preparing");
      expect(await step()).toBe("ready");
      expect(await step()).toBe("closed");
    });

    it("drink (isImmediatePrep=true) advances pending → ready → closed (skips preparing)", async () => {
      const orders = await (
        await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      const drink = orders.pending.find(
        (o: { menu: { isImmediatePrep: boolean } }) => o.menu.isImmediatePrep === true
      );
      expect(drink).toBeDefined();
      const id = drink.orderItemID;

      const r1 = await fetch(
        `http://localhost/pocha/dashboard/${id}/change-status/`,
        { method: "PUT", headers: AUTH_HEADER }
      );
      expect(r1.status).toBe(200);
      expect((await r1.json()).newStatus).toBe("ready");

      const r2 = await fetch(
        `http://localhost/pocha/dashboard/${id}/change-status/`,
        { method: "PUT", headers: AUTH_HEADER }
      );
      expect(r2.status).toBe(200);
      expect((await r2.json()).newStatus).toBe("closed");
    });

    it("returns 400 for an item already at closed", async () => {
      // Closed-orders endpoint gives us a known-closed id.
      const closed = await (
        await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/closed/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      const id = closed.closed[0].orderItemID;
      const res = await fetch(
        `http://localhost/pocha/dashboard/${id}/change-status/`,
        { method: "PUT", headers: AUTH_HEADER }
      );
      expect(res.status).toBe(400);
    });

    it("returns 404 for an unknown orderItemID", async () => {
      const res = await fetch(
        "http://localhost/pocha/dashboard/9999999/change-status/",
        { method: "PUT", headers: AUTH_HEADER }
      );
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /pocha/dashboard/change-stock/ (menu stock update)", () => {
    it("updates menusStore for the matched menu and returns { ok, menuID, quantity }", async () => {
      const res = await fetch("http://localhost/pocha/dashboard/change-stock/", {
        method: "PUT",
        headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
        body: JSON.stringify({ menuID: 101, quantity: 7 }),
      });
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
      expect(body.menuID).toBe(101);
      expect(body.quantity).toBe(7);

      // Verify by reading menus through the existing GET endpoint.
      const menusRes = await fetch(`http://localhost/pocha/menu/${POCHA_ID}/`, {
        headers: AUTH_HEADER,
      });
      const groups = await menusRes.json();
      const drinks = groups.find(
        (g: { category: string }) => g.category === "drink"
      );
      const soju = drinks.menusList.find(
        (m: { menuID: number }) => m.menuID === 101
      );
      expect(soju.stock).toBe(7);
    });

    it("returns 400 for negative quantity", async () => {
      const res = await fetch("http://localhost/pocha/dashboard/change-stock/", {
        method: "PUT",
        headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
        body: JSON.stringify({ menuID: 101, quantity: -3 }),
      });
      expect(res.status).toBe(400);
    });
  });

  describe("POST /pocha/_mock/spawn-order/:pochaID/", () => {
    it("creates a new pending OrderItem from a stocked menu, decrements that menu's stock, returns enriched shape", async () => {
      // Read menus before spawn.
      const before = await (
        await fetch(`http://localhost/pocha/menu/${POCHA_ID}/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      const stockMap = new Map<number, number>();
      for (const g of before) for (const m of g.menusList) stockMap.set(m.menuID, m.stock);

      const res = await fetch(
        `http://localhost/pocha/_mock/spawn-order/${POCHA_ID}/`,
        { method: "POST", headers: AUTH_HEADER }
      );
      expect(res.status).toBe(200);
      const item = await res.json();
      expect(typeof item.orderItemID).toBe("number");
      expect(item.status).toBe("pending");
      expect(typeof item.menu).toBe("object");
      expect(typeof item.menu.menuID).toBe("number");
      expect(typeof item.ordererName).toBe("string");
      expect(typeof item.ordererEmail).toBe("string");
      expect(item.quantity).toBeGreaterThanOrEqual(1);
      expect(item.quantity).toBeLessThanOrEqual(3);

      // Stock for the picked menu decreased.
      const after = await (
        await fetch(`http://localhost/pocha/menu/${POCHA_ID}/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      const newStock = after
        .flatMap((g: { menusList: { menuID: number; stock: number }[] }) => g.menusList)
        .find((m: { menuID: number }) => m.menuID === item.menu.menuID).stock;
      expect(newStock).toBe(stockMap.get(item.menu.menuID)! - item.quantity);

      // The new item shows up in the active orders pending bucket.
      const orders = await (
        await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      expect(
        orders.pending.some(
          (o: { orderItemID: number }) => o.orderItemID === item.orderItemID
        )
      ).toBe(true);
    });

    it("returns 409 when every menu item has stock === 0", async () => {
      // Drain every menu's stock first via change-stock.
      const groups = await (
        await fetch(`http://localhost/pocha/menu/${POCHA_ID}/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      for (const g of groups) {
        for (const m of g.menusList) {
          await fetch("http://localhost/pocha/dashboard/change-stock/", {
            method: "PUT",
            headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
            body: JSON.stringify({ menuID: m.menuID, quantity: 0 }),
          });
        }
      }
      const res = await fetch(
        `http://localhost/pocha/_mock/spawn-order/${POCHA_ID}/`,
        { method: "POST", headers: AUTH_HEADER }
      );
      expect(res.status).toBe(409);
    });
  });

  describe("resetOrderStore()", () => {
    it("re-seeds the order store from fixtures (mutate, reset, read)", async () => {
      // Mutate: close a pending item.
      const orders = await (
        await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      const id = orders.pending[0].orderItemID;
      // food: pending → preparing → ready → closed (3 calls)
      // drink: pending → ready → closed (2 calls)
      // Brute-force advance until 400.
      for (let i = 0; i < 4; i++) {
        const r = await fetch(
          `http://localhost/pocha/dashboard/${id}/change-status/`,
          { method: "PUT", headers: AUTH_HEADER }
        );
        if (r.status === 400) break;
      }

      resetOrderStore();

      const after = await (
        await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`, {
          headers: AUTH_HEADER,
        })
      ).json();
      // The previously-mutated id is back to its original (non-closed) bucket.
      const all = [...after.pending, ...after.preparing, ...after.ready];
      expect(all.some((o: { orderItemID: number }) => o.orderItemID === id)).toBe(true);
    });
  });
});

describe("MSW pocha user-facing handlers", () => {
  const POCHA_ID = 1;
  const EMAIL = MOCK_USER_EMAIL;
  const enc = (s: string) => encodeURIComponent(s);

  describe("GET /pocha/cart/:email/:pochaID/", () => {
    it("returns the seeded cart as an object keyed by menuID for the default user", async () => {
      const res = await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(typeof body).toBe("object");
      expect(Array.isArray(body)).toBe(false);
      // Seeded with at least one menu line; each entry has { menu, quantity }.
      const entries = Object.entries(body);
      expect(entries.length).toBeGreaterThan(0);
      for (const [key, val] of entries) {
        expect(Number.isFinite(Number(key))).toBe(true);
        const v = val as { menu: { menuID: number }; quantity: number };
        expect(typeof v.quantity).toBe("number");
        expect(typeof v.menu.menuID).toBe("number");
        expect(Number(key)).toBe(v.menu.menuID);
      }
    });

    it("returns {} for an email with no cart entry", async () => {
      const res = await fetch(
        `http://localhost/pocha/cart/${enc("nobody@umich.edu")}/${POCHA_ID}/`
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toEqual({});
    });
  });

  describe("POST /pocha/cart/:email/:pochaID/", () => {
    it("adds a new item when not in cart (positive quantity) and returns isStocked=true", async () => {
      const NEW_MENU = 202; // 김밥 — not in seeded cart
      const res = await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menuID: NEW_MENU, quantity: 1 }),
        }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isStocked).toBe(true);
      expect(typeof body.message).toBe("string");

      const cart = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      expect(cart[NEW_MENU].quantity).toBe(1);
    });

    it("increments existing item's quantity (positive quantity)", async () => {
      const SOJU = 101; // seeded with quantity=1
      const res = await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menuID: SOJU, quantity: 2 }),
        }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isStocked).toBe(true);

      const cart = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      expect(cart[SOJU].quantity).toBe(3);
    });

    it("decrements existing item's quantity (negative quantity)", async () => {
      const TTEOK = 201; // seeded with quantity=2
      const res = await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menuID: TTEOK, quantity: -1 }),
        }
      );
      expect(res.status).toBe(200);
      const cart = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      expect(cart[TTEOK].quantity).toBe(1);
    });

    it("removes item when decrement brings quantity ≤ 0", async () => {
      const SOJU = 101; // seeded with quantity=1
      await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuID: SOJU, quantity: -1 }),
      });
      const cart = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      expect(SOJU in cart).toBe(false);
    });

    it("returns 409 with isStocked=false when add would exceed menu stock", async () => {
      const SOJU = 101; // seeded stock=40, cart already has 1
      const res = await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menuID: SOJU, quantity: 100 }),
        }
      );
      expect(res.status).toBe(409);
      const body = await res.json();
      expect(body.isStocked).toBe(false);
      expect(typeof body.message).toBe("string");
    });
  });

  describe("PUT /pocha/payment/:email/:pochaID/check-stock/", () => {
    it("returns { isStocked: true } when every cart line ≤ menu stock", async () => {
      const res = await fetch(
        `http://localhost/pocha/payment/${enc(EMAIL)}/${POCHA_ID}/check-stock/`,
        { method: "PUT" }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isStocked).toBe(true);
    });

    it("returns { isStocked: false } when any cart line exceeds menu stock", async () => {
      // Drain stock for the seeded soju (101) below the cart quantity.
      await fetch("http://localhost/pocha/dashboard/change-stock/", {
        method: "PUT",
        headers: { ...AUTH_HEADER, "Content-Type": "application/json" },
        body: JSON.stringify({ menuID: 101, quantity: 0 }),
      });
      const res = await fetch(
        `http://localhost/pocha/payment/${enc(EMAIL)}/${POCHA_ID}/check-stock/`,
        { method: "PUT" }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.isStocked).toBe(false);
    });
  });

  describe("GET /pocha/order/:email/:pochaID/", () => {
    it("returns Orders shape filtered to non-closed orders for that email (with auth)", async () => {
      const res = await fetch(
        `http://localhost/pocha/order/${enc(EMAIL)}/${POCHA_ID}/`,
        { headers: AUTH_HEADER }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body.pending)).toBe(true);
      expect(Array.isArray(body.preparing)).toBe(true);
      expect(Array.isArray(body.ready)).toBe(true);
      const all = [...body.pending, ...body.preparing, ...body.ready];
      expect(all.length).toBeGreaterThan(0);
      for (const o of all) {
        expect(o.ordererEmail).toBe(EMAIL);
        expect(o.status).not.toBe("closed");
      }
    });

    it("returns 401 without Authorization", async () => {
      const res = await fetch(
        `http://localhost/pocha/order/${enc(EMAIL)}/${POCHA_ID}/`
      );
      expect(res.status).toBe(401);
    });
  });

  describe("GET /pocha/order/:email/:pochaID/closed/", () => {
    it("returns { closed } filtered to closed orders for that email", async () => {
      const res = await fetch(
        `http://localhost/pocha/order/${enc(EMAIL)}/${POCHA_ID}/closed/`,
        { headers: AUTH_HEADER }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body.closed)).toBe(true);
      expect(body.closed.length).toBeGreaterThan(0);
      for (const o of body.closed) {
        expect(o.ordererEmail).toBe(EMAIL);
        expect(o.status).toBe("closed");
      }
    });
  });

  describe("GET /pocha/cart/:email/:pochaID/checkout-info/", () => {
    it("returns { amount, ageCheckRequired } summed over the user's cart", async () => {
      const res = await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/checkout-info/`,
        { headers: AUTH_HEADER }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      // Seeded: soju (8 * 1) + tteokbokki (10 * 2) = 28
      expect(body.amount).toBe(28);
      // Soju has ageCheckRequired=true
      expect(body.ageCheckRequired).toBe("true");
    });

    it("returns ageCheckRequired='false' when no cart line requires age check", async () => {
      // Replace cart: drop both seeded items (one negative each), add coke (103).
      await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menuID: 101, quantity: -1 }),
        }
      );
      await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menuID: 201, quantity: -2 }),
        }
      );
      await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menuID: 103, quantity: 2 }),
        }
      );
      const res = await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/checkout-info/`,
        { headers: AUTH_HEADER }
      );
      const body = await res.json();
      expect(body.amount).toBe(6);
      expect(body.ageCheckRequired).toBe("false");
    });

    it("returns 401 without Authorization", async () => {
      const res = await fetch(
        `http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/checkout-info/`
      );
      expect(res.status).toBe(401);
    });
  });

  describe("PUT /pocha/payment/:email/:pochaID/pay-result/", () => {
    it("on success: drains cart into pending OrderItems, decrements stock, clears cart, returns { ok: true }", async () => {
      // Snapshot pre-state.
      const cartBefore = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      const cartLines = Object.values(
        cartBefore as Record<string, { menu: { menuID: number; stock: number }; quantity: number }>
      );
      expect(cartLines.length).toBeGreaterThan(0);

      const sojuBefore = await (
        await fetch(`http://localhost/pocha/menu/${POCHA_ID}/`, { headers: AUTH_HEADER })
      ).json();
      const sojuStockBefore = sojuBefore
        .flatMap((g: { menusList: { menuID: number; stock: number }[] }) => g.menusList)
        .find((m: { menuID: number }) => m.menuID === 101).stock;

      const dashBefore = await (
        await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`, { headers: AUTH_HEADER })
      ).json();
      const pendingCountBefore = dashBefore.pending.length;

      const res = await fetch(
        `http://localhost/pocha/payment/${enc(EMAIL)}/${POCHA_ID}/pay-result/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result: "success" }),
        }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);

      // Cart cleared.
      const cartAfter = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      expect(cartAfter).toEqual({});

      // Stock decremented (soju was in cart with quantity 1).
      const menusAfter = await (
        await fetch(`http://localhost/pocha/menu/${POCHA_ID}/`, { headers: AUTH_HEADER })
      ).json();
      const sojuStockAfter = menusAfter
        .flatMap((g: { menusList: { menuID: number; stock: number }[] }) => g.menusList)
        .find((m: { menuID: number }) => m.menuID === 101).stock;
      expect(sojuStockAfter).toBe(sojuStockBefore - 1);

      // Dashboard pending grew by cartLines.length, all newly-pending lines are tester's.
      const dashAfter = await (
        await fetch(`http://localhost/pocha/dashboard/${POCHA_ID}/`, { headers: AUTH_HEADER })
      ).json();
      expect(dashAfter.pending.length).toBe(pendingCountBefore + cartLines.length);
    });

    it("on failure: cart preserved, returns { ok: true }", async () => {
      const before = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      const res = await fetch(
        `http://localhost/pocha/payment/${enc(EMAIL)}/${POCHA_ID}/pay-result/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result: "failure" }),
        }
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
      const after = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      expect(after).toEqual(before);
    });
  });

  describe("resetCartStore()", () => {
    it("re-seeds the cart store from mockUserCart", async () => {
      // Mutate: empty out the seeded soju line.
      await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menuID: 101, quantity: -1 }),
      });
      const mid = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      expect(101 in mid).toBe(false);

      resetCartStore();

      const after = await (
        await fetch(`http://localhost/pocha/cart/${enc(EMAIL)}/${POCHA_ID}/`)
      ).json();
      expect(after[101].quantity).toBe(1);
    });
  });
});
