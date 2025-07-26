"use client";

import { Button } from "@/components/ui/custom/button";
import { H2 } from "@/components/ui/Typography/heading2";
import { P } from "@/components/ui/Typography/paragraph";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./BillboardColumns";
import { DataTable } from "@/components/ui/data-table";

export default function BillboardClient({
  billboards,
}: {
  billboards: BillboardColumn[];
}) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex-between mb-2">
        <div>
          <H2>Billboards ({billboards.length})</H2>
          <P className="text-muted-foreground">
            Manage Billboards for Your Store
          </P>
        </div>

        <Button
          icon={<Plus />}
          onClick={() => router.push(`/store/${params.storeId}/billboards/new`)}
        >
          Add New
        </Button>
      </div>

      <Separator className="bg-border h-[1px]" />

      <DataTable searchKey="label" columns={columns} data={billboards} />
    </>
  );
}
