// zustand 테스팅
import { create } from "zustand";

const useEmail = create((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  clearEmail: () => set({ email: "" }),
}));

export default useEmail;
