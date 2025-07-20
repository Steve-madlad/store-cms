"use client";

import { useModalStore } from "@/hooks/useModalStore";
import { useEffect } from "react";

export default function Home() {
  const onOpen = useModalStore((state) => state.openModal);
  const isOpen = useModalStore((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
