import { LucideIcon } from "lucide-react";

export interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface UseModalStore {
  isOpen: boolean;
  openModal: () => void;
  onClose: () => void;
}

export interface ChartData {
  name: string;
  total: number;
}

export interface AlertCardProps {
  title: string;
  description: string;
  loading: boolean;
  variant: "public" | "admin";
  className?: string;
}

export interface Options {
  value: string;
  label: string;
}

export interface ComboboxProps {
  items: Options[];
  onCreate?: () => void;
  onSelect?: (id: string) => void;
  createPrompt?: string;
  placeholder?: string;
  groupHeading?: string;
  defaultValue?: Options;
  icon?: React.ReactNode;
  optionIcon?: boolean;
}

export interface DropdownOptionsProps {
  label: string;
  icon?: LucideIcon;
  action: () => void;
}
