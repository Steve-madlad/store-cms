import CategoryClient from "./components/CategoryClient";
import db from "@/lib/prisma";
import { CategoryColumn } from "./components/CategoryColumns";
import { readableDateFormat } from "@/lib/utils";

export const metadata = {
  title: "Store Categories",
  description: "Manage Categoriess for Your Store",
};

export default async function categories({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const categories = await db.category.findMany({
    where: {
      storeId,
    },
    include: { billboard: true },
  });

  const formattedcategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: readableDateFormat.format(category.createdAt),
  }));

  return <CategoryClient categories={formattedcategories} />;
}
