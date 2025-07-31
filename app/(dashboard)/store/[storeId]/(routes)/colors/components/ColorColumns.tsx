"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColorActionCell from "./ColorActionCell";

export type colorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<colorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const color = row.original.value;
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
    cell: ({ row }) => <ColorActionCell data={row.original} />,
  },
];
