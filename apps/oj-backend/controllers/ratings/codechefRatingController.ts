import type { Context } from "hono";
import { fetchCodechefRatingHistory } from "../../utils/contests/codechef-contest-history";

export const getCodechefRatingHistory = async (c: Context) => {
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
    const result = await fetchCodechefRatingHistory(handle);
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
