// `env.ts`
// : all of the environment variables (.env, .env.local) are loaded here
// and exported to be used in the app.

// Google Auth
export const GOOGLE_ID = process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "";
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET
  ? process.env.GOOGLE_SECRET
  : "";

// Google Calendar
export const GOOGLE_CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID
  ? process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID
  : "";
export const GOOGLE_CALENDAR_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
  ? process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
  : "";

// Backend
const useLocalBackend = process.env.NEXT_PUBLIC_USE_LOCAL_BACKEND === "true";
const useMockApi = process.env.NEXT_PUBLIC_MOCK_API === "1";
// In mock mode, point axios at a same-origin synthetic prefix so requests
// never leak to the real API (no CORS surface). The prefix is intentionally
// not the prod `/api/v2` path — MSW handlers match on URL path suffix
// (e.g. `/pocha/...`), so the prefix is opaque, and decoupling it from the
// real API version means a future v3 backend bump won't silently change
// dev-mock behavior. If MSW misses, the request 404s against the dev server
// instead of CORS-failing against prod.
export const BACKEND_URL = useMockApi
  ? "/_mock-api"
  : useLocalBackend
    ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL;

// Stripe
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
export const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

// WebSocket
const useLocalWebsocket =
  process.env.NEXT_PUBLIC_USE_LOCAL_WEBSOCKET === "true";
export const WEBSOCKET_URL = useLocalWebsocket
  ? process.env.NEXT_PUBLIC_LOCAL_WEBSOCKET_URL
  : process.env.NEXT_PUBLIC_WEBSOCKET_URL;
