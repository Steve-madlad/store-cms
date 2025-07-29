"use client";

import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";

import { FormInputField as FormField } from "@/components/formField";
import Heading from "@/components/heading";
import { SelectDropdown } from "@/components/ui/custom/select";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";

interface CategoryFormProps {
  billboards: Billboard[];
  initialData: Category | null;
}

export default function CategoryForm({
  billboards,
  initialData,
}: CategoryFormProps) {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Category" : "Create category";
  const description = initialData ? "Edit Category" : "Add a new category";
  const toastMessage = initialData ? "Category updated" : "Category created";
  const action = initialData ? "Save Changes" : "Create Category";

  const formSchema = zod.object({
    name: zod.string().min(1, "Name is required"),
    billboardId: zod.string().min(1, "Billboard is required"),
  });

  type CategoryFormValues = zod.infer<typeof formSchema>;

  console.log("initialData", initialData);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const { formState } = form;

  console.log("form vals", form.getValues());
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`,
      );

      if (res.status === 200) {
        toast.success("Category Deleted.");
        router.refresh();
        router.push(`/store/${params.storeId}/categories`);
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

  const onSubmit = async (values: CategoryFormValues) => {
    setLoading(true);

    try {
      let res;
      if (initialData)
        res = await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          values,
        );
      else res = await axios.post(`/api/${params.storeId}/categories`, values);

      if (res.status === 200) {
        toast.success(toastMessage);
        router.refresh();
        router.push(`/store/${params.storeId}/categories`);
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
              placeholder="Category Name"
            />

            <FormField
              control={form.control}
              name="billboardId"
              label="Billboard"
              input={(field) => (
                console.log("val", field.value),
                console.log("boards", billboards),
                (
                  <SelectDropdown
                    {...field}
                    value={field.value}
                    options={billboards.map((billboard) => ({
                      label: billboard.label,
                      value: billboard.id,
                    }))}
                    error={formState.errors.billboardId?.message}
                    selectTrigger="Select a Billboard"
                    className="w-full focus-visible:ring-1"
                  />
                )
              )}
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
