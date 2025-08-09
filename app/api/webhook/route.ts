import db from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: `Webhook error ${message}` },
      { status: 400 },
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  const addressFields = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressFields.filter(Boolean).join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await db.order.update({
      where: {
        id: session.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session.customer_details?.phone ?? "",
      },
      include: {
        orderItems: true,
      },
    });

    const orderedItems = order.orderItems.map((item) => item.productId);

    await db.product.updateMany({
      where: {
        id: {
          in: [...orderedItems],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }

  return NextResponse.json(null, { status: 200 });
}
