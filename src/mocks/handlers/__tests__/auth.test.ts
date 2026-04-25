import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { authHandlers } from "../auth";

const server = setupServer(...authHandlers);

const ADMIN_FLAG_KEY = "kisa-mock-auth-isadmin";
const EMAIL = "tester@umich.edu";
const URL = `http://localhost/auth/isAdmin/${EMAIL}`;

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  sessionStorage.clear();
});
afterAll(() => server.close());

describe("MSW auth handler — GET /auth/isAdmin/:email", () => {
  it("returns 200 with 'user is admin' when flag is '1' and Authorization header present", async () => {
    sessionStorage.setItem(ADMIN_FLAG_KEY, "1");
    const res = await fetch(URL, {
      headers: { Authorization: "Bearer mock-access-token" },
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ message: "user is admin" });
  });

  it("returns 401 when flag is '0'", async () => {
    sessionStorage.setItem(ADMIN_FLAG_KEY, "0");
    const res = await fetch(URL, {
      headers: { Authorization: "Bearer mock-access-token" },
    });
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body).toEqual({ message: "user is not admin" });
  });

  it("returns 401 when flag is missing", async () => {
    const res = await fetch(URL, {
      headers: { Authorization: "Bearer mock-access-token" },
    });
    expect(res.status).toBe(401);
  });

  it("returns 401 when Authorization header is missing", async () => {
    sessionStorage.setItem(ADMIN_FLAG_KEY, "1");
    const res = await fetch(URL);
    expect(res.status).toBe(401);
  });
});
