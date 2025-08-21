import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) => {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        {
          message: "Billboard id is required",
        },
        { status: 400 },
      );
    }

    const res = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    if (!res) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }

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

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string; productId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, productId } = await params;

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

    if (
      !storeId ||
      !productId ||
      storeId === "undefined" ||
      productId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Product id"} is required`;

      return NextResponse.json(
        {
          message,
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
          message: "Invalid store id",
        },
        { status: 400 },
      );
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        images: {
          deleteMany: {},
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

    const res = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
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
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ storeId: string; productId: string }> },
) => {
  try {
    const { userId } = await auth();
    const { storeId, productId } = await params;

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
      !productId ||
      storeId === "undefined" ||
      productId === "undefined"
    ) {
      const message = `${!storeId ? "Store id" : "Product id"} is required`;

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

    await db.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(
      {
        message: "Product deleted successfully",
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
