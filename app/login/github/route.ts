import { cookies } from "next/headers";

import { generateState } from "arctic";

import { GITHUB_AUTH_STATE } from "@/lib/constants";
import { github } from "@/lib/oauth";

export async function GET(): Promise<Response> {
  const state = generateState();
  const url = github.createAuthorizationURL(state, ["user:email"]);

  const cookieStore = await cookies();
  cookieStore.set(GITHUB_AUTH_STATE, state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
