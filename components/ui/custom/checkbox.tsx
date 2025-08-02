import { Checkbox as CheckboxRoot } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckboxProps } from "@radix-ui/react-checkbox";

interface CustomCheckboxProps extends CheckboxProps {
  description?: string;
  label?: string;
}

export default function Checkbox({
  description,
  label,
  className,
  ...props
}: CustomCheckboxProps) {
  return (
    <Label className="hover:bg-input/30 dark:hover:bg-input/50 dark:bg-input/30 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-input/30 dark:has-[[aria-checked=true]]:border-input dark:has-[[aria-checked=true]]:bg-input/50 flex items-start gap-3 rounded-lg border p-3 shadow-xs">
      <CheckboxRoot
        {...props}
        className={cn(
          className,
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=unchecked]:bg-white dark:data-[state=checked]:border-white dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black",
        )}
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{label}</p>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Label>
  );
}
