import type { OJAccount } from "@repo/types/stat";
import { fetchAllLeetcodeSubmissions } from "./leetcode-helper/leetcode-submission-calendar";
import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/contest";

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export const fetchLeetcodeSubmissionsCalendar = async (
  username: string,
  userId: number,
) => {
  try {
    const ojHandle = await prismaClient.ojProfile.findFirst({
      where: {
        handle: username,
        platform: Platform.LEETCODE,
      },
    });

    if (!ojHandle) {
      throw new Error("Handle doesnt exist in DB!");
    }
    const calendar = await fetchAllLeetcodeSubmissions(username);
    for (const item in calendar) {
      const timestamp = Number(item);
      const count = calendar[item] || 0;
      const date = new Date(timestamp * 1000);
      date.setUTCHours(0, 0, 0, 0);
      await prismaClient.submission.create({
        data: {
          userId,
          count,
          platform: Platform.LEETCODE,
          submittedOn: date,
          ojProfileId: ojHandle.id,
        },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error(String(err));
    }
  }
};

const fetchLeetcodeBasicInfo = async (handle: string) => {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        variables: { username: handle },
      }),
    });
    if (!res.ok) {
      console.error("Bad status code while getting basic LC info");
      return null;
    }
    const resData = await res.json();
    const data = resData.data?.matchedUser;
    if (!data) return null;

    const userData: Partial<OJAccount> = {
      firstName: data.profile.realName,
      aboutMe: data.profile.aboutMe,
      rank: data.profile.ranking,
    };
    return userData;
  } catch (err) {
    console.error("Failed to get basic leetcode user info");
  }
};

const fetchLeetCodeSolveCount = async (
  username: string,
): Promise<LeetCodeStats | null> => {
  const url = "https://leetcode.com/graphql";

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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    console.error("Failed to fetch data from LeetCode");
    return null;
  }

  const data = await response.json();

  const submissionData =
    data.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  const allQuestions = data.data?.allQuestionsCount;

  if (!submissionData || !allQuestions) {
    return null;
  }

  const fetchCount = (difficulty: string) =>
    submissionData.find((item: any) => item.difficulty === difficulty)?.count ||
    0;

  return {
    totalSolved: fetchCount("All"),
    easySolved: fetchCount("Easy"),
    mediumSolved: fetchCount("Medium"),
    hardSolved: fetchCount("Hard"),
  };
};

const fetchLeetcodeRating = async (handle: string) => {
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
      return null;
    }
    const resData = await res.json();
    const data = resData.data;
    if (!data) return null;

    const userData = {
      totalContests: data.userContestRanking
        ? data.userContestRanking.attendedContestsCount
        : 0,
      rating: data.userContestRanking
        ? Math.round(data.userContestRanking.rating)
        : 0,
      badge:
        data.userContestRanking && data.userContestRanking.badge
          ? data.userContestRanking.badge.name
          : "Unrated",
      maxRating: 0,
    } satisfies Pick<
      OJAccount,
      "totalContests" | "rating" | "badge" | "maxRating"
    >;

    let curBestRating = data.userContestRanking
      ? data.userContestRanking.rating
      : 0;
    for (const contest of data.userContestRankingHistory) {
      if (contest.attended && Math.round(contest.rating) > curBestRating) {
        curBestRating = Math.round(contest.rating);
      }
    }
    userData.maxRating = curBestRating;
    return userData;
  } catch (err) {
    console.error("Failed to get LC contest data", err);
    return null;
  }
};

export const getLeetcodeProfileStats = async (handle: string) => {
  let data = await fetchLeetcodeBasicInfo(handle);
  if (!data) {
    return null;
  }
  const solvedData = (await fetchLeetCodeSolveCount(handle)) || {
    easySolved: 0,
    hardSolved: 0,
    mediumSolved: 0,
    totalSolved: 0,
  };

  const contestData = (await fetchLeetcodeRating(handle)) || {
    badge: "Unrated",
    maxRating: 0,
    rating: 0,
    totalContests: 0,
  };

  data = {
    ...data,
    ...solvedData,
    ...contestData,
  };
  return data as OJAccount;
};

// (async () => {
//   // console.log(await fetchLeetCodeSolveCount('terminalwarlord'));
//   // console.log(await getLeetcodeProfileStats('terminalwarlord'));
//   // console.log(await getLeetcodeProfileStats("fjzzq2002"));
//   // console.log(await fetchLeetcodeRating("sveta2125"));
//   await fetchSubmissionsCalendar('terminalwarlord')
// })();
