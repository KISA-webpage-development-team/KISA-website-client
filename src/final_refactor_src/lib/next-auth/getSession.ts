import authOptions from "./authOptions";
import { getServerSession } from "next-auth";
import { UserSession } from "./types";

// @desc get session on server side using next-auth
export const getSession = async (): Promise<UserSession | null> => {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Error in `[auth] getSession` ", error);
    return null;
  }
};
