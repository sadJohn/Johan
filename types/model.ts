export type User = {
  id: number;
  username: string;
  email: string | null;
  password: string;
  age: number | null;
  pictureId: string | null;
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
