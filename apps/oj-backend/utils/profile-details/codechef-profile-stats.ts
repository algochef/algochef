import type { CodechefAccount } from "@repo/types/stat";
import * as cheerio from "cheerio";

const parseNumber = (value: string) => {
  try {
    let rating = "";
    for (const ch of value) {
      if (ch >= "0" && ch <= "9") {
        rating += ch;
      }
    }
    return parseInt(rating);
  } catch (err) {
    return 0;
  }
};
export const codechefUserDetails = async (handle: string) => {
  try {
    const res = await fetch("https://www.codechef.com/users/" + handle);
    if (!res.ok) {
      console.log("Bad status code while trying to parse CC data");
      return null;
    }
    const $ = cheerio.load(await res.text());
    const username = $(".m-username--link").text().trim();
    if (!username || username !== handle) {
      console.error("Invalid username");
      return null;
    }
    const fullName = $(".user-details-container > header > h1.h2-style")
      .text()
      .trim();

    const lastSpaceIndex = fullName.lastIndexOf(" ");

    const firstName = fullName.slice(0, lastSpaceIndex).trim();
    const lastName = fullName.slice(lastSpaceIndex + 1).trim();
    const rating = parseInt($("div.rating-number").text().trim()) || 0;
    const maxRating =
      parseNumber($("div.rating-header").eq(0).find("small").text().trim()) ||
      0;
    const rank = $("span.rating").text().trim();
    const totalContests =
      parseInt($("div.contest-participated-count>b").text().trim()) || 0;
    const totalSolved =
      parseNumber(
        $("section.problems-solved").find("h3").eq(3).text().trim(),
      ) || 0;
    // console.log(fullname, rating, maxRating, badge, rank, totalContests, totalSolved);
    return {
      firstName,
      lastName,
      rating,
      rank,
      maxRating,
      totalContests,
      totalSolved,
    } as CodechefAccount;
  } catch (err) {
    console.error("Failed to parse CC data");
    return null;
  }
};

(async () => {
  console.log(await codechefUserDetails("jaybeeop"));
  console.log(await codechefUserDetails("jaybeedevkaran1231op"));
  console.log(await codechefUserDetails("devkaran1231"));
})();
