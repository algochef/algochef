import { prismaClient } from "@repo/db/client";
import { Platform } from "@repo/types/contest";

function toMidnightUnixTime(unixTime: number): number {
  const date = new Date(unixTime * 1000);
  date.setUTCHours(0, 0, 0, 0);
  return Math.floor(date.getTime() / 1000);
}

export const fetchAllCodeforcesSubmissions = async (username: string) => {
  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000000000`,
  );
  if (!res.ok) {
    throw new Error("Bad status code while getting user submissions");
  }

  const resData = (await res.json()).result;
  const submissions: Record<string, number> = {};
  for (const submission of resData) {
    const submittedAt = toMidnightUnixTime(submission.creationTimeSeconds);
    submissions[submittedAt] = (submissions[submittedAt] || 0) + 1;
  }
  return submissions;
};

// (async () => {
//     console.log(await fetchAllCodeforcesSubmissions('terminalwarlord'));
// })()
