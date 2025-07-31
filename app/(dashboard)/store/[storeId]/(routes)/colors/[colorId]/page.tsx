import db from "@/lib/prisma";
import ColorForm from "./components/ColorForm";

export default async function page({
  params,
}: {
  params: Promise<{ colorId: string }>;
}) {
  const { colorId } = await params;

  const response = await db.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div>
      <ColorForm initialData={response} />
    </div>
  );
}
