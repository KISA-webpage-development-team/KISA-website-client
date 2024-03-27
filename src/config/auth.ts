// Configuration for Google Auth using next-auth
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import SignToken from "../utils/signToken";
import { backendUrl } from "./backendUrl";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.token = token.accessToken;
      // session.name = user.name;
      return session;
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const access_token = await SignToken(user?.email as string);
        token.accessToken = access_token;
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile, credentials }) {
      // console.log(backendUrl);
      // 1. check whether user already exists in DB
      try {
        const res = await axios.get(`${backendUrl}/auth/userExists`, {
          params: { email: profile.email },
        });

        if (res.status === 200) {
          const fullname = res.data?.fullname;
          user.name = fullname;

          return true;
        }
        return false; // if not 200, something went wrong
      } catch (error) {
        // Check if email ends with "umich.edu"
        if (!profile.email.endsWith("umich.edu")) {
          return false;
        }

        // 2. if not, redirect to /signup page to create a new user
        console.log("user doens't exist, redirecting to signup page...");
        // console.log("error: ", error);
        return "/signup";
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.split("/")[3] === "signup") return baseUrl;
      else if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.JWT_SECRET_KEY,
};
