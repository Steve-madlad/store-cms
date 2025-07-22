import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = await auth();

    const body = await request.json();
    const { name } = body;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    if (!name || !params.storeId) {
      const message = `${!name ? "Name" : "Store id"} is required`;

      return NextResponse.json(
        {
          message,
        },
        { status: 400 },
      );
    }

    const res = await db.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: { name },
    });

    return NextResponse.json(
      {
        message: "Store Updated successfully",
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("PATCH STORE error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    if (!params.storeId) {
      return NextResponse.json(
        {
          message: "Store id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Store Deleted successfully",
        data: res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("DELETE STORE error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
