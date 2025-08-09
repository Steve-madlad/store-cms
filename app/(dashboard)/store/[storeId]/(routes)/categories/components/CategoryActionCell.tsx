"use client";

import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import Dropdown from "@/components/ui/custom/dropdown";
import { DropdownOptionsProps } from "@/models/components";
import axios from "axios";
import { Copy, Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CategoryColumn } from "./CategoryColumns";

interface categoryActionCellProps {
  data: CategoryColumn;
}

export default function CategoryActionCell({ data }: categoryActionCellProps) {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { storeId } = params;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/categories/${data.id}`,
      );

      if (res.status === 200) {
        toast.success("Category Deleted.");
        router.refresh();
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
      setOpen(false);
    }
  };

  const actions: DropdownOptionsProps[] = [
    {
      label: "Edit",
      icon: Edit,
      action: () => {
        router.push(`/store/${storeId}/categories/${data.id}`);
      },
    },
    {
      label: "Copy ID",
      icon: Copy,
      action: () => {
        window.navigator.clipboard.writeText(data.id);
        toast.success("Copied to clipboard");
      },
    },
  ];

  return (
    <>
      <Dropdown options={actions} onDelete={() => setOpen(true)} />
      <ConfirmationDialog
        open={open}
        setOpen={setOpen}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}
