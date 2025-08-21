import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    const body = await request.json();
    const { name, storeUrl } = body;

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        { status: 400 },
      );
    }

    const res = await db.store.create({
      data: { name: name, storeUrl, userId },
    });

    return NextResponse.json(
      {
        message: "Store created successfully",
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
}
