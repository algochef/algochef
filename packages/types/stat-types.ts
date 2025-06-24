import { z } from "zod";

export const CodeforcesAccountSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  rating: z.number(),
  maxRating: z.number(),
  rank: z.string(),
  maxRank: z.string(),
  totalSolve: z.number().optional(),
  totalContests: z.number().optional(),
});

export type CodeforcesAccount = z.infer<typeof CodeforcesAccountSchema>;

export const LeetcodeAccountSchema = z.object({
  firstName: z.string(),
  aboutMe: z.string(),
  ranking: z.string(),
  rating: z.number().optional(),
  maxRating: z.number().optional(),
  rank: z.string().optional(),
  maxRank: z.string().optional(),
  totalSolve: z.number().optional(),
  totalContests: z.number().optional(),
  easySolved: z.number().optional(),
  mediumSolved: z.number().optional(),
  hardSolved: z.number().optional(),
});

export type LeetcodeAccount = z.infer<typeof LeetcodeAccountSchema>;

export const AtcoderAccountSchema = z.object({
  rating: z.number().optional(),
  rank: z.number().optional(),
  maxRating: z.number().optional(),
  totalContests: z.number().optional(),
  badge: z.string().optional(),
  affiliation: z.string().optional(),
  totalSolved: z.number().optional(),
});

export type AtcoderAccount = z.infer<typeof AtcoderAccountSchema>;

export const CodechefAccountSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  rating: z.number().optional(),
  rank: z.string().optional(),
  maxRating: z.number().optional(),
  totalContests: z.number().optional(),
  totalSolved: z.number().optional(),
});

export type CodechefAccount = z.infer<typeof CodechefAccountSchema>;
