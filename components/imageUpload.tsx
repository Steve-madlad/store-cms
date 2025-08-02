"use client";

import { cn } from "@/lib/utils";
import { ImagePlus, Trash } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/custom/button";

interface ImageUploadProps {
  className?: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  id?: string;
  value: string[];
  error: boolean;
}

interface resultProps {
  info: {
    secure_url: string;
  };
}

export default function ImageUpload({
  className,
  disabled = false,
  onChange,
  onRemove,
  id,
  value,
  error,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onUpload = (results: CloudinaryUploadWidgetResults) => {
    const typedResults = results as resultProps;
    onChange(typedResults.info.secure_url);
  };

  return (
    <div>
      {value.length > 0 && (
        <div className="align-center mb-4 gap-4">
          {value.map((url) => (
            <div
              key={url}
              className="relative size-[200px] overflow-hidden rounded-md"
            >
              <div className="absolute top-2 right-2 z-10">
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => onRemove(url)}
                  size={"icon"}
                >
                  <Trash />
                </Button>
              </div>

              <Image
                fill
                className="object-cover"
                alt="Uploaded image"
                src={url}
              />
            </div>
          ))}
        </div>
      )}

      <CldUploadWidget onSuccess={onUpload} uploadPreset="cms-store">
        {({ open }) => {
          return (
            <Button
              id={id}
              variant={error ? "outline" : "ghost"}
              icon={<ImagePlus />}
              isLoading={!open}
              onClick={() => open()}
              className={cn(
                className,
                `${error && "!border-destructive focus:ring-destructive/20 focus-visible:ring-destructive/20"} dark:bg-input/30 shadow-xs focus-visible:ring-1 ${!value.length && "!text-muted-foreground"} just-start border-input w-[32%] border text-sm font-normal focus:ring-[1px]`,
              )}
              type="button"
              disabled={disabled}
            >
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
