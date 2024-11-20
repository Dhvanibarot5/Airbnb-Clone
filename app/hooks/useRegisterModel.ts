import {create } from 'zustand'

interface useRegisterModelStore { 
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
const useRegisterModel = create<useRegisterModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useRegisterModel;
