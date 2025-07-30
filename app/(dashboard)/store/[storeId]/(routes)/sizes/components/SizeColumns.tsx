"use client";

import { ColumnDef } from "@tanstack/react-table";
import SizeActionCell from "./SizeActionCell";

export type sizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<sizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    cell: ({ row }) => <SizeActionCell data={row.original} />,
  },
];
