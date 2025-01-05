import { redirect } from "next/navigation";

import { getUser } from "@/actions/auth";
import LoginForm from "@/components/login-form";
import RegistorForm from "@/components/registor-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Oauth from "./oauth";

const Login = async () => {
  const userInfo = await getUser();
  if (userInfo) {
    redirect("/home");
  }

  return (
    <div className="mt-20">
      <div className="mx-auto mb-2 max-w-[400px]">
        <Oauth />
      </div>
      <Tabs defaultValue="signin" className="mx-auto max-w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/2" value="signin">
            Sign In
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value="signup">
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <RegistorForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
