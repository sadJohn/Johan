import { cookies } from "next/headers";

import { generateCodeVerifier, generateState } from "arctic";

import { GOOGLE_AUTH_STATE, GOOGLE_CODE_VERIFIER } from "@/lib/constants";
import { google } from "@/lib/oauth";

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, [
    "profile",
    "email",
  ]);

  const cookieStore = await cookies();
  cookieStore.set(GOOGLE_AUTH_STATE, state, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });
  cookieStore.set(GOOGLE_CODE_VERIFIER, codeVerifier, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
