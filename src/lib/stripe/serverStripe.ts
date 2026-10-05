import { STRIPE_SECRET_KEY } from "@/constants/env";
import Stripe from "stripe";

export function getServerStripe() {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(STRIPE_SECRET_KEY);
}
