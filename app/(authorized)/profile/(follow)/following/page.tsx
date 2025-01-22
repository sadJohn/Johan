import { getUserAction } from "@/actions/auth";
import { unFollowAction } from "@/actions/profile";
import { getFolloweringList } from "@/queries/profile";

import FollowCard from "../../_components/follow-card";

const Following = async () => {
  const user = (await getUserAction())!;

  const followingList = await getFolloweringList(user.id, {});

  return (
    <div>
      {followingList.map((following) => (
        <FollowCard
          key={following.id}
          user={following}
          action={unFollowAction.bind(null, following.id)}
          label="unFollow"
        />
      ))}
    </div>
  );
};

export default Following;
