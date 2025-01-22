import { redirect } from "next/navigation";

import { getUserAction } from "@/actions/auth";

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserAction();
  if (!user) {
    redirect("/home");
  }
  return <>{children}</>;
}
