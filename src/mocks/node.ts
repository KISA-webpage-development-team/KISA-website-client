import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Mock API for server-side requests (server components in mock mode). The
// browser uses the service worker in `./browser` instead.
export const server = setupServer(...handlers);
