import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      username: null,
      userID: null,
      setUserID: (userID) => set({ userID }),
      setUsername: (Dusername) => set({ username: Dusername }),
      logout: () => set({ username: null, userID: null }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
