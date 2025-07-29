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

interface SelectDropdownProps extends SelectProps {
  selectTrigger: string;
  selectLabel?: string;
  options?: Options[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

export function SelectDropdown({
  selectTrigger,
  selectLabel,
  options,
  value,
  onChange,
  error,
  className,
}: SelectDropdownProps) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        className={cn(
          `w-[180px] ${error && "!border-destructive focus:ring-destructive/25 focus-visible:ring-destructive/25"}`,
          className,
        )}
      >
        <SelectValue placeholder={selectTrigger} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
          {options &&
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
