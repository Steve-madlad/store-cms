import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    if (!storeId) {
      return NextResponse.json(
        {
          message: "Store id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.billboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(
      {
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("GET Store Billboards error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const POST = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId } = await params;

    console.log("store id", storeId);

    const body = await request.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    if (!storeId) {
      return NextResponse.json(
        {
          message: "Store id s required",
        },
        { status: 400 },
      );
    }

    if (!label || !imageUrl) {
      const message = `${!label ? "Label" : "Image URL"} is required`;

      return NextResponse.json(
        {
          message,
        },
        { status: 400 },
      );
    }

    const storeIdExists = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeIdExists) {
      return NextResponse.json(
        {
          message: "Invalid Store id",
        },
        { status: 400 },
      );
    }

    const res = await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });

    return NextResponse.json(
      {
        message: "Billboard created successfully",
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("GET Billboard error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
