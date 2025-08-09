import Navbar from "@/components/navbar";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function dashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ storeId: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { storeId } = await params;

  const response = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!response) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="flex-col gap-6 px-6 py-4">{children}</div>
    </>
  );
}
