import db from "@/lib/prisma";
import React from "react";
import BillboardForm from "./components/BillboardForm";

export default async function page({
  params,
}: {
  params: Promise<{ billboardId: string }>;
}) {
  const { billboardId } = await params;

  const response = await db.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return <BillboardForm initialData={response} />;
}
