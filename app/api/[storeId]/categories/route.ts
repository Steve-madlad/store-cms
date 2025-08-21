import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string }> },
) => {
  try {
    const { storeId } = await params;

    if (!storeId) {
      return NextResponse.json(
        {
          message: "Store id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.category.findMany({
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
    console.error(error);
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

    const body = await request.json();

    const { name, billboardId } = body;

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

    if (!name || !billboardId) {
      const message = `${!name ? "Name" : "Billboard Id"} is required`;

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

    const res = await db.category.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
