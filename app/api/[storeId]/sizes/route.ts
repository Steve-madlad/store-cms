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

    const res = await db.size.findMany({
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
    console.log("GET Store Size error", error);
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

    const { name, value } = body;

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

    if (!name || !value) {
      const message = `${!name ? "Name" : "Value"} is required`;

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

    const res = await db.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(
      {
        message: "Size created successfully",
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("GET Size error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
