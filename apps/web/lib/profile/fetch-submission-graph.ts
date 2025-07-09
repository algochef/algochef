import { Platform } from "@repo/types/contest";

const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";
export const fetchSubmissionGraph = async (
    handle: string,
    platform: Platform,
    duration: string
) => {
    try {
        const url = new URL(OJ_BACKEND + `/api/v1/profile/submission-graph`)
        url.searchParams.set("handle", handle);
        url.searchParams.set("platform", platform);
        url.searchParams.set("duration", duration);
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Bad status code while getting ${platform} submission graph`);
            throw new Error(`Failed to get ${platform} submission graph`);
        }
        const resData = await res.json();
        return resData.result;
    } catch (err) {
        console.error(err);
        throw new Error(`Failed to get ${platform} submission graph`);
    }
};
