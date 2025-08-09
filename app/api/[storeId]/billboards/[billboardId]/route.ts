import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ billboardId: string }> },
) => {
  try {
    const { billboardId } = await params;

    if (!billboardId) {
      return NextResponse.json(
        {
          message: "Billboard id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.billboard.findUnique({
      where: {
        id: billboardId,
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
  { params }: { params: Promise<{ storeId: string; billboardId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, billboardId } = await params;

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

    if (
      !storeId ||
      !billboardId ||
      storeId === "undefined" ||
      billboardId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Billboard id"} is required`;

      return NextResponse.json(
        {
          message,
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
          message: "Invalid store id",
        },
        { status: 400 },
      );
    }

    const res = await db.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        message: "Billboard updated successfully",
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
  { params }: { params: Promise<{ storeId: string; billboardId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, billboardId } = await params;

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
      !billboardId ||
      storeId === "undefined" ||
      billboardId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Billboard id"} is required`;

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

    await db.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(
      {
        message: "Billboard deleted successfully",
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
