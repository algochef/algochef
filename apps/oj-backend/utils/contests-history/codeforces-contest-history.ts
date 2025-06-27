import type { RatingHistory } from "@repo/types/stat";

export const fetchCodeforcesRatingHistory = async (handle: string) => {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.rating?handle=${handle}`,
    );

    const json = await res.json();

    if (json.status !== "OK") {
      console.error("Codeforces API returned error:", json.comment);
      throw new Error("Failed to get Codeforces rating history");
    }

    const data = json.result;
    let prevRating = 0;

    const result: RatingHistory[] = data.map((contest: any) => {
      const dateObj = new Date(contest.ratingUpdateTimeSeconds * 1000);
      const unixTime = Math.floor(dateObj.getTime() / 1000);

      const contestData = {
        contestTitle: contest.contestName,
        date: unixTime,
        rank: contest.rank || 0,
        rating: contest.newRating || 0,
        delta: (contest.newRating || 0) - prevRating,
      };

      prevRating = contestData.rating;
      return contestData;
    });

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get Codeforces rating history");
  }
};

// (async () => {
//   console.log(await fetchCodeforcesRatingHistory("terminalwarlord"));
// })();
