import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";

import { API_RETURN, Session, User } from "@/types";

import api from "./api";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const { data: session } = await api
    .post<API_RETURN<Session>>("session", {
      json: {
        id: sessionId,
        userId,
      },
    })
    .json();
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const {
    data: { session, user },
  } = await api
    .get<
      API_RETURN<{ session: Session; user: User }>
    >(`session/validate/${sessionId}`)
    .json();
  return { session, user };
}

export async function invalidateSession(sessionId: string) {
  await api.delete(`session/${sessionId}`);
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export async function getSessionCookie(id: number) {
  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, id);

  return { sessionToken, session };
}
