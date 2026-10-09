// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

// Server components fetch through the shared axios client in Node, where the
// browser service worker cannot reach. In mock mode those requests must still
// resolve against the mock handlers.
describe("server-side fetch in mock mode", () => {
  afterEach(async () => {
    const { server } = await import("../node");
    server.close();
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("serves the home carousel from the mock handlers", async () => {
    vi.stubEnv("NEXT_PUBLIC_MOCK_API", "1");
    vi.resetModules();
    const { server } = await import("../node");
    server.listen({ onUnhandledRequest: "error" });
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const { getCarouselItems } = await import("@/apis/carousel/queries");
    const items = await getCarouselItems();

    expect(error).not.toHaveBeenCalled();
    expect(items.length).toBeGreaterThan(0);
  });
});
