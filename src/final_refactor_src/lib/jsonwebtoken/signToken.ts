import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@/final_refactor_src/lib/jsonwebtoken/env";

const signToken = async (email: string): Promise<string> => {
  const token = await jwt.sign({ id: email }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

export default signToken;
