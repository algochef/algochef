import { Platform } from "./contest-types";

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
  tags?: Tag[];
  companyTags?: CompanyTag[];
};


export interface Tag{
  id?: number;
  name: string;
  slug: string
}

export interface CompanyTag{
  id?: number;
  name: string;
  slug: string
}

