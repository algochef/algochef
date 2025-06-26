import type { RatingHistory } from "@repo/types/stat";
import * as cheerio from "cheerio";

export const fetchCodechefRatingHistory = async (handle: string) => {
  try {
    const res = await fetch(`https://www.codechef.com/users/${handle}`);

    if (!res.ok) {
      console.error("Bad status code while getting CodeChef profile");
      throw new Error("Failed to get CodeChef profile");
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Find the script tag containing Drupal.settings
    let ratingData: any = null;

    $("script").each((_, element) => {
      const scriptContent = $(element).html() || "";
      if (scriptContent.includes("Drupal.settings")) {
        const match = scriptContent.match(
          /jQuery\.extend\(Drupal\.settings, (\{.*?\})\);/,
        );
        if (match && match[1]) {
          try {
            const settings = JSON.parse(match[1]);
            if (settings.date_versus_rating?.all) {
              ratingData = settings.date_versus_rating.all;
            }
          } catch (e) {
            console.error("Error parsing Drupal.settings", e);
          }
        }
      }
    });

    if (!ratingData) {
      throw new Error("Could not find rating data in CodeChef profile");
    }

    // Process the rating data into our format with Unix timestamps
    const result: RatingHistory[] = ratingData.map((contest: any) => {
      // Convert CodeChef date string to Unix timestamp
      const dateStr = contest.end_date;
      let unixTime: number;

      try {
        // CodeChef format: "2025-05-14 22:30:04"
        const dateObj = new Date(dateStr);
        unixTime = Math.floor(dateObj.getTime() / 1000);

        if (isNaN(unixTime)) {
          console.warn(`Invalid date for contest ${contest.name}: ${dateStr}`);
          unixTime = 0;
        }
      } catch (e) {
        console.warn(
          `Date parsing failed for contest ${contest.name}: ${dateStr}`,
        );
        unixTime = 0;
      }

      return {
        rank: parseInt(contest.rank) || 0,
        contestTitle: contest.name,
        date: unixTime,
        rating: Math.round(contest.rating),
      };
    });

    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get CodeChef rating history");
  }
};

(async () => {
  console.log(await fetchCodechefRatingHistory("jaybeeop"));
})();
