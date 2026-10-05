import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { carouselHandlers, resetCarouselStore } from "../carousel";

const server = setupServer(...carouselHandlers);
const BASE = "http://localhost/_mock-api";
const AUTH = { Authorization: "Bearer mock-access-token", "Content-Type": "application/json" };

const inDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString("en-CA");
};

const liveTitles = async () =>
  ((await (await fetch(`${BASE}/carousel/`)).json()) as { title: string }[]).map((i) => i.title);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => resetCarouselStore());
afterAll(() => server.close());

describe("carousel mock handlers", () => {
  it("lists only effective-live items, expired ones read as archive", async () => {
    const titles = await liveTitles();
    expect(titles).toHaveLength(3);
    expect(titles).not.toContain("여름 네트워킹 행사");

    const admin = await (await fetch(`${BASE}/carousel/admin/`, { headers: AUTH })).json();
    expect(admin.archive.map((i: { title: string }) => i.title)).toContain("여름 네트워킹 행사");
  });

  it("places a created item by the end-date rule", async () => {
    const response = await fetch(`${BASE}/carousel/`, {
      method: "POST",
      headers: AUTH,
      body: JSON.stringify({
        title: "Soon",
        description: "<p>x</p>",
        link: null,
        endDate: inDays(1),
        imageTempPublicID: "temp/carousel-1",
      }),
    });

    expect(response.status).toBe(201);
    expect((await liveTitles())[0]).toBe("Soon");
  });

  it("rejects a stale order save with 409", async () => {
    const response = await fetch(`${BASE}/carousel/order/`, {
      method: "PUT",
      headers: AUTH,
      body: JSON.stringify({ order: [1, 2] }),
    });

    expect(response.status).toBe(409);
  });

  it("requires a token on admin routes", async () => {
    expect((await fetch(`${BASE}/carousel/admin/`)).status).toBe(401);
  });
});
