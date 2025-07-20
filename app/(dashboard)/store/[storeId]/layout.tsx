import Navbar from "@/components/navbar";
import TempCodeBlock from "@/components/tempCodeBlock";
import { Button } from "@/components/ui/custom/button";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Clipboard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function dashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const response = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  console.log("response for id param", response);

  if (!response) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="px-6 py-4">
        <TempCodeBlock response={response} />
        {children}
      </div>
    </>
  );
}
