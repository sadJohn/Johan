import Link from "next/link";

import { getUserAction } from "@/actions/auth";
import AvatarUploader from "@/components/profile/avatar-uploader";
import { Button } from "@/components/ui/button";
import { getFollowsCount } from "@/queries/profile";
import { User } from "@/types";

const Sider = async () => {
  const user = (await getUserAction()) as User;
  const followCount = await getFollowsCount(user.id);

  return (
    <div className="mt-20 flex flex-col items-center gap-2">
      <AvatarUploader user={user} />
      <div className="text-lg">{user.username}</div>
      <div className="flex gap-2">
        <Button variant={"ghost"} asChild>
          <Link href={"/profile/followers"}>
            {followCount.followers} followers
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={"/profile/following"}>
            {followCount.followering} following
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sider;
