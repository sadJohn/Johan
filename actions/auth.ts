"use server";

import { cookies } from "next/headers";

import { AUTH_MODE, BASE_URL, JOHAN_AUTH_SESSION } from "@/lib/constants";
import { User } from "@/types";

export const getUser = async () => {
  const session = (await cookies()).get(JOHAN_AUTH_SESSION);
  const result = await fetch(
    `${BASE_URL}/auth/token?sessionId=${session?.value}`
  ).then((res) => res.json());
  return result.data as User | null;
};

export const logout = async () => {
  const session = (await cookies()).get(JOHAN_AUTH_SESSION);
  await fetch(`${BASE_URL}/auth/logout?sessionId=${session?.value}`).then(
    (res) => res.json()
  );
  (await cookies()).set(JOHAN_AUTH_SESSION, "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
};

export const oauthLogin = async (user: User & { mode: AUTH_MODE }) => {
  const result = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
  return result.session;
};
