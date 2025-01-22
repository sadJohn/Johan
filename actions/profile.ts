"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import api from "@/lib/api";
import { NEXT_TAG_SESSION } from "@/lib/constants";

import { getUserAction } from "./auth";

export const uploadAvatarAction = async (avatar: string) => {
  const user = await getUserAction();
  if (!user) {
    return;
  }

  await api.post("profile/avatar", {
    json: {
      id: user.id,
      pictureId: user.pictureId,
      avatar,
    },
  });

  revalidateTag(NEXT_TAG_SESSION);
};

export const followAction = async (followingId: number) => {
  const user = await getUserAction();
  if (!user) {
    return;
  }

  await api.post("profile/following", {
    json: {
      userId: user.id,
      followingId,
    },
  });

  revalidatePath("/profile/followers");
};

export const unFollowAction = async (followingId: number) => {
  const user = await getUserAction();
  if (!user) {
    return;
  }

  await api.delete("profile/following", {
    json: {
      userId: user.id,
      followingId,
    },
  });

  revalidatePath("/profile/following");
};
