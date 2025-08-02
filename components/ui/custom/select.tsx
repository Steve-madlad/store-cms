import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Options } from "@/models/components";
import { SelectProps } from "@radix-ui/react-select";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type AriaAttributes } from "react";
import { Button } from "./button";

interface SelectDropdownProps extends SelectProps, AriaAttributes {
  selectTrigger: string;
  selectLabel?: string;
  createLabel?: string;
  createUrl?: string;
  options: Options[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  id?: string;
  className?: string;
}

export function SelectDropdown({
  selectTrigger,
  selectLabel,
  createLabel,
  createUrl,
  options,
  value,
  onChange,
  error,
  id,
  className,
  ...props
}: SelectDropdownProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleCreateClick = () => {
    setOpen(false);
    router.push(createUrl!);
  };

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={onChange}
      value={value}
      {...props}
    >
      <SelectTrigger
        id={id}
        className={cn(
          `w-full ${error || (props["aria-invalid"] && "!border-destructive focus:ring-destructive/25 focus-visible:ring-destructive/25 focus-visible:ring-1")}`,
          className,
        )}
      >
        <SelectValue placeholder={selectTrigger} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {(selectLabel || !options?.length) && (
            <SelectLabel>
              {options?.length ? selectLabel : "No options available"}
            </SelectLabel>
          )}

          {options &&
            (!options.length && createUrl ? (
              <Button
                onClick={handleCreateClick}
                className="just-start w-full items-center py-0"
              >
                <PlusCircle />
                {createLabel}
              </Button>
            ) : (
              options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
