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
  value?: string;
  id?: string;
  disabled?: boolean;
  error?: FieldError;
  // className?: string;
}

export default function ColorPickerInput<
  T extends FieldValues,
  K extends Path<T> = Path<T>,
>({ error, disabled, ...props }: ColorPickerInputProps<T, K>) {
  return (
    <div className="flex w-full items-start gap-3">
      <Input
        {...props}
        disabled={disabled}
        id={props.id}
        value={props.value?.toUpperCase()}
        className="w-full"
      />
      <ColorPicker disabled={disabled} defaultValue={props.value} />

      <div
        title={props.value}
        className={`h-8 min-w-8 rounded-full ${!error && props.value ? "border-primary border" : "hidden"}`}
        style={{ backgroundColor: props.value }}
      />
    </div>
  );
}
