import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import path from "path";
import IPCIDR from "ip-cidr";

// Array of allowed CIDR ranges
const ALLOWED_IPS = [
  "17.32.139.128/27",
  "17.32.139.160/27",
  "17.140.126.0/27",
  "17.140.126.32/27",
  "17.179.144.128/27",
  "17.179.144.160/27",
  "17.179.144.192/27",
  "17.179.144.224/27",
  "17.253.0.0/16",
];

// Function to check if IP is in allowed ranges
function isIpAllowed(ip: string): boolean {
  return ALLOWED_IPS.some((cidr) => {
    try {
      const cidrRange = new IPCIDR(cidr);
      return cidrRange.contains(ip);
    } catch {
      return false;
    }
  });
}

// Function to get client IP from various headers
function getClientIp(headersList: Headers): string {
  // Check X-Forwarded-For header first (common for proxied requests)
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  // Check X-Real-IP header (used by some proxies)
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fall back to Remote-Addr header
  const remoteAddr = headersList.get("remote-addr");
  if (remoteAddr) {
    return remoteAddr;
  }

  return "0.0.0.0"; // Default fallback
}

export async function GET() {
  try {
    // Get headers
    const headersList = headers();

    // Get client IP
    const clientIp = getClientIp(headersList);

    // Check if IP is allowed
    if (!isIpAllowed(clientIp)) {
      return new NextResponse("Forbidden", {
        status: 403,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }

    // If IP is allowed, proceed with the original functionality
    const filePath = path.join(
      process.cwd(),
      "public/apple-developer-merchantid-domain-association"
    );
    const fileContent = readFileSync(filePath, "utf-8");

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*", // Fixed header name from "Allow-Origin" to standard "Access-Control-Allow-Origin"
      },
    });
  } catch (error) {
    return new NextResponse("Not Found", { status: 404 });
  }
}
