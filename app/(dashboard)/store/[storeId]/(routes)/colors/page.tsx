import db from "@/lib/prisma";
import ColorClient from "./components/ColorClient";
import { colorColumn } from "./components/ColorColumns";

export default async function colors({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const colors = await db.color.findMany({
    where: {
      storeId,
    },
  });

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedColors: colorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: new Date(color.createdAt).toLocaleString("en-US", formatOptions),
  }));

  return (
    <div>
      <ColorClient colors={formattedColors} />
    </div>
  );
}
