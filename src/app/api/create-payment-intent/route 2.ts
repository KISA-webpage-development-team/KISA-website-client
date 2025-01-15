import { STRIPE_SECRET_KEY } from "@/constants/env";
import { NextRequest, NextResponse } from "next/server";

// route only happens on the server, so it's safe to expose the secret key here
import Stripe from "stripe";
const stripe = new Stripe(STRIPE_SECRET_KEY as string);

// this route creates a payment intent with a given amount and returns the client secret
// client secret is from new paymentIntent object
export async function POST(request: NextRequest) {
  try {
    const { amount, customer } = await request.json();

    let stripeCustomer;

    // Check if a customer exists, or create a new one.
    const existingCustomer = await stripe.customers.list({
      email: customer.email,
      limit: 1,
    });

    if (existingCustomer.data.length === 0) {
      // Create a new customer if none exists
      stripeCustomer = await stripe.customers.create({
        email: customer.email,
        name: customer.name, // Pass the name when creating the customer
      });
    } else {
      stripeCustomer = existingCustomer.data[0];

      // Optionally update the customer's name if it's missing or outdated
      if (stripeCustomer.name !== customer.name) {
        await stripe.customers.update(stripeCustomer.id, {
          name: customer.name,
        });
      }
    }
    const paymentIntent = await stripe.paymentIntents.create({
      customer: stripeCustomer.id,
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true }, // this option automatically checks user's possible payment methods
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Internal Server Error", error);

    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

// this route updates a payment intent with a given amount of tip and returns the updated client secret
// client secret is from updated paymentIntent object
export async function PUT(request: NextRequest) {
  try {
    const { id, tip } = await request.json();

    const paymentIntent = await stripe.paymentIntents.update(id, {
      metadata: { tip: tip },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Server Error", error);

    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
