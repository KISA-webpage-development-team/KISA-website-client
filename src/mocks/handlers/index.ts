import { type RequestHandler } from "msw";
import { jobsHandlers } from "./jobs";
import { authHandlers } from "./auth";
import { usersHandlers } from "./users";
import { pochaHandlers } from "./pocha";

/**
 * MSW request handlers.
 * Add handlers here as features are migrated (Phases 1–5).
 * Each phase appends its own write-endpoint mocks.
 */
export const handlers: RequestHandler[] = [
  ...jobsHandlers,
  ...authHandlers,
  ...usersHandlers,
  ...pochaHandlers,
];
