"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_MODE, BASE_URL, JOHAN_AUTH_SESSION } from "@/lib/constants";
import { User } from "@/types";

export const register = async (user: User) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((r) => r.json());
  if (res) {
    const session = res.session;
    (await cookies()).set(JOHAN_AUTH_SESSION, session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(session.expiresAt),
      path: "/",
    });
    redirect("/home");
  }
};

export const login = async (user: User & { mode: AUTH_MODE }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((r) => r.json());
  if (res) {
    const session = res.session;
    (await cookies()).set(JOHAN_AUTH_SESSION, session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(session.expiresAt),
      path: "/",
    });
    redirect("/home");
  }
};

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
