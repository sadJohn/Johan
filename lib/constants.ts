export const API_VERSION = "v1";

export const JOHAN_AUTH_SESSION = "johan_auth_session";
export const GITHUB_AUTH_STATE = "github_oauth_state";
export const GOOGLE_AUTH_STATE = "google_oauth_state";
export const GOOGLE_CODE_VERIFIER = "google_code_verifier";

export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${API_VERSION}`;

export enum AUTH_MODE {
  EMAIL = "email",
  GITHUB = "github",
  GOOGLE = "google",
}
