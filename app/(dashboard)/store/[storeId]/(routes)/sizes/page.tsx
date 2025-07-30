import db from "@/lib/prisma";
import SizeClient from "./components/SizeClient";
import { sizeColumn } from "./components/SizeColumns";

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

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedSizes: sizeColumn[] = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
    createdAt: new Date(size.createdAt).toLocaleString("en-US", formatOptions),
  }));

  return (
    <div>
      <SizeClient sizes={formattedSizes} />
    </div>
  );
}
