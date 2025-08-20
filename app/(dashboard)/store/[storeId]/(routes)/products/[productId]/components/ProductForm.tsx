"use client";

import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";

import { FormInputField as FormField } from "@/components/formField";
import Heading from "@/components/heading";
import ImageUpload from "@/components/imageUpload";
import Checkbox from "@/components/ui/custom/checkbox";
import { SelectDropdown } from "@/components/ui/custom/select";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category, Color, Image, Product, Size } from "@prisma/client";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
import { useModalStore } from "@/hooks/useModalStore";

type ProductFormData = Omit<Product, "price"> & {
  price: number;
  images: Image[];
};

interface ProductFormProps {
  initialData: ProductFormData | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

export default function ProductForm({
  initialData,
  categories,
  sizes,
  colors,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const { isLoading, loadingStart, loadingEnd, openModal, onClose } =
    useModalStore();

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit Product" : "Add a new product";
  const toastMessage = initialData ? "Product updated" : "Product created";
  const action = initialData ? "Save Changes" : "Create Product";

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const sizeOptions = sizes.map((size) => ({
    label: size.name,
    value: size.id,
  }));

  const colorOptions = colors.map((color) => ({
    label: color.name,
    value: color.id,
  }));

  const formSchema = zod.object({
    name: zod.string().trim().min(1, "Name is required"),
    images: zod
      .object({ url: zod.string() })
      .array()
      .min(1, "Image is required"),
    price: zod.coerce.number().min(1, "Price must be greater than 0"),
    categoryId: zod.string().min(1, "Category is required"),
    colorId: zod.string().min(1, "Color is required"),
    sizeId: zod.string().min(1, "Size is required"),
    isFeatured: zod.boolean().default(false).optional(),
    isArchived: zod.boolean().default(false).optional(),
  });

  type ProductFormValues = zod.input<typeof formSchema>;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData?.price)) }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const { formState } = form;

  const handleDelete = async () => {
    loadingStart();
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/products/${params.productId}`,
      );

      if (res.status === 200) {
        toast.success("Product Deleted.");
        router.refresh();
        router.push(`/store/${params.storeId}/products`);
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

  const onSubmit = async (values: ProductFormValues) => {
    setLoading(true);

    try {
      let res;
      if (initialData)
        res = await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          values,
        );
      else res = await axios.post(`/api/${params.storeId}/products`, values);

      if (res.status === 200) {
        toast.success(toastMessage);
        router.refresh();
        router.push(`/store/${params.storeId}/products`);
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
          <FormField
            control={form.control}
            name="images"
            id="images"
            input={() => (
              <ImageUpload
                disabled={loading || isLoading}
                onChange={(url) => {
                  const currentImages = form.getValues("images");
                  const updatedImages = [...currentImages, { url }];
                  form.setValue("images", updatedImages, {
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                }}
                onRemove={(url) => {
                  const filtered = form
                    .getValues("images")
                    .filter((img) => img.url !== url);
                  form.setValue("images", filtered, {
                    shouldValidate: true,
                    shouldTouch: true,
                  });
                }}
                id="images"
                value={form.watch("images").map((image) => image.url)}
                error={!!formState.errors.images}
              />
            )}
            label="Image"
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              label="Name"
              disabled={loading || isLoading}
              placeholder="Product Name"
            />

            <FormField
              control={form.control}
              name="price"
              label="Price"
              type="number"
              disabled={loading || isLoading}
              placeholder="product price"
            />

            <FormField
              control={form.control}
              name="categoryId"
              label="Categories"
              id="categoryId"
              disabled={loading || isLoading}
              input={(field) => (
                <SelectDropdown
                  {...field}
                  id="categoryId"
                  selectTrigger="Select Categories"
                  options={categoryOptions ?? []}
                  disabled={loading || isLoading}
                  createLabel="Create Category"
                  createUrl={`/store/${params.storeId}/categories/new`}
                />
              )}
            />

            <FormField
              control={form.control}
              name="sizeId"
              id="sizeId"
              label="Sizes"
              disabled={loading || isLoading}
              input={(field) => (
                <SelectDropdown
                  {...field}
                  selectTrigger="Select Sizes"
                  options={sizeOptions ?? []}
                  id="sizeId"
                  disabled={loading || isLoading}
                  createLabel="Create Size"
                  createUrl={`/store/${params.storeId}/sizes/new`}
                />
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              label="Colors"
              id="colorId"
              disabled={loading || isLoading}
              input={(field) => (
                <SelectDropdown
                  {...field}
                  id="colorId"
                  selectTrigger="Select Colors"
                  options={colorOptions ?? []}
                  disabled={loading || isLoading}
                  createLabel="Create Color"
                  createUrl={`/store/${params.storeId}/colors/new`}
                />
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              disabled={loading || isLoading}
              input={(field) => {
                const { value, ...fieldProps } = field;
                return (
                  <Checkbox
                    {...fieldProps}
                    checked={value}
                    onCheckedChange={field.onChange}
                    className="cursor"
                    label="Featured"
                    disabled={loading || isLoading}
                    description="Highlight this product on the homepage to boost visibility."
                  />
                );
              }}
              placeholder="product price"
            />

            <FormField
              control={form.control}
              name="isArchived"
              disabled={loading || isLoading}
              input={(field) => {
                const { value, ...fieldProps } = field;
                return (
                  <Checkbox
                    {...fieldProps}
                    checked={value}
                    onCheckedChange={field.onChange}
                    className="cursor"
                    label="Archived"
                    disabled={loading || isLoading}
                    description="Hide this product from public catalog and search results."
                  />
                );
              }}
              placeholder="product price"
            />
          </div>

          <Button isLoading={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
