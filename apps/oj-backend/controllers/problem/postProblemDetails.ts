import type { Context, Next } from "hono";
import { getProblemDetails } from "../../utils/get-problem-details";

export const postProblemDetails = async (c: Context, next: Next) => {
  const { url } = await c.req.json();
  if (!url) {
    c.status(403);
    return c.json({
      message: "Missing 'url' query parameter.",
    });
  }
  const res = await getProblemDetails(url);
  if (res && res?.message) {
    c.status(403);
    return c.json({
      message: "Failed to parse problem details!",
    });
  }
  return c.json({
    ...res,
  });
};
