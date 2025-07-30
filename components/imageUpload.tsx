"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/custom/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  error: boolean;
}

interface resultProps {
  info: {
    secure_url: string;
  };
}
export default function ImageUpload({
  disabled = false,
  onChange,
  onRemove,
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

              <Image fill alt="billboard" src={url} />
            </div>
          ))}
        </div>
      )}

      <CldUploadWidget onSuccess={onUpload} uploadPreset="cms-store">
        {({ open }) => {
          return (
            <Button
              variant={error ? "outline" : "ghost"}
              icon={<ImagePlus />}
              isLoading={!open}
              onClick={() => open()}
              className={`${error && "!border-destructive"} focus-visible:ring-1 ${!value.length && "!text-muted-foreground"} border-input border text-sm font-normal focus:ring-[1px]`}
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
