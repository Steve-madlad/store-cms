import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ categoryId: string }> },
) => {
  try {
    const { categoryId } = await params;

    if (!categoryId) {
      return NextResponse.json(
        {
          message: "Category id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
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
    console.log("GET Category error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string; categoryId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, categoryId } = await params;

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

    if (
      !storeId ||
      !categoryId ||
      storeId === "undefined" ||
      categoryId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Category id"} is required`;

      return NextResponse.json(
        {
          message,
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
          message: "Invalid store id",
        },
        { status: 400 },
      );
    }

    const res = await db.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(
      {
        message: "Category updated successfully",
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("PATCH Category error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string; categoryId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, categoryId } = await params;

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
      !categoryId ||
      storeId === "undefined" ||
      categoryId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Category id"} is required`;

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

    await db.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(
      {
        message: "Category deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("DELETE Category error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
