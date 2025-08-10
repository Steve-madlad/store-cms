import db from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ storeId: string }> },
) {
  try {
    const body = await request.json();

    const { productIds } = body;
    const { storeId } = await params;

    if (!productIds || !productIds.length) {
      return NextResponse.json(
        {
          message: "Products ids are required",
        },
        { status: 400 },
      );
    }

    const products = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price.toNumber() * 100,
        },
      });
    });

    const order = await db.order.create({
      data: {
        storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      {
        data: { url: session.url },
      },
      { headers: corsHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
