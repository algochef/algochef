import type { RatingHistory } from "@repo/types/stat";

export const fetchAtcoderRatingHistory = async (handle: string) => {
  try {
    const res = await fetch(`https://atcoder.jp/users/${handle}/history/json`);

    if (!res.ok) {
      console.error("Bad status code while getting AtCoder history");
      throw new Error("Failed to get AtCoder rating history");
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format from AtCoder");
    }
    let prevRating = 0;
    const result: RatingHistory[] = data.map((contest: any) => {
      const dateObj = new Date(contest.EndTime);
      const unixTime = Math.floor(dateObj.getTime() / 1000);

      const contestData = {
        contestTitle:
          contest.ContestNameEn.length > 0
            ? contest.ContestNameEn
            : contest.ContestName,
        date: unixTime,
        rank: contest.Place || 0,
        rating: contest.NewRating || 0,
        delta: (contest.NewRating || 0) - prevRating,
      };
      prevRating = contestData.rating;
      return contestData;
    });

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get AtCoder rating history");
  }
};

// (async () => {
//     console.log(await fetchAtcoderRatingHistory("terminalwarlord"));
// })();
