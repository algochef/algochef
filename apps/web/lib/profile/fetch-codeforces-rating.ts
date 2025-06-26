import { RatingHistory } from "@repo/types/stat";

export const getCodeforcesRatingChart = async (handle: string) => {
  try {
    const res = await fetch(
      "https://codeforces.com/api/user.rating?handle=" + handle,
    );
    if (!res.ok) {
      console.error("Bad status code while getting codeforces contest data");
      throw new Error("Failed to get codeforces contest data");
    }
    const resData = await res.json();
    const contests = resData.result;
    const result: RatingHistory[] = [];
    for (const contest of contests) {
      result.push({
        rank: contest.rank,
        contestTitle: contest.contestName,
        date: contest.ratingUpdateTimeSeconds,
        rating: contest.newRating,
      });
    }
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get Codeforces contest data");
  }
};
