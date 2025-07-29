import db from "@/lib/prisma";
import React from "react";
import CategoryForm from "./components/CategoryForm";

export default async function page({
  params,
}: {
  params: Promise<{ storeId: string; categoryId: string }>;
}) {
  const { categoryId, storeId } = await params;

  const response = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div>
      <CategoryForm billboards={billboards} initialData={response} />
    </div>
  );
}
