import React, { ReactNode } from "react";
import { Input } from "./ui/input";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import ColorPicker from "./ui/colorPicker";

interface ColorPickerInputProps<
  T extends FieldValues,
  K extends Path<T> = Path<T>,
> {
  name: K;
  input?: (field: ControllerRenderProps<T, K>) => ReactNode;
  label?: string;
  placeholder?: string;
  value?: string | null;
  id?: string;
  disabled?: boolean;
  error?: FieldError;
  onChange?: (value?: string | null) => void;
}

export default function ColorPickerInput<
  T extends FieldValues,
  K extends Path<T> = Path<T>,
>({
  error,
  disabled,
  value,
  onChange,
  id,
  ...props
}: ColorPickerInputProps<T, K>) {
  const handleChange = (val: string) => {
    onChange?.(val.trim() === "" ? null : val);
  };

  return (
    <div className="flex w-full items-start gap-3">
      <Input
        {...props}
        id={id}
        disabled={disabled}
        value={value ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full"
      />

      {value && (
        <>
          <ColorPicker disabled={disabled} defaultValue={value} />
          <div
            title={value}
            className={`h-8 min-w-8 rounded-full ${
              !error && value ? "border-primary border" : "hidden"
            }`}
            style={{ backgroundColor: value }}
          />
        </>
      )}
    </div>
  );
}
