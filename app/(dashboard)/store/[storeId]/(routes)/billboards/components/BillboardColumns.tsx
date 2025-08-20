"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardActionCell from "./BillboardActionCell";

export type BillboardColumn = {
  id: string;
  label: string;
  labelColor: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "labelColor",
    header: "Label Color",
    cell: ({ row }) => {
      const color = row.original.labelColor;

      return (
        <div className="flex items-center gap-x-2">
          <div>{color}</div>
          <div
            className="border-primary size-6 rounded-full border"
            style={{ backgroundColor: color }}
          />
        </div>
      );
    },
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
