import CategoryClient from "./components/CategoryClient";
import db from "@/lib/prisma";
import { CategoryColumn } from "./components/CategoryColumns";

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

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedcategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: new Date(category.createdAt).toLocaleString(
      "en-US",
      formatOptions,
    ),
  }));

  return <CategoryClient categories={formattedcategories} />;
}
