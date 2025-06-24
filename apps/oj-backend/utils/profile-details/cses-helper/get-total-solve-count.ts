import * as cheerio from "cheerio";

export const getTotalSolveHelper = async (
  sessionId: string,
  userId: number,
) => {
  try {
    let curPage = 1;
    while (curPage < 7000) {
      const res = await fetch(
        `https://cses.fi/problemset/stats/friends/p/${curPage}`,
        {
          headers: {
            Cookie: sessionId,
          },
        },
      );
      if (!res.ok) {
        console.error("Bad status code");
        return 0;
      }
      const $ = cheerio.load(await res.text());
      const table = $("table.narrow>tbody").find("tr");
      for (const item of table) {
        const $item = $(item);
        const curUserId = parseInt(
          $item
            .find("td")
            .eq(1)
            .find("a")
            .attr("href")
            ?.split("/user/")[1]
            .split("/")[0] || "",
        );
        if (curUserId === userId) {
          const solved = parseInt($item.find("td").eq(2).text().trim()) || 0;
          return solved;
        }
      }
    }
    return 0;
  } catch (err) {
    return 0;
  }
};
