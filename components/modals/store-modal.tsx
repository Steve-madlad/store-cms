"use client";

import { useModalStore } from "@/hooks/useModalStore";
import Modal from "../ui/custom/modal";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function StoreModal() {
  const storeModal = useModalStore();

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
    alert(JSON.stringify(values, null, 2));
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
                  <Input placeholder="E-Commerce" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant={"outline"}>
              Cancel
            </Button>
            <Button className="cursor" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
