"use client";

import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";

import ColorPickerInput from "@/components/colorPickerInput";
import { FormInputField as FormField } from "@/components/formField";
import Heading from "@/components/heading";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Color } from "@prisma/client";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
import { useModalStore } from "@/hooks/useModalStore";

interface ColorFormProps {
  initialData: Color | null;
}

export default function ColorForm({ initialData }: ColorFormProps) {
  const [loading, setLoading] = useState(false);
  const { isLoading, loadingStart, loadingEnd, openModal, onClose } =
    useModalStore();

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Color" : "Create color";
  const description = initialData ? "Edit Color" : "Add a new color";
  const toastMessage = initialData ? "Color updated" : "Color created";
  const action = initialData ? "Save Changes" : "Create color";

  const formSchema = zod.object({
    name: zod.string().trim().min(1, "Name is required"),
    value: zod
      .string()
      .trim()
      .min(1, "Value is required")
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: "Value must be a valid hex code",
      }),
  });

  type ColorFormValues = zod.infer<typeof formSchema>;

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const handleDelete = async () => {
    loadingStart();
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/colors/${params.colorId}`,
      );

      if (res.status === 200) {
        toast.success("Color Deleted.");
        router.refresh();
        router.push(`/store/${params.storeId}/colors`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error?.status;
        toast.error(
          status === 405
            ? "Method not allowed"
            : status === 404
              ? "Endpoint not found"
              : error.response?.data?.message,
        );
      }
    } finally {
      loadingEnd();
      onClose();
    }
  };

  const onSubmit = async (values: ColorFormValues) => {
    setLoading(true);

    try {
      let res;
      if (initialData)
        res = await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          values,
        );
      else res = await axios.post(`/api/${params.storeId}/colors`, values);

      if (res.status === 200) {
        toast.success(toastMessage);
        router.refresh();
        router.push(`/store/${params.storeId}/colors`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error?.status;
        toast.error(
          status === 405
            ? "Method not allowed"
            : status === 404
              ? "Endpoint not found"
              : error.response?.data?.message,
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex-between mb-2">
        <Heading header={title} description={description} />

        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => openModal("confirmation", handleDelete)}
          >
            {loading || isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash />
            )}
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 w-full space-y-4"
        >
          <div className="grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              label="Name"
              disabled={loading || isLoading}
              placeholder="Color Name"
            />

            <FormField
              control={form.control}
              name="value"
              label="Hex Value"
              id="value"
              disabled={loading || isLoading}
              input={(field) => (
                <ColorPickerInput
                  {...field}
                  value={field.value ? field.value : undefined}
                  id={"value"}
                  disabled={loading || isLoading}
                  placeholder="Color Value"
                  error={form.formState.errors.value}
                />
              )}
            />
          </div>

          <Button
            isLoading={loading || isLoading}
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
