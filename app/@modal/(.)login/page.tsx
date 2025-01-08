"use client";

import { useRouter } from "next/navigation";

import AuthCard from "@/components/auth/auth-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LoginModal = () => {
  const router = useRouter();
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
          <div className="p-2">
            <AuthCard />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
