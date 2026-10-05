import { getIsAdmin } from "@/apis/auth/queries";
import verifyToken from "@/lib/jsonwebtoken/verifyToken";

/**
 * Guard for route handlers only admins may call. Returns null when the
 * request carries a valid session token of an admin, otherwise the error
 * response to return.
 */
export async function requireAdmin(request: Request): Promise<Response | null> {
  const header = request.headers.get("Authorization");
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
  const email = token ? verifyToken(token) : null;
  if (!email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = await getIsAdmin(email, token);
  if (!isAdmin) {
    return Response.json({ error: "Admin privileges required" }, { status: 403 });
  }
  return null;
}
