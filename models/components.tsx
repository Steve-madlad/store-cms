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
