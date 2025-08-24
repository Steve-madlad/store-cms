import db from "@/lib/prisma";
import ColorClient from "./components/ColorClient";
import { colorColumn } from "./components/ColorColumns";
import { readableDateFormat } from "@/lib/utils";

export const metadata = {
  title: "Store Colors",
  description: "Manage Colorss for Your Store",
};

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

  const formattedColors: colorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: readableDateFormat.format(color.createdAt),
  }));

  return <ColorClient colors={formattedColors} />;
}
