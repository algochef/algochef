import type { Platform } from "./contest-types";

export enum Role {
    USER = "USER",
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN",
}

export interface User {
    id: number;
    username: string;
    name: string;
    avatar?: string;
    role: Role;
    institution?: string;
    ojHandles: OjHandles[];
    social?: Social
}

export interface OjHandles {
    handle: string;
    verified: boolean;
    platform: Platform
}

export interface Social {
    githubUrl: string
    linkedinUrl: string
    instagramUrl: string
    portfolioUrl: string
    twitterUrl: string
}


export interface Submission {
  id: string
  title: string
  titleSlug: string
  status: string
  timestamp: string
};
