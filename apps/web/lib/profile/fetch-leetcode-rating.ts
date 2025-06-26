import type { RatingHistory } from "@repo/types/stat";

const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";
export const getLeetcodeRatingChart = async (handle: string) => {
  try {
    const res = await fetch(OJ_BACKEND + "/api/v1/ratings/leetcode/" + handle);
    if (!res.ok) {
      console.error("Bad status code while getting LC contest data");
      throw new Error("Failed to get LC contest data");
    }
    const resData = await res.json();
    return resData.result satisfies RatingHistory[];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get LC contest data");
  }
};
