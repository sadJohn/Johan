import queryString from "query-string";

import api from "@/lib/api";
import { API_RETURN, FolloweringSearch, FollowersSearch, User } from "@/types";

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

export const getFollowersList = async (
  userId: User["id"],
  search: FollowersSearch
) => {
  const { data } = await api
    .get<
      API_RETURN<User[]>
    >(`profile/followers/${userId}?${queryString.stringify(search)}`, { cache: "force-cache" })
    .json();

  return data;
};

export const getFolloweringList = async (
  userId: User["id"],
  search: FolloweringSearch
) => {
  const { data } = await api
    .get<
      API_RETURN<User[]>
    >(`profile/following/${userId}?${queryString.stringify(search)}`, { cache: "force-cache" })
    .json();

  return data;
};
