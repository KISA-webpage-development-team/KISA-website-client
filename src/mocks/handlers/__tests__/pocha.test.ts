import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { pochaHandlers, resetPochaStore } from "../pocha";

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
});
