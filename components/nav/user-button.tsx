import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

import clsx from "clsx";
import { LucideLogOut, LucideUserRound } from "lucide-react";

import { getUser, logout } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Separator } from "../ui/separator";

const DrawerItem = ({
  type,
  children,
}: {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: React.ReactNode;
}) => {
  return (
    <DrawerClose
      type={type}
      className={clsx(
        buttonVariants({
          variant: "ghost",
        }),
        "w-full !justify-start"
      )}
    >
      {children}
    </DrawerClose>
  );
};

const UserButton = async () => {
  const userInfo = await getUser();

  return userInfo ? (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={`${userInfo?.picture}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DrawerTrigger>
      {userInfo && (
        <DrawerContent>
          <DrawerTitle className="mt-6 flex flex-col items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`${userInfo?.picture}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-xl">{userInfo.username}</div>
          </DrawerTitle>
          <Separator className="my-3" />
          <DrawerItem>
            <LucideUserRound />
            <Link href={"/profile"}> Profile</Link>
          </DrawerItem>
          <Separator className="my-3" />
          <form action={logout}>
            <DrawerItem type="submit">
              <LucideLogOut className="h-4 w-4" />
              Log out
            </DrawerItem>
          </form>
        </DrawerContent>
      )}
    </Drawer>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};

export default UserButton;
