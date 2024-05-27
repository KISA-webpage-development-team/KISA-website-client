import { Session } from "next-auth";

export type BoardType =
  | "academic-job"
  | "announcement"
  | "buyandsell"
  | "community"
  | "housing";

// interface to resolve type error on `session?.token`
export interface CustomSession extends Session {
  token?: string;
}
