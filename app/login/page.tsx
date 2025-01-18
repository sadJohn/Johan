import { redirect } from "next/navigation";

import clsx from "clsx";
import { LucideRedo } from "lucide-react";

import { getUserAction } from "@/actions/auth";
import AuthCard from "@/components/auth/auth-card";
import { indieFlowerFont } from "@/lib/fonts";

const Login = async () => {
  const userInfo = await getUserAction();
  if (userInfo) {
    redirect("/home");
  }

  return (
    <div className="mt-20">
      <div className="fixed left-24 top-16">
        <LucideRedo className="-rotate-90" />
        <div
          className={clsx("ml-4 -rotate-12 text-xl", indieFlowerFont.className)}
        >
          Click me!
        </div>
      </div>
      <AuthCard />
    </div>
  );
};

export default Login;
