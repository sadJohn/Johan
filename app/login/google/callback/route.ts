import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { OAuth2Tokens } from "arctic";
import { decodeIdToken } from "arctic";

import { GOOGLE_AUTH_STATE, GOOGLE_CODE_VERIFIER } from "@/lib/constants";
import { google } from "@/lib/oauth";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get(GOOGLE_AUTH_STATE)?.value ?? null;
  const codeVerifier = cookieStore.get(GOOGLE_CODE_VERIFIER)?.value ?? null;
  console.log("GOOGLE: ", code, codeVerifier);
  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    console.log("validateAuthorizationCode: ", e);
    // Invalid code or client credentials
    redirect(`/login`);
  }
  const googleUser = decodeIdToken(tokens.idToken());

  // TODO: Replace this with your own DB query.
  console.log("googleUser: ", googleUser);

  //   const user = {
  //     email: googleUser.email,
  //     username: googleUser.name,
  //     picture: googleUser.avatar_url,
  //     githubId: googleUser.sub,
  //   } as User;

  //   const session = await oauthLogin({ ...user, mode: AUTH_MODE.GOOGLE });
  //   (await cookies()).set(JOHAN_AUTH_SESSION, session.sessionToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "lax",
  //     expires: new Date(session.expiresAt),
  //     path: "/",
  //   });
  redirect(`/home`);
}
