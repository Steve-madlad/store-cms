"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardActionCell from "./BillboardActionCell";
import { CircleCheck, CircleX } from "lucide-react";

export type BillboardColumn = {
  id: string;
  label: string;
  labelColor: string | null;
  showLabel: boolean;
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
          {color && (
            <div
              className="border-primary size-6 rounded-full border"
              style={{ backgroundColor: color }}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "showLabel",
    header: "Label Shown",
    cell: ({ row }) => {
      const showLabel = row.original.showLabel;

      return (
        <div className="pl-6">
          {showLabel ? <CircleCheck color="green" /> : <CircleX color="red" />}
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
