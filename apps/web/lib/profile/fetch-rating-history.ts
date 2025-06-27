import { Platform } from "@repo/types/contest";
import type { RatingHistory } from "@repo/types/stat";

const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";
export const fetchRatingHistory = async (handle: string, platform: Platform) => {
  try {
    const res = await fetch(OJ_BACKEND + `/api/v1/ratings/${platform.toLowerCase()}/${handle}`);
    if (!res.ok) {
      console.error(`Bad status code while getting ${platform} contest data`);
      throw new Error(`Failed to get ${platform} contest data`);
    }
    const resData = await res.json();
    return resData.result satisfies RatingHistory[];
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to get ${platform} contest data`);
  }
};
