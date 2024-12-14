import { create } from 'zustand';



type ModalStore = {
  action: string | null;
  type: string | null;
  id: string | null;
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  isOpen: boolean;
  openModal: (modalData: { action: string | null; type?: string | null; id?: string; data?: object }) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>()((set) => ({
  action: null,
  type: null,
  id: null,
  data: {},
  isOpen: false,
  openModal: (modalData) => set(() => ({ ...modalData, isOpen: true })),
  closeModal: () => set(() => ({ isOpen: false, id: null, action: null, type: null, data: null })),
}));