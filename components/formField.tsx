import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { HTMLInputTypeAttribute, ReactNode } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormInputFieldProps<
  T extends FieldValues,
  K extends Path<T> = Path<T>,
> {
  control: Control<T>;
  name: K;
  input?: (field: ControllerRenderProps<T, K>) => ReactNode;
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
}
export function FormInputField<
  T extends FieldValues,
  K extends Path<T> = Path<T>,
>({
  control,
  name,
  input,
  label,
  placeholder,
  id,
  className,
  type = "text",
}: FormInputFieldProps<T, K>) {
  const generatedId = id ?? `form-field-${name.toString().replace(/\./g, "-")}`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="block w-full">
          {label && (
            <FormLabel htmlFor={generatedId} className="mb-3">
              {label}
            </FormLabel>
          )}
          <FormControl>
            {input ? (
              input(field)
            ) : (
              <Input
                id={generatedId}
                type={type}
                placeholder={placeholder}
                className={cn(className, "focus-visible:ring-1")}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage className="text-destructive mt-2" />
        </FormItem>
      )}
    />
  );
}
