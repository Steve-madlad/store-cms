"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerSelection,
  ColorPicker as Picker,
} from "@/components/ui/shadcn-io/color-picker";
import { Pipette } from "lucide-react";

export default function ColorPicker({
  className,
  disabled,
  defaultValue,
}: {
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
}) {
  const match = defaultValue?.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

  return (
    <Popover>
      <PopoverTrigger asChild className={className}>
        <Button disabled={disabled} variant="outline">
          <Pipette />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="aspect-square !w-80 border-0 bg-transparent p-0 shadow-none md:!w-90">
        <Picker
          defaultValue={defaultValue && match ? defaultValue : "#FFF"}
          className="bg-background max-w-sm rounded-md border p-4 shadow-sm"
        >
          <ColorPickerSelection />
          <div className="flex items-center gap-4">
            <ColorPickerEyeDropper />
            <div className="grid w-full gap-1">
              <ColorPickerHue />
              <ColorPickerAlpha />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* <ColorPickerOutput /> */}
            <ColorPickerFormat />
          </div>
        </Picker>
      </PopoverContent>
    </Popover>
  );
}
