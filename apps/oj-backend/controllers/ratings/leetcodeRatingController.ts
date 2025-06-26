import type { Context } from "hono";
import { fetchLeetcodeRatingHistory } from "../../utils/contests/leetcode-contest-history";

export const getLeetcodeRatingHistory = async (c: Context) => {
  //   TODO: Cache ratings into DB
  const handle = c.req.param("handle");
  if (!handle) {
    return c.json(
      {
        message: "Handle is missing!",
      },
      401,
    );
  }
  try {
    const result = await fetchLeetcodeRatingHistory(handle);
    return c.json({
      result,
    });
  } catch (err) {
    return c.json(
      {
        message: "Failed to generate rating history",
      },
      401,
    );
  }
};
