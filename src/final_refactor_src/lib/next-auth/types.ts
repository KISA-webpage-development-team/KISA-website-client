import { Session } from "next-auth";

// next-auth의 session에 token을 추가한 interface
export interface UserSession extends Session {
  token?: string;
}
