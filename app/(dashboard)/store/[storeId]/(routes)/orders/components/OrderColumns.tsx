"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  store: string;
  products: string;
  itemCount: number;
  price: string;
  isPaid: boolean;
  phone: string;
  address: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "itemCount",
    header: "Total items",
  },
  {
    accessorKey: "price",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Payment Status",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];
