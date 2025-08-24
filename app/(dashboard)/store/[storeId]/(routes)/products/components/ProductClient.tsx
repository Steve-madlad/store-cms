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
import { ProductColumn, columns } from "./ProductColumns";

export default function ProductClient({
  products,
}: {
  products: ProductColumn[];
}) {
  const router = useRouter();
  const params = useParams();

  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;

  const cardData: AlertCardProps[] = [
    {
      title: "GET",
      description: `${baseUrl}/products`,
      loading: !origin,
      variant: "public",
    },
    {
      title: "GET",
      description: `${baseUrl}/products/{product-Id}`,
      loading: !origin,
      variant: "public",
    },
    {
      title: "POST",
      description: `${baseUrl}/products`,
      loading: !origin,
      variant: "admin",
    },
    {
      title: "PATCH",
      description: `${baseUrl}/products/{product-Id}`,
      loading: !origin,
      variant: "admin",
    },
    {
      title: "DELETE",
      description: `${baseUrl}/products/{product-Id}`,
      loading: !origin,
      variant: "admin",
    },
  ];

  return (
    <>
      <div className="flex-between mb-2">
        <Heading
          header={`Products (${products.length})`}
          description=" Manage Products for Your Store"
        />

        <Button
          icon={<Plus />}
          onClick={() => router.push(`/store/${params.storeId}/products/new`)}
        >
          Add New
        </Button>
      </div>

      <Separator className="bg-border h-[1px]" />

      <DataTable searchKey="name" columns={columns} data={products} />

      <Heading
        className="col mb-2 gap-2"
        header="API"
        description="API Calls for Products"
        separator
      />

      <AlertCardSection className="mb-10" cards={cardData} />
    </>
  );
}
