import BillboardClient from "./components/BillboardClient";
import db from "@/lib/prisma";
import { BillboardColumn } from "./components/BillboardColumns";
import { readableDateFormat } from "@/lib/utils";

export const metadata = {
  title: "Store Billboard",
  description: "Manage Billboards for Your Store",
};

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

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      labelColor: billboard.labelColor,
      showLabel: billboard.showLabel,
      createdAt: readableDateFormat.format(billboard.createdAt),
    }),
  );

  return <BillboardClient billboards={formattedBillboards} />;
}
