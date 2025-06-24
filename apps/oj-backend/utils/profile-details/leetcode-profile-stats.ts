import type { LeetcodeAccount } from "@repo/types/stat";


interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

const getLeetcodeBasicInfo = async (handle: string) => {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              aboutMe
              ranking
            }
          }
        }
      `,
        variables: { 'username': handle }
      })
    });
    if (!res.ok) {
      console.error("Bad status code while getting basic LC info");
      return null;
    }
    const resData = await res.json();
    const data = resData.data?.matchedUser;
    if (!data) return null;

    const userData: Partial<LeetcodeAccount> = {
      firstName: data.profile.realName,
      aboutMe: data.profile.aboutMe,
      ranking: data.profile.ranking,
    }
    return userData;
  }
  catch (err) {
    console.error("Failed to get basic leetcode user info");
  }

}

const getLeetCodeSolveCount = async (username: string): Promise<LeetCodeStats | null> => {
  const url = 'https://leetcode.com/graphql';

  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    console.error('Failed to fetch data from LeetCode');
    return null;
  }

  const data = await response.json();

  const submissionData = data.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  const allQuestions = data.data?.allQuestionsCount;

  if (!submissionData || !allQuestions) {
    return null;
  }

  const getCount = (difficulty: string) =>
    submissionData.find((item: any) => item.difficulty === difficulty)?.count || 0;

  return {
    totalSolved: getCount('All'),
    easySolved: getCount('Easy'),
    mediumSolved: getCount('Medium'),
    hardSolved: getCount('Hard'),
  };
}

const getLeetcodeRating = async (handle: string) => {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        variables: { 'username': handle }
      })
    });
    if (!res.ok) {
      console.error("Bad status code while getting LC contest data");
      return null;
    }
    const resData = await res.json();
    const data = resData.data;
    if (!data) return null;

    const userData = {
      totalContests: data.userContestRanking ? data.userContestRanking.attendedContestsCount : 0,
      rating: data.userContestRanking ? Math.round(data.userContestRanking.rating) : 0,
      rank: (data.userContestRanking && data.userContestRanking.badge) ? data.userContestRanking.badge.name : "Unrated",
      maxRating: 0,
    } satisfies Pick<LeetcodeAccount, 'totalContests' | 'rating' | 'rank' | 'maxRating'>

    let curBestRating = data.userContestRanking?data.userContestRanking.rating:0;
    for (const contest of data.userContestRankingHistory) {
      if (contest.attended && Math.round(contest.rating) > curBestRating) {
        curBestRating = Math.round(contest.rating)
      }
    }
    userData.maxRating = curBestRating;
    return userData;
  }
  catch (err) {
    console.error("Failed to get LC contest data", err);
  }
}



export const getLeetcodeProfileStats = async (handle: string) => {
  let data = await getLeetcodeBasicInfo(handle);
  if (!data) {
    return null;
  }
  const solvedData = await getLeetCodeSolveCount(handle);
  const contestData = await getLeetcodeRating(handle);
  data = {
    ...data,
    ...solvedData,
    ...contestData
  }
  return data as LeetcodeAccount;
}


(async () => {
  // console.log(await getLeetCodeSolveCount('terminalwarlord'));
  // console.log(await getLeetcodeProfileStats('terminalwarlord'));
  console.log(await getLeetcodeProfileStats('fjzzq2002'));
  console.log(await getLeetcodeProfileStats('sveta2125'));
})()