import { Platform } from "@repo/types/contest";
import type { Context } from "hono";
import { z } from "zod";
import { generateSubmissionGraph } from "../../utils/profile-details/generate-submission-graph";
import { prismaClient } from "@repo/db/client";

enum Filter {
  ALL = 'ALL',
  SPECIFIC = "SPECIFIC"
}

export const getSubmissionGraph = async (c: Context) => {
  const schema = z.object({
    username: z.string().nonempty(),
    platform: z.nativeEnum(Platform).optional(),
    filter: z.nativeEnum(Filter),
    duration: z.string(),
  });

  const res = schema.safeParse({
    username: c.req.query("username"),
    platform: c.req.query("platform"),
    filter: c.req.query("filter"),
    duration: c.req.query("duration"),
  });

  if (!res.success) {
    return c.json(
      {
        message: "Failed to validate inputs!",
      },
      403,
    );
  }

  const user = await prismaClient.user.findFirst({
    where: {
      username: res.data.username,
    }
  })
  if (!user) {
    return c.json({
      message: "Failed to get user!"
    }, 403)
  }

  const submissions = await generateSubmissionGraph(
    user.id,
    res.data.filter === Filter.ALL ? "all" : res.data.platform!,
    res.data.duration,
  );

  return c.json({
    result: submissions,
  });
};
