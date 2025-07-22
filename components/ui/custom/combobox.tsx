"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ComboboxProps } from "@/models/components";

export default function Combobox({
  items,
  onCreate,
  onSelect,
  placeholder,
  groupHeading,
  createPrompt,
  defaultValue,
  icon,
  optionIcon,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue?.value ?? "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div className="align-center gap-2 overflow-hidden">
            {icon && icon}
            <span className="truncate">
              {value
                ? items.find((item) => item.value === value)?.label
                : placeholder}
            </span>
          </div>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search item..." className="h-9" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup heading={groupHeading}>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label.toLowerCase()}
                  onSelect={() => {
                    setValue(item.value);
                    setOpen(false);
                    if (onSelect) onSelect(item.value);
                  }}
                >
                  <div className="text-foreground flex-center gap-2">
                    {optionIcon && icon}
                    {item.label}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          {onCreate && (
            <>
              <CommandSeparator />

              <CommandList>
                <CommandItem
                  className="align-center text-foreground py-2 font-semibold"
                  onSelect={onCreate}
                >
                  <PlusCircle className="text-foreground !size-4 translate-y-[0.5px]" />
                  {createPrompt}
                </CommandItem>
              </CommandList>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
