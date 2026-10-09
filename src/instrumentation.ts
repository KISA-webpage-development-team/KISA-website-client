// Starts the Node-side mock API in mock mode so server components get mock
// data. Build-time gate: when NEXT_PUBLIC_MOCK_API !== "1" (or on the edge
// runtime) the import below is dead code and msw/node is never bundled.
export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NEXT_PUBLIC_MOCK_API === "1"
  ) {
    const { server } = await import("./mocks/node");
    server.listen({ onUnhandledRequest: "bypass" });
  }
}
