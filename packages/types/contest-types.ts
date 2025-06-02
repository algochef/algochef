export enum Platform {
    CODEFORCES = "CODEFORCES",
    LEETCODE = "LEETCODE",
    CODECHEF = "CODECHEF",
    ATCODER = "ATCODER",
    CSES = "CSES",
};


export enum contestType {
    UPCOMING = "UPCOMING",
    PAST = "PAST"
}


export interface Contest {
    id?: number;
    title: string;
    url: string;
    youtubeUrl?: string;
    platform: Platform;
    startsAt: number;
    endsAt: number;
    hasEnded?: boolean;
    isBookmarked?: boolean;
    isRunning?: boolean;
}