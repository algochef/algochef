import * as cheerio from "cheerio";

export const getTotalSolveHelper = async (
  sessionId: string,
  userId: number,
) => {
  try {
    const res = await fetch(`https://cses.fi/problemset/user/${userId}`, {
      headers: {
        Cookie: sessionId,
      },
    });
    if (!res.ok) {
      console.error("Bad status code");
      return 0;
    }
    const $ = cheerio.load(await res.text());
    const solveData = $("div.content>p").text().trim();
    const solved = parseInt(solveData.split(":")[1].split("/")[0]) || 0;
    return solved;
  } catch (err) {
    return 0;
  }
};
