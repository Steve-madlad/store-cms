"use client";

import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";

import ColorPickerInput from "@/components/colorPickerInput";
import { FormInputField as FormField } from "@/components/formField";
import Heading from "@/components/heading";
import ImageUpload from "@/components/imageUpload";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Billboard } from "@prisma/client";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
import { useModalStore } from "@/hooks/useModalStore";
import Checkbox from "@/components/ui/custom/checkbox";

interface BillboardFormProps {
  initialData: Billboard | null;
}

export default function BillboardForm({ initialData }: BillboardFormProps) {
  const [loading, setLoading] = useState(false);
  const { isLoading, loadingStart, loadingEnd, openModal, onClose } =
    useModalStore();

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData ? "Edit Billboard" : "Add a new billboard";
  const toastMessage = initialData ? "Billboard updated" : "Billboard created";
  const action = initialData ? "Save Changes" : "Create Billboard";

  const formSchema = zod.object({
    label: zod.string().trim().min(1, "Label is required"),
    showLabel: zod.boolean(),
    labelColor: zod
      .string()
      .trim()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Not a valid Hex Color")
      .optional(),
    imageUrl: zod.string().min(1, "Image URL is required"),
  });

  type BillboardFormValues = zod.infer<typeof formSchema>;

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      labelColor: undefined,
      showLabel: false,
      imageUrl: "",
    },
  });

  const { formState } = form;

  const handleDelete = async () => {
    loadingStart();
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`,
      );

      if (res.status === 200) {
        toast.success("Billboard Deleted.");
        router.refresh();
        router.push(`/store/${params.storeId}/billboards`);
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

  const onSubmit = async (values: BillboardFormValues) => {
    setLoading(true);

    try {
      let res;
      if (initialData)
        res = await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          values,
        );
      else res = await axios.post(`/api/${params.storeId}/billboards`, values);

      if (res.status === 200) {
        toast.success(toastMessage);
        router.refresh();
        router.push(`/store/${params.storeId}/billboards`);
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
          <div className="mb-5">
            <FormField
              control={form.control}
              name="imageUrl"
              id="imageUrl"
              input={(field) => (
                <ImageUpload
                  disabled={loading || isLoading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  id="imageUrl"
                  value={field.value ? [field.value] : []}
                  error={!!formState.errors.imageUrl}
                  className="!w-full transition-none sm:!w-[47.5%] sm:max-w-92"
                />
              )}
              label="Image*"
              placeholder="Billboard label"
            />
          </div>

          <div className="grid max-w-3xl gap-5 sm:grid-cols-2 sm:gap-8">
            <FormField
              control={form.control}
              name="label"
              label="Label*"
              disabled={loading || isLoading}
              placeholder="Billboard label"
            />

            <FormField
              control={form.control}
              name="labelColor"
              label="Label Hex Color"
              id="labelColor"
              disabled={loading || isLoading}
              input={(field) => (
                <ColorPickerInput
                  {...field}
                  id={"labelColor"}
                  disabled={loading || isLoading}
                  placeholder="Billboard label Color"
                  error={form.formState.errors.labelColor}
                />
              )}
            />

            <FormField
              control={form.control}
              name="showLabel"
              disabled={loading || isLoading}
              input={(field) => {
                const { value, ...fieldProps } = field;
                return (
                  <Checkbox
                    {...fieldProps}
                    checked={value}
                    onCheckedChange={field.onChange}
                    className="cursor"
                    label="Show Label"
                    disabled={loading || isLoading}
                    description="Show Label on Billboard"
                  />
                );
              }}
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
