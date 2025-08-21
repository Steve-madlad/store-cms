import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string }> },
) => {
  try {
    const { storeId } = await params;
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!storeId) {
      return NextResponse.json(
        {
          message: "Store id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.product.findMany({
      where: {
        storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
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

    const {
      name,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isArchived,
      isFeatured,
    } = body;

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

    const requiredFields = [
      { field: name, name: "Name" },
      { field: images, name: "Image" },
      { field: price, name: "Price" },
      { field: categoryId, name: "Category" },
      { field: colorId, name: "Color" },
      { field: sizeId, name: "Size" },
    ];

    const missingField = requiredFields.find(({ field }) => {
      if (Array.isArray(field)) return field.length === 0;
      return !field;
    });

    if (missingField) {
      const message = `${missingField.name} is required`;
      return NextResponse.json({ message }, { status: 400 });
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

    const res = await db.product.create({
      data: {
        name,
        images: {
          createMany: { data: [...images] },
        },
        price,
        categoryId,
        colorId,
        sizeId,
        isArchived,
        isFeatured,
        storeId,
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
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
