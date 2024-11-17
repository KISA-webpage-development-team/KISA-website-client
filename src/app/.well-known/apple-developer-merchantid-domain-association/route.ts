import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { NextRequest } from "next/server";
import CIDR from "ip-cidr";

// List of allowed IP ranges in CIDR notation
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
  "35.2.210.142",
];

function isAllowedIP(clientIP: string): boolean {
  return ALLOWED_IPS.some((cidr) => {
    const range = new CIDR(cidr);
    return range.contains(clientIP);
  });
}

export async function GET(req: NextRequest) {
  const clientIP = req.headers.get("x-forwarded-for") || req.ip || "";

  if (!isAllowedIP(clientIP)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "public/apple-developer-merchantid-domain-association"
    );
    const fileContent = readFileSync(filePath, "utf-8");

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new NextResponse("Not Found", { status: 404 });
  }
}
