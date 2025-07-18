import type { UseModalStore } from "@/models/components";
import { create } from "zustand";

export const useModalStore = create<UseModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
