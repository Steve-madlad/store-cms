"use client";

import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import type { Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { FormInputField as FormField } from "@/components/formField";
import Heading from "@/components/heading";

interface SizeFormProps {
  initialData: Size | null;
}

export default function SizeForm({ initialData }: SizeFormProps) {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Size" : "Create size";
  const description = initialData ? "Edit Size" : "Add a new size";
  const toastMessage = initialData ? "Size updated" : "Size created";
  const action = initialData ? "Save Changes" : "Create size";

  const formSchema = zod.object({
    name: zod.string().trim().min(1, "Name is required"),
    value: zod.string().trim().min(1, "Value is required"),
  });

  type SizeFormValues = zod.infer<typeof formSchema>;

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const { formState, getValues } = form;
  console.log("errs", formState.errors);
  console.log("vals", getValues());

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/sizes/${params.sizeId}`,
      );

      if (res.status === 200) {
        toast.success("Size Deleted.");
        router.refresh();
        router.push(`/store/${params.storeId}/sizes`);
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

  const onSubmit = async (values: SizeFormValues) => {
    setLoading(true);

    try {
      let res;
      if (initialData)
        res = await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          values,
        );
      else res = await axios.post(`/api/${params.storeId}/sizes`, values);

      if (res.status === 200) {
        toast.success(toastMessage);
        router.refresh();
        router.push(`/store/${params.storeId}/sizes`);
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
        <Heading header={title} description={description} />

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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Size Name"
            />

            <FormField
              control={form.control}
              name="value"
              label="Value"
              placeholder="Size Value"
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
