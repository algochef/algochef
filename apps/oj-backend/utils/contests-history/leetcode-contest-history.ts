import type { RatingHistory } from "@repo/types/stat";

export const fetchLeetcodeRatingHistory = async (handle: string) => {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query userContestRankingInfo($username: String!) {
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
              name
            }
          }
          userContestRankingHistory(username: $username) {
            attended
            trendDirection
            problemsSolved
            totalProblems
            finishTimeInSeconds
            rating
            ranking
            contest {
              title
              startTime
            }
          }
        }
      `,
        variables: { username: handle },
      }),
    });
    if (!res.ok) {
      console.error("Bad status code while getting LC contest data");
      throw new Error("Failed to get LC contest data");
    }
    const resData = await res.json();
    const data = resData.data;
    if (!data) return null;
    const contests = data.userContestRankingHistory;
    const result: RatingHistory[] = [];
    let prevRating = 0;
    for (const contest of contests) {
      if (contest.attended) {
        // rank, title, rating, date, delta
        const contestData = {
          rank: contest.ranking,
          contestTitle: contest.contest.title,
          date: contest.contest.startTime,
          rating: Math.round(contest.rating) || 0,
          delta: (Math.round(contest.rating) || 0) - prevRating,
        };
        prevRating = contestData.rating;
        result.push(contestData);
      }
    }
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get LC contest data");
  }
};

// (async()=>{
//   console.log(await fetchLeetcodeRatingHistory('terminalwarlord'));
// })();
