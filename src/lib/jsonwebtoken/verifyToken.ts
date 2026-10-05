import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./env";

// Returns the email of a token issued by signToken, or null when the token
// is malformed, expired, or not signed with JWT_SECRET_KEY.
const verifyToken = (token: string): string | null => {
  try {
    const claims = jwt.verify(token, JWT_SECRET_KEY as string, {
      algorithms: ["HS256"],
    });
    if (typeof claims === "string" || typeof claims.id !== "string") {
      return null;
    }
    return claims.id;
  } catch {
    return null;
  }
};

export default verifyToken;
