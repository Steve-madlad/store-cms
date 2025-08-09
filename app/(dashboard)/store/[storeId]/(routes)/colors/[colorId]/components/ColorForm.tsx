"use client";

import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";

import { FormInputField as FormField } from "@/components/formField";
import Heading from "@/components/heading";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Color } from "@prisma/client";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";

interface ColorFormProps {
  initialData: Color | null;
}

export default function ColorForm({ initialData }: ColorFormProps) {
  const [loading, setLoading] = useState(false);

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

  const { formState, getValues, setValue } = form;

  const handleDelete = async () => {
    setLoading(true);
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
      setLoading(false);
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
          <Button variant={"destructive"} color={"icon"} onClick={handleDelete}>
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
              placeholder="Color Name"
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="value"
                label="Value"
                id="value"
                input={(field) => (
                  <Input
                    {...field}
                    placeholder="Color Value"
                    id="value"
                    onChange={(e) => {
                      const upper = e.target.value.toUpperCase();
                      setValue("value", upper, {
                        shouldValidate: true,
                      });
                    }}
                    className={"my-2 focus-visible:ring-1"}
                  />
                )}
                className="w-full"
              />
              <div
                className={`mt-6 h-8 w-[35px] rounded-full ${!formState.errors.value && getValues().value ? "border-primary border" : "!bg-transparent"}`}
                style={{ backgroundColor: form.getValues().value }}
              />
            </div>
          </div>

          <Button isLoading={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
