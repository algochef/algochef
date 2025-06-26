import type { Context } from "hono";
import type { Variables } from "hono/types";
import { z } from "zod";
import { createCompanyTag, createTopicTag } from "../../utils/create-tags";

export const postCreateCompanyTag = async (c: Context<Variables>) => {
  const schema = z.object({
    companyTag: z.string().nonempty(),
  });
  const res = schema.safeParse(c.req.query("companyTag"));
  if (!res.success) {
    c.status(403);
    return c.json({
      message: "Invalid input",
    });
  }
  return {
    tagId: await createCompanyTag(res.data.companyTag),
  };
};

export const postTopicTag = async (c: Context<Variables>) => {
  const schema = z.object({
    tag: z.string().nonempty(),
  });
  const res = schema.safeParse(c.req.query("tag"));
  if (!res.success) {
    c.status(403);
    return c.json({
      message: "Invalid input",
    });
  }
  return {
    tagId: await createTopicTag(res.data.tag),
  };
};
