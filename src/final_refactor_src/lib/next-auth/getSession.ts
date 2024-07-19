import authOptions from "./authOptions";
import { getServerSession } from "next-auth";

// @desc get session on server side using next-auth
export const getSession = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Error in `[auth] getSession` ", error);
    return null;
  }
};
