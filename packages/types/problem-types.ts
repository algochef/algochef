export enum Platform{
  CODEFORCES = "CODEFORCES",
  LEETCODE = "LEETCODE",
  CODECHEF = "CODECHEF",
  ATCODER = "ATCODER",
}

export enum DifficultyCategory{
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export interface Problem{
  id?: number;
  platform: Platform;
  problemCode: string; 
  title: string; 
  url: string;
  slug: string; 
  difficultyCategory?: DifficultyCategory; 
  difficultyNumeric?: number;
  isActive: boolean;
  tags?: string[];
};
