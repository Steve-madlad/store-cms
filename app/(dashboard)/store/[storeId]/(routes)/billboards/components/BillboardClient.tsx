"use client";

import AlertCardSection from "@/components/alertCardSection";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/custom/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/useOrigin";
import { AlertCardProps } from "@/models/components";
import { useRouter } from "@bprogress/next/app";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { BillboardColumn, columns } from "./BillboardColumns";
import { useEffect } from "react";

export default function BillboardClient({
  billboards,
}: {
  billboards: BillboardColumn[];
}) {
  const router = useRouter();
  const params = useParams();

  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;

  const cardData: AlertCardProps[] = [
    {
      title: "GET",
      description: `${baseUrl}/billboards`,
      loading: !origin,
      variant: "public",
    },
    {
      title: "GET",
      description: `${baseUrl}/billboards/{billboard-Id}`,
      loading: !origin,
      variant: "public",
    },
    {
      title: "POST",
      description: `${baseUrl}/billboards`,
      loading: !origin,
      variant: "admin",
    },
    {
      title: "PATCH",
      description: `${baseUrl}/billboards/{billboard-Id}`,
      loading: !origin,
      variant: "admin",
    },
    {
      title: "DELETE",
      description: `${baseUrl}/billboards/{billboard-Id}`,
      loading: !origin,
      variant: "admin",
    },
  ];

  return (
    <>
      <div className="flex-between mb-2">
        <Heading
          header={`Billboards (${billboards.length})`}
          description=" Manage Billboards for Your Store"
        />

        <Button
          icon={<Plus />}
          onClick={() => router.push(`/store/${params.storeId}/billboards/new`)}
        >
          Add New
        </Button>
      </div>

      <Separator className="bg-border h-[1px]" />

      <DataTable searchKey="label" columns={columns} data={billboards} />

      <Heading
        className="col mb-2 gap-2"
        header="API"
        description="API Calls for Billboards"
        separator
      />

      <AlertCardSection className="mb-10" cards={cardData} />
    </>
  );
}
