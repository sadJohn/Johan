export type User = {
  id: number;
  username: string;
  email: string | null;
  password: string;
  age: number | null;
  picture: string | null;
  githubId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Session = {
  id: string;
  userId: number;
  expiresAt: Date;
};

type AgeStoreState = { userInfo: User | null };

type AgeStoreActions = {
  setUserInfo: (userInfo: AgeStoreState["userInfo"]) => void;
};

export type AgeStore = AgeStoreState & AgeStoreActions;

export type API_RETURN<T> = {
  message: string;
  data: T;
};
