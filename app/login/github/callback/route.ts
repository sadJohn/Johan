import { cookies } from "next/headers";

import type { OAuth2Tokens } from "arctic";

import { login } from "@/actions/auth";
import { AUTH_MODE, GITHUB_AUTH_STATE } from "@/lib/constants";
import { github } from "@/lib/oauth";
import { User } from "@/types";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get(GITHUB_AUTH_STATE)?.value ?? null;

  if (code === null || state === null || storedState === null) {
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
    tokens = await github.validateAuthorizationCode(code);
  } catch (e) {
    console.log("run...: ", e);
    return new Response(null, {
      status: 400,
    });
  }
  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });
  const githubUser = await githubUserResponse.json();

  console.log("githubUser: ", githubUser);

  const user = {
    email: githubUser.email,
    username: githubUser.login,
    picture: githubUser.avatar_url,
    githubId: githubUser.id,
  } as User;

  await login({ ...user, mode: AUTH_MODE.GITHUB });

  return new Response(null, {
    status: 200,
  });
}
