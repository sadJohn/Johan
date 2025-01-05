import { persist } from "zustand/middleware";
import { createWithEqualityFn as create } from "zustand/traditional";
import { shallow } from "zustand/vanilla/shallow";

import { AgeStore } from "@/types";

const initState = {
  userInfo: null,
} as AgeStore;

const useAppStore = create<AgeStore>()(
  persist(
    (set) => ({
      ...initState,

      setUserInfo: (user) => set({ userInfo: user }),
    }),
    {
      name: "app-storage",
    }
  ),
  shallow
);

export default useAppStore;
