"use client";

import AlertCardSection from "@/components/alertCardSection";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/custom/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/useOrigin";
import { AlertCardProps } from "@/models/components";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, sizeColumn } from "./SizeColumns";

export default function SizeClient({ sizes }: { sizes: sizeColumn[] }) {
  const router = useRouter();
  const params = useParams();

  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;

  const cardData: AlertCardProps[] = [
    {
      title: "GET",
      description: `${baseUrl}/sizes`,
      loading: !origin,
      variant: "public",
    },
    {
      title: "GET",
      description: `${baseUrl}/sizes/{size-Id}`,
      loading: !origin,
      variant: "public",
    },
    {
      title: "POST",
      description: `${baseUrl}/sizes`,
      loading: !origin,
      variant: "admin",
    },
    {
      title: "PATCH",
      description: `${baseUrl}/sizes/{size-Id}`,
      loading: !origin,
      variant: "admin",
    },
    {
      title: "DELETE",
      description: `${baseUrl}/sizes/{size-Id}`,
      loading: !origin,
      variant: "admin",
    },
  ];

  return (
    <>
      <div className="flex-between mb-2">
        <Heading
          header={`Sizes (${sizes.length})`}
          description=" Manage Sizes for Your Store"
        />

        <Button
          icon={<Plus />}
          onClick={() => router.push(`/store/${params.storeId}/sizes/new`)}
        >
          Add New
        </Button>
      </div>

      <Separator className="bg-border h-[1px]" />

      <DataTable searchKey="name" columns={columns} data={sizes} />

      <Heading
        className="col mb-2 gap-2"
        header="API"
        description="API Calls for Sizes"
        separator
      />

      <AlertCardSection className="mb-10" cards={cardData} />
    </>
  );
}
