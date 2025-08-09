import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ colorId: string }> },
) => {
  try {
    const { colorId } = await params;

    if (!colorId) {
      return NextResponse.json(
        {
          message: "Color id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.color.findUnique({
      where: {
        id: colorId,
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
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, colorId } = await params;

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

    if (
      !storeId ||
      !colorId ||
      storeId === "undefined" ||
      colorId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Color id"} is required`;

      return NextResponse.json(
        {
          message,
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
          message: "Invalid store id",
        },
        { status: 400 },
      );
    }

    const res = await db.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(
      {
        message: "Color updated successfully",
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, colorId } = await params;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    if (
      !storeId ||
      !colorId ||
      storeId === "undefined" ||
      colorId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Color id"} is required`;

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

    await db.color.deleteMany({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(
      {
        message: "Color deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
