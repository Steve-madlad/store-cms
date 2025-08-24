import db from "@/lib/prisma";
import SizeClient from "./components/SizeClient";
import { sizeColumn } from "./components/SizeColumns";
import { readableDateFormat } from "@/lib/utils";

export default async function sizes({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const sizes = await db.size.findMany({
    where: {
      storeId,
    },
  });

  const formattedSizes: sizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: readableDateFormat.format(size.createdAt),
  }));

  return <SizeClient sizes={formattedSizes} />;
}
