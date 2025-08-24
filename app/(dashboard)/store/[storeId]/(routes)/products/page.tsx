import ProductClient from "./components/ProductClient";
import db from "@/lib/prisma";
import { ProductColumn } from "./components/ProductColumns";
import { currencyFormat, readableDateFormat } from "@/lib/utils";

export const metadata = {
  title: "Store Products",
  description: "Manage Products for Your Store",
};

export default async function products({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const products = await db.product.findMany({
    where: {
      storeId,
    },
    include: {
      size: true,
      color: true,
      category: true,
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: currencyFormat.format(Number(product.price)),
    category: product.category.name,
    size: product.size.name,
    color: product.color.value,
    createdAt: readableDateFormat.format(product.createdAt),
  }));

  return <ProductClient products={formattedProducts} />;
}
