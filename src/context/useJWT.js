import { useSession } from "next-auth/react";

export default function JWT() {
  const { data: session, status } = useSession();

  // jwt_token
  const token = session?.token;

  return { token };
}
