import { redirect } from "next/navigation";

import { getUser } from "@/actions/auth";

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return <>{children}</>;
}
