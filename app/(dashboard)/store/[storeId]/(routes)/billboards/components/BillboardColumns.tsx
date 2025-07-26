"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardActionCell from "./BillboardActionCell";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    cell: ({ row }) => <BillboardActionCell data={row.original} />,
  },
];
