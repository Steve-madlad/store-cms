import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settingsForm";

export const metadata = {
  title: "Store Settings",
  description: "Manage Settings for Your Store",
};

export default async function page({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { storeId } = await params;

  if (!storeId) {
    redirect("/");
  }

  const response = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!response) {
    redirect("/");
  }

  return <SettingsForm initialData={response} />;
}
