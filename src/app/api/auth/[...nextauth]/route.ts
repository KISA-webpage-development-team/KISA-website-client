// import { authOptions } from "../../../../config/auth";
import authOptions from "@/final_refactor_src/lib/next-auth/authOptions";
import NextAuth from "next-auth";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
