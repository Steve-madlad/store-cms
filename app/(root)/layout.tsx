import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const response = await db.store.findFirst({
    where: {
      userId,
    },
  });

  if (response) {
    redirect(`/store/${response.id}`);
  }

  return <>{children}</>;
}
