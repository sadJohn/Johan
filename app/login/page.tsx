import { redirect } from "next/navigation";

import { getUser } from "@/actions/auth";
import AuthCard from "@/components/auth/auth-card";

const Login = async () => {
  const userInfo = await getUser();
  if (userInfo) {
    redirect("/home");
  }

  return (
    <div className="mt-20">
      <AuthCard />
    </div>
  );
};

export default Login;
