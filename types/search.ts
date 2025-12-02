import { z } from "zod";

export const BaseSearchSchema = z.object({
  limit: z.number().int().min(1, "Limit must be at least 1").optional(),
  offset: z.number().int().min(0, "Offset must be at least 0").optional(),
});

export type BaseSearch = z.infer<typeof BaseSearchSchema>;

export type FollowersSearch = BaseSearch;

export type FolloweringSearch = BaseSearch;
