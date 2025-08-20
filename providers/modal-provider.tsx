"use client";

import StoreModal from "@/components/modals/store-modal";
import ConfirmationDialog from "@/components/ui/custom/confirmationDialog";
import { useModalStore } from "@/hooks/useModalStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, isLoading, onClose, modalType, modalAction } =
    useModalStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  switch (modalType) {
    case "create store":
      return <StoreModal />;
    case "confirmation":
      if (modalAction) {
        return (
          <ConfirmationDialog
            open={isOpen}
            onClose={onClose}
            loading={isLoading}
            onConfirm={modalAction}
          />
        );
      } else {
        toast.error("Modal Action is not defined.");
        console.error("Modal Action is not defined.");
        return null;
      }
  }
}
