import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ sizeId: string }> },
) => {
  try {
    const { sizeId } = await params;

    if (!sizeId) {
      return NextResponse.json(
        {
          message: "Size id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.size.findUnique({
      where: {
        id: sizeId,
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
    console.log("GET Size error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string; sizeId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, sizeId } = await params;

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
      !sizeId ||
      storeId === "undefined" ||
      sizeId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Size id"} is required`;

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

    const res = await db.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(
      {
        message: "Size updated successfully",
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("PATCH Size error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string; sizeId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, sizeId } = await params;

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
      !sizeId ||
      storeId === "undefined" ||
      sizeId === "undefined"
    ) {
      console.log("sizeId in condition", sizeId);
      const message = `${!storeId ? "Store id" : "Size id"} is required`;

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

    await db.size.deleteMany({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json(
      {
        message: "Size deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("DELETE Size error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
