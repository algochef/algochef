export enum Platform {
    CODEFORCES = "CODEFORCES",
    LEETCODE = "LEETCODE",
    CODECHEF = "CODECHEF",
    ATCODER = "ATCODER"
};


export enum contestType{
    UPCOMING="UPCOMING",
    PAST="PAST"
}


export interface Contest{
    id?: number;
    title: string;
    url: string;
    youtubeUrl?: string;
    platform: Platform;
    startsAt: number;
    duration: number;
    hasEnded?: boolean;
    isBookmarked?: boolean;
    isRunning?: boolean;
}