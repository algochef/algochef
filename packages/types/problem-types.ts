import { Platform } from "./contest-types";

export enum DifficultyCategory {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum SheetTheme {
  CYAN = "CYAN",
  TEAL = "TEAL",
  EMERALD = "EMERALD",
  INDIGO = "INDIGO",
  BLUE = "BLUE",
  YELLOW = "YELLOW"
}

export interface Problem {
  id?: number;
  platform: Platform;
  problemCode?: string;
  title: string;
  url: string;
  solved?: boolean;
  slug: string;
  difficultyCategory?: DifficultyCategory;
  difficultyNumeric?: number;
  tags?: Tag[];
  companyTags?: CompanyTag[];
};


export interface Tag {
  id?: number;
  name: string;
  slug: string
}

export interface CompanyTag {
  id?: number;
  name: string;
  slug: string
}


export interface Sheet {
  id?: number;
  title: string;
  slug: string;
  description?: string;
  section: Section[];
  theme: SheetTheme;
  createdBy?: {
    name: string,
    username: string,
  };
}


export interface Section {
  id?: number;
  title: string;
  order?: number;
  problems: Problem[];
  sheetId?: number;
}


export enum ProblemListType {
  SHEET = "SHEET",
  TAG = "TAG",
  COMPANY = "COMPANY",
}