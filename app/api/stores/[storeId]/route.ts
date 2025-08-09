import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ storeId: string }> },
// ) {
//   const { storeId } = await params;

//   const store = await db.store.findFirst({
//     where: {
//       id: storeId,
//       userId: "user_3002Cz1xV9MUmaaq6Zl1BtREz0I",
//     },
//   });

//   return NextResponse.json(
//     {
//       data: store,
//     },
//     { status: 201 },
//   );
// }

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ storeId: string }> },
) {
  try {
    const { userId } = await auth();
    const { storeId } = await params;

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

    if (!name || !storeId) {
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
        id: storeId,
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
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ storeId: string }> },
) {
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

    await db.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Store Deleted successfully",
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
}
