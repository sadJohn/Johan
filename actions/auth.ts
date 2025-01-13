"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import api from "@/lib/api";
import { AUTH_MODE, JOHAN_AUTH_SESSION } from "@/lib/constants";
import {
  getSessionCookie,
  invalidateSession,
  validateSessionToken,
} from "@/lib/session";
import { API_RETURN, User } from "@/types";

export const register = async (user: User) => {
  const { data: userId } = await api
    .post<API_RETURN<number>>("auth/register", { json: user })
    .json();

  const { sessionToken, session } = await getSessionCookie(userId);

  (await cookies()).set(JOHAN_AUTH_SESSION, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(session.expiresAt),
    path: "/",
  });

  redirect("/home");
};

export const login = async (user: User & { mode: AUTH_MODE }) => {
  const { data: userId } = await api
    .post<API_RETURN<number>>("auth/login", { json: user })
    .json();

  const { sessionToken, session } = await getSessionCookie(userId);

  (await cookies()).set(JOHAN_AUTH_SESSION, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(session.expiresAt),
    path: "/",
  });

  redirect("/home");
};

export const getUser = async () => {
  const session = (await cookies()).get(JOHAN_AUTH_SESSION);
  if (!session?.value) {
    return null;
  }
  const result = await validateSessionToken(session.value);
  return result.user;
};

export const logout = async () => {
  const session = (await cookies()).get(JOHAN_AUTH_SESSION);

  const sessionId = session?.value;
  if (!sessionId) {
    return;
  }

  const result = await validateSessionToken(sessionId);
  if (!result.session) {
    return;
  }
  await invalidateSession(result.session.id);

  (await cookies()).set(JOHAN_AUTH_SESSION, "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
};
