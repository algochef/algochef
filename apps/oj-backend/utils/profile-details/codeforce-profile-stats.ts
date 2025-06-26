import { type OJAccount } from "@repo/types/stat";

// https://codeforces.com/contest/1668/submission/155877343
const getCodeforcesBasicInfo = async (handle: string) => {
  try {
    const res = await fetch(
      "https://codeforces.com/api/user.info?handles=" +
        handle +
        "&checkHistoricHandles=false",
    );
    if (!res.ok) {
      console.error("Network response was not ok:", res.statusText);
      return null;
    }
    const resData = await res.json();
    const result = resData.result[0];

    return {
      ...result,
      rank: 0,
      badge: result.rank,
    } as OJAccount;
  } catch (err) {
    console.log("Failed to fetch user data");
    return null;
  }
};

const getTotalContests = async (handle: string) => {
  try {
    const res = await fetch(
      "https://codeforces.com/api/user.rating?handle=" + handle,
    );
    if (!res.ok) {
      console.error("Bad status code while getting contest count");
      return 0;
    }
    const resData = await res.json();
    return resData.result.length;
  } catch (err) {
    console.error("Failed to get contest count", err);
    return 0;
  }
};

const getUsersTotalSolve = async (handle: string) => {
  try {
    const res = await fetch(
      "https://codeforces.com/api/user.status?handle=" +
        handle +
        "&from=1&count=100000",
    );
    if (!res.ok) {
      console.error("Network response was not ok:", res.statusText);
      return 0;
    }
    const resData = await res.json();
    const result = resData.result;
    const problems: Record<string, boolean> = {};
    for (const problem of result) {
      if (problem.contestId && problem.verdict === "OK") {
        const problemKey = `${problem.contestId}${problem.problem.index}`;
        problems[problemKey] = true;
      }
    }
    return Object.keys(problems).length;
  } catch (err) {
    console.log("Failed to fetch user data");
    return 0;
  }
};

export const getCodeforcesProfileStats = async (handle: string) => {
  const data = await getCodeforcesBasicInfo(handle);
  if (!data) {
    return null;
  }
  data.totalSolved = await getUsersTotalSolve(handle);
  data.totalContests = await getTotalContests(handle);
  return data as OJAccount;
};

// (async () => {
//   console.log(await getCodeforcesProfileStats("terminalwarlord"));
// })();
