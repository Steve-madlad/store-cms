"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownOptionsProps } from "@/models/components";
import { EllipsisVertical, Trash2 } from "lucide-react";

interface DropdownProps {
  label?: string;
  trigger?: React.ReactNode;
  options: DropdownOptionsProps[];
  onDelete?: () => void;
}

export default function Dropdown({
  label,
  options,
  trigger,
  onDelete,
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor py-1">
        {trigger ?? <EllipsisVertical size={15} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {options.map((option, index) => (
          <DropdownMenuItem
            className="cursor flex gap-3"
            key={index}
            onClick={option.action}
          >
            {option.icon && (
              <option.icon className="stroke-foreground size-4" />
            )}
            {option.label}
          </DropdownMenuItem>
        ))}

        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="group cursor flex gap-3 dark:hover:text-white"
              onClick={onDelete}
              variant="destructive"
            >
              <Trash2 className="dark:group-hover:!stroke-white" /> Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
