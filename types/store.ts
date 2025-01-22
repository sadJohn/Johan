import { User } from "./model";

type AgeStoreState = { userInfo: User | null };

type AgeStoreActions = {
  setUserInfo: (userInfo: AgeStoreState["userInfo"]) => void;
};

export type AgeStore = AgeStoreState & AgeStoreActions;
