"use client";

import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import Dropdown from "@/components/ui/custom/dropdown";
import { DropdownOptionsProps } from "@/models/components";
import axios from "axios";
import { Copy, Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { colorColumn } from "./ColorColumns";
import { useModalStore } from "@/hooks/useModalStore";

interface ColorActionCellProps {
  data: colorColumn;
}

export default function ColorActionCell({ data }: ColorActionCellProps) {
  const router = useRouter();
  const params = useParams();

  const { loadingStart, loadingEnd, onClose, openModal } = useModalStore();

  const { storeId } = params;

  const handleDelete = async () => {
    loadingStart();
    try {
      const res = await axios.delete(
        `/api/${params.storeId}/colors/${data.id}`,
      );

      if (res.status === 200) {
        toast.success("Color Deleted.");
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
      loadingEnd();
      onClose();
    }
  };

  const actions: DropdownOptionsProps[] = [
    {
      label: "Edit",
      icon: Edit,
      action: () => {
        router.push(`/store/${storeId}/colors/${data.id}`);
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
    <Dropdown
      options={actions}
      onDelete={() => openModal("confirmation", handleDelete)}
    />
  );
}
