"use client";

import { useModalStore } from "@/hooks/useModalStore";
import Modal from "../ui/custom/modal";
import * as zod from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { Button } from "../ui/custom/button";
import toast from "react-hot-toast";

export default function StoreModal() {
  const storeModal = useModalStore();
  const [loading, setLoading] = useState(false);

  const formSchema = zod.object({
    name: zod.string().min(2, "Store name is required"),
  });

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/stores", values);

      if (res.status === 200) {
        form.reset();
        window.location.assign(`/store/${res.data.data.id}`);
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
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Form
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="E-Commerce"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button disabled={loading} variant={"outline"}>
              Cancel
            </Button>
            <Button
              iconRight
              loadingText="Saving"
              isLoading={loading}
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
