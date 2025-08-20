import type { ModalTypes, UseModalStore } from "@/models/components";
import { create } from "zustand";

export const useModalStore = create<UseModalStore>((set) => ({
  isOpen: false,
  isLoading: false,
  modalType: "create store",
  modalAction: null,
  loadingStart: () => set({ isLoading: true }),
  loadingEnd: () => set({ isLoading: false }),
  openModal: (modalType?: ModalTypes, modalAction?: () => void) => {
    set({
      isOpen: true,
      modalType: modalType ?? "create store",
      modalAction,
    });
  },
  onClose: () =>
    set({ isOpen: false, modalType: "create store", modalAction: null }),
}));
