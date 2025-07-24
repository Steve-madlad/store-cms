import React from "react";
import BillboardClient from "./components/BillboardClient";
import axios from "axios";
import db from "@/lib/prisma";

export default async function billboards({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const billboards = await db.billboard.findMany({
    where: {
      storeId,
    },
  });
  return (
    <div>
      <BillboardClient billboards={billboards} />
    </div>
  );
}
