"use client";

import { Options } from "@/models/components";
import Combobox from "./ui/custom/combobox";
import { useModalStore } from "@/hooks/useModalStore";
import { useParams, useRouter } from "next/navigation";
import { Store } from "lucide-react";

export default function StoreSelector({
  storeOptions,
}: {
  storeOptions: Options[];
}) {
  const storeModal = useModalStore();
  const params = useParams();
  const router = useRouter();

  const returnMatch = (key: unknown, redirect: boolean = false) => {
    const match = storeOptions.find((option) => option.value === key);
    if (redirect) {
      if (match) {
        router.push(`/store/${match.value}`);
      }
    }
    return match;
  };

  const storeMatch = returnMatch(params.storeId);

  return (
    <Combobox
      items={storeOptions}
      placeholder="Select a store"
      groupHeading="Stores"
      onCreate={storeModal.openModal}
      onSelect={(id) => returnMatch(id, true)}
      createPrompt="Create Store"
      defaultValue={storeMatch}
      icon={<Store className="text-inherit" />}
      optionIcon
    />
  );
}
