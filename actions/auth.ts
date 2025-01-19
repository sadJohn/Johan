"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import api from "@/lib/api";
import {
  AUTH_MODE,
  JOHAN_AUTH_SESSION,
  NEXT_TAG_SESSION,
} from "@/lib/constants";
import {
  getSessionCookie,
  invalidateSession,
  validateSessionToken,
} from "@/lib/session";
import { API_RETURN, User } from "@/types";

export const registerAction = async (user: User) => {
  const { data: newUser } = await api
    .post<API_RETURN<User>>("auth/register", { json: user })
    .json();

  const { sessionToken, session } = await getSessionCookie(newUser.id);

  (await cookies()).set(JOHAN_AUTH_SESSION, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(session.expiresAt),
    path: "/",
  });

  revalidateTag(NEXT_TAG_SESSION);

  return newUser;
};

export const loginAction = async (user: User & { mode: AUTH_MODE }) => {
  const { data: newUser } = await api
    .post<API_RETURN<User>>("auth/login", { json: user })
    .json();

  const { sessionToken, session } = await getSessionCookie(newUser.id);

  (await cookies()).set(JOHAN_AUTH_SESSION, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(session.expiresAt),
    path: "/",
  });

  revalidateTag(NEXT_TAG_SESSION);

  if (user.mode !== AUTH_MODE.EMAIL) {
    redirect("/home");
  }

  return newUser;
};

export const getUserAction = async () => {
  const session = (await cookies()).get(JOHAN_AUTH_SESSION);
  if (!session?.value) {
    return null;
  }
  const result = await validateSessionToken(session.value);
  return result.user;
};

export const logoutAction = async () => {
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

  revalidateTag(NEXT_TAG_SESSION);
};
