import BillboardClient from "./components/BillboardClient";
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

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedBillboards = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: new Date(billboard.createdAt).toLocaleString(
      "en-US",
      formatOptions,
    ),
  }));

  return (
    <div>
      <BillboardClient billboards={formattedBillboards} />
    </div>
  );
}
