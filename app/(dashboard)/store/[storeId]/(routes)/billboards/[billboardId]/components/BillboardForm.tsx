"use client";

import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/Typography/heading2";
import { P } from "@/components/ui/Typography/paragraph";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import type { Billboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { FormInputField as FormField } from "@/components/formField";
import ImageUpload from "@/components/imageUpload";

interface SettingsFormProps {
  initialData: Billboard | null;
}

export default function BillboardForm({ initialData }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Billboard" : "Create billboard";
  const description = initialData ? "Edit Billboard" : "Add a new billboard";
  const toastMessage = initialData ? "Billboard updated" : "Billboard created";
  const action = initialData ? "Save Changes" : "Create billboard";

  const formSchema = zod.object({
    label: zod.string().min(1, "Label is required"),
    imageUrl: zod.string().min(1, "Image URL is required"),
  });

  type BillboardFormValues = zod.infer<typeof formSchema>;

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const { formState, getValues } = form;
  console.log("errs", formState.errors);
  console.log("vals", getValues());

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`,
      );

      if (res.status === 200) {
        toast.success("Billboard Deleted.");
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error deleting store:", error);
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
        console.log("Error updating store:", error);
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
        <div>
          <H2>{title}</H2>
          <P className="text-muted-foreground">{description}</P>
        </div>

        {initialData && (
          <Button variant={"destructive"} size={"icon"} onClick={handleDelete}>
            {loading ? <Loader2 className="animate-spin" /> : <Trash />}
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            input={(field) => (
              <ImageUpload
                disabled={loading}
                onChange={(url) => field.onChange(url)}
                onRemove={() => field.onChange("")}
                value={field.value ? [field.value] : []}
                error={!!formState.errors.imageUrl}
              />
            )}
            label="Image"
            placeholder="Billboard label"
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              label="Label"
              placeholder="Billboard label"
            />
          </div>

          <Button isLoading={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
