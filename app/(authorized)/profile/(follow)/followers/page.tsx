import { getUserAction } from "@/actions/auth";
import { followAction } from "@/actions/profile";
import { getFollowersList } from "@/queries/profile";

import FollowCard from "../../_components/follow-card";

const Followers = async () => {
  const user = (await getUserAction())!;

  const followersList = await getFollowersList(user.id, {});

  return (
    <div>
      {followersList.map((follower) => (
        <FollowCard
          key={follower.id}
          user={follower}
          action={followAction.bind(null, follower.id)}
          label="follow"
        />
      ))}
    </div>
  );
};

export default Followers;
