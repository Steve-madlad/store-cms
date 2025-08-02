import db from "@/lib/prisma";
import React from "react";
import ProductForm from "./components/ProductForm";

export default async function page({
  params,
}: {
  params: Promise<{ storeId: string; productId: string }>;
}) {
  const { storeId, productId } = await params;

  const products = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await db.category.findMany({ where: { storeId } });
  const colors = await db.color.findMany({ where: { storeId } });
  const sizes = await db.size.findMany({ where: { storeId } });

  const formattedProducts = products
    ? { ...products, price: products.price.toNumber() }
    : null;

  return (
    <div>
      <ProductForm
        initialData={formattedProducts}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
}
