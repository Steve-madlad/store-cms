import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import type { HTMLInputTypeAttribute, ReactNode } from "react";

interface FormInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  input?: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
  label?: string;
  placeholder?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
}

export function FormInputField<T extends FieldValues>({
  control,
  name,
  input,
  label,
  placeholder,
  className,
  type = "text",
}: FormInputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {input ? (
              input(field)
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                className={cn(className, "focus-visible:ring-1")}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
}
