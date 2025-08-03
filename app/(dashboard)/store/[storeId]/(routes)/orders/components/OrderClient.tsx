"use client";

import Heading from "@/components/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./OrderColumns";

export default function OrderClient({ orders }: { orders: OrderColumn[] }) {
  return (
    <>
      <div className="flex-between mb-2">
        <Heading
          header={`Orders (${orders.length})`}
          description="View Orders for Your Store"
        />
      </div>

      <Separator className="bg-border h-[1px]" />

      <DataTable searchKey="products" columns={columns} data={orders} />
    </>
  );
}
