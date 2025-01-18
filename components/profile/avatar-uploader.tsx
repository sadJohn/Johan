"use client";

import { useRef, useState, useTransition } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { LucideCamera, LucideUserRound } from "lucide-react";
import { toast } from "sonner";

import { getUserAction } from "@/actions/auth";
import { uploadAvatarAction } from "@/actions/profile";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import ImageCropper from "./image-cropper";

const AVATAR_SIZE = 200;

const AvatarUploader = ({ src }: { src: string | null }) => {
  const queryClient = useQueryClient();
  const [selectedAvater, setSelectedAvater] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const onImageCrop = (url: string) => {
    startTransition(() => {
      toast.promise(uploadAvatarAction(url), {
        loading: "Operating...",
        success: () => {
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: [getUserAction.name] });
          return `Plastic surgery success!`;
        },
        error: "Sorry, fat finger!",
      });
    });
  };

  return (
    <div className="relative">
      <Avatar className="h-28 w-28">
        <AvatarImage src={`${src}`} />
        <AvatarFallback>
          <LucideUserRound />
        </AvatarFallback>
      </Avatar>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="absolute -right-2 bottom-0 rounded-full bg-slate-400/70 text-slate-950"
      >
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <LucideCamera />
        </label>
      </Button>
      <input
        ref={inputRef}
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;
          if (files) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = async () => {
              const image = new Image();
              image.src = reader.result?.toString() || "";
              image.onload = (e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (
                  el.naturalWidth < AVATAR_SIZE ||
                  el.naturalHeight < AVATAR_SIZE
                ) {
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                  return toast.warning("I'm sure you are bigger than that.");
                }
                setSelectedAvater(reader.result as string);
                setOpen(true);
              };
            };
          }
        }}
      />
      {open && (
        <ImageCropper
          open={open}
          setOpen={(o) => {
            if (!o && inputRef.current) {
              inputRef.current.value = "";
            }
            setOpen(o);
          }}
          src={selectedAvater}
          onImageCrop={onImageCrop}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default AvatarUploader;
