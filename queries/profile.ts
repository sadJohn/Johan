import api from "@/lib/api";
import { API_RETURN, User } from "@/types";

export const getFollowsCount = async (userId: User["id"]) => {
  const res = await Promise.all([
    api
      .get<API_RETURN<{ count: number }>>(`profile/followers/${userId}/count`)
      .json(),
    api
      .get<API_RETURN<{ count: number }>>(`profile/following/${userId}/count`)
      .json(),
  ]);
  return {
    followers: res[0].data.count,
    followering: res[1].data.count,
  };
};
