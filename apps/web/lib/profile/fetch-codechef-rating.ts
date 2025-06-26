import type { RatingHistory } from "@repo/types/stat";

const OJ_BACKEND = process.env.OJ_BACKEND || "http://localhost:3001";
export const getCodechefRatingChart = async (handle: string) => {
  try {
    const res = await fetch(OJ_BACKEND + "/api/v1/ratings/codechef/" + handle);
    if (!res.ok) {
      console.error("Bad status code while getting codechef contest data");
      throw new Error("Failed to get codechef contest data");
    }
    const resData = await res.json();
    return resData.result satisfies RatingHistory[];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get codechef contest data");
  }
};
