import db from "@/lib/prisma";
import SizeForm from "./components/SizeForm";

export default async function page({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) {
  const { sizeId } = await params;

  const response = await db.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <div>
      <SizeForm initialData={response} />
    </div>
  );
}
