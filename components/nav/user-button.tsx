"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, useEffect } from "react";

import clsx from "clsx";
import { LucideLogOut, LucideUserRound } from "lucide-react";
import { toast } from "sonner";

import { getUser, logout } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import useAppStore from "@/store";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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

const UserButton = () => {
  const { userInfo, setUserInfo } = useAppStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));

  console.log("userInfo: ", userInfo);
  useEffect(() => {
    getUser().then((res) => {
      setUserInfo(res);
    });
  }, [setUserInfo]);

  return userInfo ? (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={`${userInfo?.picture}`} />
            <AvatarFallback>
              <LucideUserRound />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DrawerTrigger>
      {userInfo && (
        <DrawerContent>
          <DrawerTitle className="mt-6 flex flex-col items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`${userInfo?.picture}`} />
              <AvatarFallback>
                <LucideUserRound />
              </AvatarFallback>
            </Avatar>
            <div className="text-xl">{userInfo.username}</div>
            <DrawerDescription>Take care of yourself.</DrawerDescription>
          </DrawerTitle>
          <Separator className="my-3" />
          <DrawerItem>
            <LucideUserRound />
            <Link href={"/profile"}>Profile</Link>
          </DrawerItem>
          <Separator className="my-3" />
          <form
            action={async () => {
              toast.promise(logout, {
                loading: "See ....",
                success: () => {
                  setUserInfo(null);
                  return `See you.`;
                },
                error: "Error",
              });
            }}
          >
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
