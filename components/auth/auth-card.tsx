import Oauth from "@/app/login/oauth";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import LoginForm from "./login-form";
import RegistorForm from "./registor-form";

const AuthCard = () => {
  return (
    <div>
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

export default AuthCard;
