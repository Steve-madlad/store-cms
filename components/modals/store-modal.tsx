"use client";

import { useModalStore } from "@/hooks/useModalStore";
import Modal from "../ui/custom/modal";

export default function StoreModal() {
  const storeModal = useModalStore();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Form
    </Modal>
  );
}
