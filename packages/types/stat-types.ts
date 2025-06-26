import { z } from "zod";

export const OjAccountSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  aboutMe: z.string().optional(),
  rating: z.number().optional(),
  rank: z.number().optional(),
  badge: z.string().optional(),
  maxRating: z.number().optional(),
  totalContests: z.number().optional(),
  totalSolved: z.number().optional(),
  maxRank: z.string().optional(),
  easySolved: z.number().optional(),
  mediumSolved: z.number().optional(),
  hardSolved: z.number().optional(),
});

export type OJAccount = z.infer<typeof OjAccountSchema>;

export type RatingHistory = {
  date: number;
  rank: number;
  contestTitle: string;
  rating: number;
};
