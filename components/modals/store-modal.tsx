"use client";

import { FormInputField as FormField } from "@/components/formField";
import { useModalStore } from "@/hooks/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as zod from "zod";
import { Button } from "../ui/custom/button";
import Modal from "../ui/custom/modal";
import { Form } from "../ui/form";

export default function StoreModal() {
  const storeModal = useModalStore();
  const router = useRouter();

  const formSchema = zod.object({
    name: zod.string().min(1, "Store Name is required"),
    url: zod.url("Invalid URL").or(zod.literal("")).optional(),
  });

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    storeModal.loadingStart();
    try {
      const res = await axios.post("/api/stores", values);

      if (res.status === 200) {
        form.reset();
        toast.success("Store created.");
        storeModal.onClose();
        router.push(`/store/${res.data.data.id}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error?.status === 405
            ? "Method not allowed"
            : error.response?.data?.message,
        );
      }
    } finally {
      storeModal.loadingEnd();
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <FormField
            control={form.control}
            name="name"
            label="Store Name"
            disabled={storeModal.isLoading}
            placeholder="E-Commerce"
          />

          <FormField
            control={form.control}
            name="url"
            label="Store Link"
            disabled={storeModal.isLoading}
            placeholder="https://example.com"
          />

          <div className="flex justify-end gap-2">
            <Button
              onClick={storeModal.onClose}
              type="button"
              disabled={storeModal.isLoading}
              variant={"outline"}
            >
              Cancel
            </Button>

            <Button
              iconRight
              loadingText="Saving"
              isLoading={storeModal.isLoading}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
