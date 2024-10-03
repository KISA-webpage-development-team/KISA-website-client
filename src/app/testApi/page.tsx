import { getIsAdmin } from "@/apis/auth/queries";
// temporary API type testing page

import { getSession } from "@/lib/next-auth/getSession";
import React from "react";
import APITester from "./APITester";

export default async function page() {
  const session = await getSession();

  const sampleEmail = "jiohin@umich.edu";

  return (
    <section>
      <APITester token={session?.token} />
    </section>
  );
}
