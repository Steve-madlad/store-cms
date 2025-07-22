"use client";

import { Button } from "@/components/ui/custom/button";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/Typography/heading2";
import { P } from "@/components/ui/Typography/paragraph";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import type { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertCard from "@/components/alertCard";
import { useOrigin } from "@/hooks/useOrigin";

interface SettingsFormProps {
  initialData: Store;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const formSchema = zod.object({
    name: zod.string().min(1),
  });

  type SettingsFormValues = zod.infer<typeof formSchema>;

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`/api/stores/${params.storeId}`);

      if (res.status === 200) {
        toast.success("Store Deleted.");
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

  const onSubmit = async (values: SettingsFormValues) => {
    setLoading(true);

    try {
      const res = await axios.patch(`/api/stores/${params.storeId}`, values);

      if (res.status === 200) {
        toast.success("Store updated.");
        router.refresh();
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
          <H2>Settings</H2>
          <P className="text-muted-foreground">Manage Store Preferences</P>
        </div>

        <Button variant={"destructive"} onClick={handleDelete}>
          {loading ? <Loader2 className="animate-spin" /> : <Trash />}
        </Button>
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
          </div>

          <Button isLoading={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>

      <AlertCard
        className="mt-5"
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/stores/${params.storeId}`}
        variant="public"
      />
    </div>
  );
}
